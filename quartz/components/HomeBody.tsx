import { resolveRelative, simplifySlug } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import homeStyle from "./styles/home.scss"
// @ts-expect-error - inline script import handled by Quartz bundler
import homeScript from "./scripts/home.inline.ts"
// @ts-expect-error - subpath export not resolved under classic moduleResolution, but valid at runtime
import { htmlToJsx } from "@quartz-community/utils/jsx"
import { Node } from "hast"
import {
  VERDICT_ORDER,
  getVerdictMeta,
  normalizeVerdict,
  resolvePageSlug,
  wikiLinkLabel,
  wikiLinkTarget,
} from "./verdictMeta"

interface HastParent {
  children?: unknown[]
}

function titleCase(value: string): string {
  return value.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function uniqueSorted(values: (string | undefined)[]): string[] {
  return [...new Set(values.filter((v): v is string => Boolean(v)))].sort()
}

// One minimal line-glyph per sector (rendered from the sprite below).
const SECTOR_ICON: Record<string, string> = {
  Aerospace: "ic-aerospace",
  Chemistry: "ic-chemistry",
  Climate: "ic-climate",
  Energy: "ic-energy",
  Finance: "ic-finance",
  "Life Sciences": "ic-life",
  Science: "ic-science",
}

const HomeBody: QuartzComponent = ({ fileData, allFiles, tree }: QuartzComponentProps) => {
  const title = (fileData.frontmatter?.title as string | undefined) ?? "Quantum Use Case Zoo"
  const description = fileData.frontmatter?.description as string | undefined
  const hasBody = ((tree as HastParent | undefined)?.children?.length ?? 0) > 0

  const usecases = allFiles
    .filter((f) => {
      const tags = f.frontmatter?.tags as string[] | undefined
      return Array.isArray(tags) && tags.includes("usecase")
    })
    .map((f) => ({
      slug: f.slug!,
      title: (f.frontmatter?.title as string | undefined) ?? f.slug!,
      sector: f.frontmatter?.sector as string | undefined,
      timeline: f.frontmatter?.timeline as string | undefined,
      verdict: f.frontmatter?.verdict as string | undefined,
      verdictKey: normalizeVerdict(f.frontmatter?.verdict as string | undefined),
    }))
    .sort((a, b) => a.title.localeCompare(b.title))

  // Canonical verdicts in editorial order first, then anything off-taxonomy.
  const verdictKeys = [...new Set(usecases.map((u) => u.verdictKey).filter(Boolean))].sort(
    (a, b) => {
      const [ia, ib] = [VERDICT_ORDER.indexOf(a), VERDICT_ORDER.indexOf(b)]
      if (ia !== -1 || ib !== -1) return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib)
      return a.localeCompare(b)
    },
  )

  const scoreboard = verdictKeys.map((key) => ({
    key,
    meta: getVerdictMeta(usecases.find((u) => u.verdictKey === key)?.verdict),
    count: usecases.filter((u) => u.verdictKey === key).length,
  }))

  // "Start here" strip: wikilinks listed in index.md frontmatter, resolved
  // against real pages so entries that don't exist are dropped at build time.
  const startHereRaw = fileData.frontmatter?.startHere as string[] | undefined
  const startHere = (Array.isArray(startHereRaw) ? startHereRaw : [])
    .map((raw) => {
      const slug = resolvePageSlug(allFiles, wikiLinkTarget(raw))
      return slug ? { slug, label: wikiLinkLabel(raw) } : undefined
    })
    .filter((l): l is { slug: (typeof usecases)[number]["slug"]; label: string } => Boolean(l))

  const filterGroups: { key: string; label: string; values: string[] }[] = [
    { key: "sector", label: "Sector", values: uniqueSorted(usecases.map((u) => u.sector)) },
    { key: "timeline", label: "Timeline", values: uniqueSorted(usecases.map((u) => u.timeline)) },
    { key: "verdict", label: "Verdict", values: verdictKeys },
  ]

  return (
    <div class="usecase-home">
      {/* Sector glyph sprite — one minimal line-icon per sector. */}
      <svg class="sector-sprite" aria-hidden="true">
        <symbol id="ic-aerospace" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
          <path d="M2 20 L22 4 L12.5 20 L10.5 12.5 Z" />
        </symbol>
        <symbol id="ic-chemistry" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round">
          <path d="M12 3 L20 7.5 V16.5 L12 21 L4 16.5 V7.5 Z" />
          <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
        </symbol>
        <symbol id="ic-climate" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 19 C5 10 12 5 20 5 C20 13 13 19 5 19 Z" />
          <path d="M6 18 L16 8" />
        </symbol>
        <symbol id="ic-energy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
          <path d="M13 2 L4 13.5 H10.5 L9.5 22 L20 9.5 H13 Z" />
        </symbol>
        <symbol id="ic-finance" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 20 H21" />
          <path d="M4 15 L9 10 L13 13.5 L20 6" />
          <path d="M20 6 H16 M20 6 V10" />
        </symbol>
        <symbol id="ic-life" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
          <path d="M8 3 C16 8 8 16 16 21" />
          <path d="M16 3 C8 8 16 16 8 21" />
          <path d="M9.5 6 H14.5 M9 12 H15 M9.5 18 H14.5" />
        </symbol>
        <symbol id="ic-science" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
          <path d="M3 12 Q6.75 3 10.5 12 T18 12" />
          <path d="M18 12 H21" />
        </symbol>
      </svg>

      <nav class="home-nav">
        <div class="home-nav-links">
          <a href={resolveRelative(fileData.slug!, simplifySlug("Methodology"))} class="home-nav-link">Methodology</a>
          <a href={resolveRelative(fileData.slug!, simplifySlug("about"))} class="home-nav-link">About</a>
          <a href={resolveRelative(fileData.slug!, simplifySlug("contribute"))} class="home-nav-link">Contribute</a>
          <button class="usecase-home-darkmode darkmode" aria-label="Toggle dark mode">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" class="dayIcon" x="0px" y="0px" viewBox="0 0 35 35" style="enable-background:new 0 0 35 35" xmlSpace="preserve" aria-label="Toggle dark mode">
              <title>Toggle dark mode</title>
              <path d="M6,17.5C6,16.672,5.328,16,4.5,16h-3C0.672,16,0,16.672,0,17.5    S0.672,19,1.5,19h3C5.328,19,6,18.328,6,17.5z M7.5,26c-0.414,0-0.789,0.168-1.061,0.439l-2,2C4.168,28.711,4,29.086,4,29.5    C4,30.328,4.671,31,5.5,31c0.414,0,0.789-0.168,1.06-0.44l2-2C8.832,28.289,9,27.914,9,27.5C9,26.672,8.329,26,7.5,26z M17.5,6    C18.329,6,19,5.328,19,4.5v-3C19,0.672,18.329,0,17.5,0S16,0.672,16,1.5v3C16,5.328,16.671,6,17.5,6z M27.5,9    c0.414,0,0.789-0.168,1.06-0.439l2-2C30.832,6.289,31,5.914,31,5.5C31,4.672,30.329,4,29.5,4c-0.414,0-0.789,0.168-1.061,0.44    l-2,2C26.168,6.711,26,7.086,26,7.5C26,8.328,26.671,9,27.5,9z M6.439,8.561C6.711,8.832,7.086,9,7.5,9C8.328,9,9,8.328,9,7.5    c0-0.414-0.168-0.789-0.439-1.061l-2-2C6.289,4.168,5.914,4,5.5,4C4.672,4,4,4.672,4,5.5c0,0.414,0.168,0.789,0.439,1.06    L6.439,8.561z M33.5,16h-3c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5h3c0.828,0,1.5-0.672,1.5-1.5S34.328,16,33.5,16z     M28.561,26.439C28.289,26.168,27.914,26,27.5,26c-0.828,0-1.5,0.672-1.5,1.5c0,0.414,0.168,0.789,0.439,1.06l2,2    C28.711,30.832,29.086,31,29.5,31c0.828,0,1.5-0.672,1.5-1.5c0-0.414-0.168-0.789-0.439-1.061L28.561,26.439z M17.5,29    c-0.829,0-1.5,0.672-1.5,1.5v3c0,0.828,0.671,1.5,1.5,1.5s1.5-0.672,1.5-1.5v-3C19,29.672,18.329,29,17.5,29z M17.5,7    C11.71,7,7,11.71,7,17.5S11.71,28,17.5,28S28,23.29,28,17.5S23.29,7,17.5,7z M17.5,25c-4.136,0-7.5-3.364-7.5-7.5    c0-4.136,3.364-7.5,7.5-7.5c4.136,0,7.5,3.364,7.5,7.5C25,21.636,21.636,25,17.5,25z"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" class="nightIcon" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100" xmlSpace="preserve" aria-label="Toggle light mode">
              <title>Toggle light mode</title>
              <path d="M96.76,66.458c-0.853-0.852-2.15-1.064-3.23-0.534c-6.063,2.991-12.858,4.571-19.655,4.571  C62.022,70.495,50.88,65.88,42.5,57.5C29.043,44.043,25.658,23.536,34.076,6.47c0.532-1.08,0.318-2.379-0.534-3.23  c-0.851-0.852-2.15-1.064-3.23-0.534c-4.918,2.427-9.375,5.619-13.246,9.491c-9.447,9.447-14.65,22.008-14.65,35.369  c0,13.36,5.203,25.921,14.65,35.368s22.008,14.65,35.368,14.65c13.361,0,25.921-5.203,35.369-14.65  c3.872-3.871,7.064-8.328,9.491-13.246C97.826,68.608,97.611,67.309,96.76,66.458z"></path>
            </svg>
          </button>
        </div>
      </nav>

      <header class="home-head">
        <h1 class="usecase-home-title">{title}</h1>
        {description && <p class="usecase-home-thesis">{description}</p>}
      </header>

      {usecases.length > 0 && (
        <div class="usecase-meta-row">
          <p class="usecase-scoreboard">
            <span class="scoreboard-total">{usecases.length} use cases assessed</span>
            {scoreboard.map(({ key, meta, count }) => (
              <span class="scoreboard-item" data-verdict={key}>
                <span class="scoreboard-dot" style={`background:${meta.color}`}></span>
                {count} {meta.label.toLowerCase()}
              </span>
            ))}
          </p>
        </div>
      )}

      {startHere.length > 0 && (
        <div class="usecase-start-here">
          <span class="filter-label">Start here</span>
          {startHere.map((link) => (
            <a href={resolveRelative(fileData.slug!, link.slug)} class="start-here-link">
              {link.label}
            </a>
          ))}
        </div>
      )}

      <div class="usecase-filters">
        {filterGroups.map(
          (group) =>
            group.values.length > 0 && (
              <div class="filter-group" data-filter-key={group.key}>
                <span class="filter-label">{group.label}</span>
                <button class="pill is-active" data-value="all">
                  All
                </button>
                {group.values.map((value) => (
                  <button class="pill" data-value={value}>
                    {group.key === "verdict"
                      ? (scoreboard.find((s) => s.key === value)?.meta.label ?? titleCase(value))
                      : titleCase(value)}
                  </button>
                ))}
              </div>
            ),
        )}
      </div>

      <div class="tile-grid">
        {usecases.map((u) => {
          const meta = getVerdictMeta(u.verdict)
          const iconId = u.sector ? SECTOR_ICON[u.sector] : undefined
          return (
            <a
              href={resolveRelative(fileData.slug!, u.slug)}
              class="tile"
              data-sector={u.sector ?? ""}
              data-timeline={u.timeline ?? ""}
              data-verdict={u.verdictKey}
            >
              <div class="tile-top">
                <span class="tile-verdict">
                  <span class="tile-verdict-mark" style={`background:${meta.color}`}></span>
                  <span class="tile-verdict-label">{meta.label}</span>
                </span>
                {iconId && (
                  <svg class="tile-icon" width="22" height="22" aria-hidden="true">
                    <use href={`#${iconId}`}></use>
                  </svg>
                )}
              </div>
              <h3 class="tile-title">{u.title}</h3>
              <span class="tile-spacer"></span>
              <div class="tile-meta">
                {u.sector && <span>{u.sector}</span>}
                {u.sector && u.timeline && <span class="dot">/</span>}
                {u.timeline && <span>{u.timeline}</span>}
              </div>
            </a>
          )
        })}
        <p class="tile-empty" hidden>
          No use cases match those filters.
        </p>
      </div>

      {usecases.length === 0 && (
        <p class="usecase-empty">
          No use cases catalogued yet. Tag a note with <code>usecase</code> to add one.
        </p>
      )}

      {hasBody && (
        <div class="usecase-home-extra markdown-preview-view markdown-rendered">
          {htmlToJsx(tree as Node)}
        </div>
      )}
    </div>
  )
}

HomeBody.css = homeStyle
HomeBody.afterDOMLoaded = homeScript

export default (() => HomeBody) satisfies QuartzComponentConstructor
