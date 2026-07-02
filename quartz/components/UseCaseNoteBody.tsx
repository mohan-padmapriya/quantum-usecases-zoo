// @ts-expect-error - subpath export not resolved under classic moduleResolution, but valid at runtime
import { htmlToJsx } from "@quartz-community/utils/jsx"
import { Node } from "hast"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import noteStyle from "./styles/usecaseNote.scss"

interface UseCaseFrontmatter {
  cssclasses?: string[]
  title?: string
  sector?: string
  verdict?: string
  timeline?: string
  "Watch out for"?: string
}

// Parses "[[Page Name]]" or "[[Page Name|Display]]" into a link, or returns plain text.
function WikiLink({ raw }: { raw: string }) {
  const match = raw.match(/^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/)
  if (!match) return <>{raw}</>
  const slug = match[1].trim().toLowerCase().replace(/\s+/g, "-")
  const label = (match[2] ?? match[1]).trim()
  return <a href={`/${slug}`}>{label}</a>
}

const UseCaseNoteBody: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter as UseCaseFrontmatter | undefined
  const content = htmlToJsx(tree as Node)
  const classes = frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  const watchOutFor = frontmatter?.["Watch out for"]

  return (
    <article class={classString}>
      <div class="usecase-header">
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
          {watchOutFor && (
            <span class="usecase-header-field">
              <span class="usecase-header-label">Watch out for</span>
              <WikiLink raw={watchOutFor} />
            </span>
          )}
          {frontmatter?.verdict && (
            <span class="usecase-header-field">
              <span class="usecase-header-label">Verdict</span>
              <WikiLink raw={frontmatter.verdict} />
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
