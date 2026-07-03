import { FullSlug } from "../util/path"

export interface VerdictMeta {
  label: string
  color: string
  textColor: string
}

// Fixed badge colors (not theme-mode-aware) — each chosen so its paired
// textColor clears WCAG AA (≥4.5:1) against that exact fill, and the fill
// stays legible on every surface badges sit on: teal tiles (#2a6060/#3a8080)
// and the note-header panel (--lightgray) in both page modes.
export const VERDICT_META: Record<string, VerdictMeta> = {
  ready: { label: "Ready", color: "#7c9048", textColor: "#221812" },
  contested: { label: "Contested", color: "#cd7a14", textColor: "#221812" },
  "algorithm-limited": { label: "Algorithm-limited", color: "#a44a3f", textColor: "#ffffff" },
  "hardware-limited": { label: "Hardware-limited", color: "#8b93a5", textColor: "#221812" },
}

// Editorial order: best verdict first, then descending by how fundamental the blocker is.
export const VERDICT_ORDER = ["ready", "contested", "algorithm-limited", "hardware-limited"]

const NEUTRAL = { color: "#a8a29e", textColor: "#221812" }

export function wikiLinkLabel(raw: string): string {
  const match = raw.match(/^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/)
  if (!match) return raw
  return (match[2] ?? match[1]).trim()
}

export function wikiLinkTarget(raw: string): string {
  const match = raw.match(/^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/)
  return (match ? match[1] : raw).trim()
}

// Canonical key for a frontmatter verdict: strips wikilink syntax, lowercases,
// collapses separators — so "[[Hardware-limited]]", "Hardware limited" and
// "hardware-limited" all filter and color as one verdict.
export function normalizeVerdict(raw?: string): string {
  if (!raw) return ""
  return wikiLinkTarget(raw)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function getVerdictMeta(raw?: string): VerdictMeta {
  if (!raw) return { label: "Unverdicted", ...NEUTRAL }
  return VERDICT_META[normalizeVerdict(raw)] ?? { label: wikiLinkLabel(raw), ...NEUTRAL }
}

interface Linkable {
  slug?: FullSlug
  frontmatter?: { title?: string; [key: string]: unknown }
}

// Resolves a wikilink target to a real page slug so links survive
// case-sensitive hosting (GitHub Pages) instead of guessing a lowercased path.
export function resolvePageSlug(allFiles: Linkable[], name: string): FullSlug | undefined {
  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  const target = norm(name)
  const file = allFiles.find((f) => {
    if (!f.slug) return false
    const base = f.slug.split("/").pop() ?? ""
    const title = f.frontmatter?.title as string | undefined
    return norm(base) === target || (title !== undefined && norm(title) === target)
  })
  return file?.slug
}
