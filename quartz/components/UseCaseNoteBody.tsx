// @ts-expect-error - subpath export not resolved under classic moduleResolution, but valid at runtime
import { htmlToJsx } from "@quartz-community/utils/jsx"
import { Node } from "hast"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import noteStyle from "./styles/usecaseNote.scss"

interface VerdictMeta {
  label: string
  color: string
  textColor: string
}

// Fixed badge colors (not theme-mode-aware) — must match HomeBody.tsx's
// VERDICT_META exactly; see DESIGN.md for the palette rationale.
const VERDICT_META: Record<string, VerdictMeta> = {
  "sensing-led": { label: "Sensing-led near-term", color: "#7c9048", textColor: "#221812" },
  premature: { label: "Optimization-class premature", color: "#c26f00", textColor: "#221812" },
  "ft-era": { label: "Fault-tolerant era only", color: "#6b7280", textColor: "#ffffff" },
}

function getVerdictMeta(verdict?: string): VerdictMeta {
  if (!verdict) return { label: "Unverdicted", color: "#a8a29e", textColor: "#221812" }
  return VERDICT_META[verdict] ?? { label: verdict, color: "#a8a29e", textColor: "#221812" }
}

interface UseCaseFrontmatter {
  cssclasses?: string[]
  title?: string
  sector?: string
  verdict?: string
  timeline?: string
  confidence?: string
}

const UseCaseNoteBody: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter as UseCaseFrontmatter | undefined
  const content = htmlToJsx(tree as Node)
  const classes = frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  const verdictMeta = getVerdictMeta(frontmatter?.verdict)

  return (
    <article class={classString}>
      <div class="usecase-header" style={`border-color:${verdictMeta.color}`}>
        <h1 class="usecase-header-title">{frontmatter?.title ?? fileData.slug}</h1>
        <div class="usecase-header-meta">
          {frontmatter?.sector && (
            <span class="usecase-header-field">
              <span class="usecase-header-label">Sector</span>
              {frontmatter.sector}
            </span>
          )}
          {frontmatter?.timeline && (
            <span class="usecase-header-field">
              <span class="usecase-header-label">Timeline</span>
              {frontmatter.timeline}
            </span>
          )}
          {frontmatter?.confidence && (
            <span class="usecase-header-field">
              <span class="usecase-header-label">Confidence</span>
              {frontmatter.confidence}
            </span>
          )}
          <span
            class="usecase-header-verdict-badge"
            style={`background:${verdictMeta.color};color:${verdictMeta.textColor}`}
          >
            {verdictMeta.label}
          </span>
        </div>
      </div>
      <div class="markdown-preview-view markdown-rendered">{content}</div>
    </article>
  )
}

UseCaseNoteBody.css = noteStyle

export default (() => UseCaseNoteBody) satisfies QuartzComponentConstructor
