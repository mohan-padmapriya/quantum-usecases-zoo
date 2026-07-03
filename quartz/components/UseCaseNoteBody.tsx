// @ts-expect-error - subpath export not resolved under classic moduleResolution, but valid at runtime
import { htmlToJsx } from "@quartz-community/utils/jsx"
import { Node } from "hast"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import noteStyle from "./styles/usecaseNote.scss"
import { resolveRelative } from "../util/path"
import { getVerdictMeta, resolvePageSlug, wikiLinkLabel, wikiLinkTarget } from "./verdictMeta"

interface UseCaseFrontmatter {
  cssclasses?: string[]
  title?: string
  sector?: string
  verdict?: string
  timeline?: string
  "Watch out for"?: string
}

const UseCaseNoteBody: QuartzComponent = ({ fileData, allFiles, tree }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter as UseCaseFrontmatter | undefined
  const content = htmlToJsx(tree as Node)
  const classes = frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  const watchOutFor = frontmatter?.["Watch out for"]

  // Parses "[[Page Name]]" or "[[Page Name|Display]]" into a link resolved
  // against real page slugs, or falls back to plain text.
  const WikiLink = ({ raw }: { raw: string }) => {
    const target = wikiLinkTarget(raw)
    if (target === raw) return <>{raw}</>
    const slug = resolvePageSlug(allFiles, target)
    const label = wikiLinkLabel(raw)
    if (!slug) return <>{label}</>
    return <a href={resolveRelative(fileData.slug!, slug)}>{label}</a>
  }

  const VerdictBadge = ({ raw }: { raw: string }) => {
    const meta = getVerdictMeta(raw)
    const style = `background:${meta.color};color:${meta.textColor}`
    const target = wikiLinkTarget(raw)
    const slug = target !== raw ? resolvePageSlug(allFiles, target) : undefined
    if (!slug) {
      return (
        <span class="usecase-verdict-badge" style={style}>
          {meta.label}
        </span>
      )
    }
    return (
      <a class="usecase-verdict-badge" href={resolveRelative(fileData.slug!, slug)} style={style}>
        {meta.label}
      </a>
    )
  }

  return (
    <article class={classString}>
      <div class="usecase-header">
        <h1 class="usecase-header-title">{frontmatter?.title ?? fileData.slug}</h1>
        <div class="usecase-header-meta">
          {frontmatter?.verdict && (
            <span class="usecase-header-field">
              <span class="usecase-header-label">Verdict</span>
              <VerdictBadge raw={frontmatter.verdict} />
            </span>
          )}
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
          {watchOutFor && (
            <span class="usecase-header-field">
              <span class="usecase-header-label">Watch out for</span>
              <WikiLink raw={watchOutFor} />
            </span>
          )}
        </div>
      </div>
      <div class="markdown-preview-view markdown-rendered">{content}</div>
    </article>
  )
}

UseCaseNoteBody.css = noteStyle

export default (() => UseCaseNoteBody) satisfies QuartzComponentConstructor
