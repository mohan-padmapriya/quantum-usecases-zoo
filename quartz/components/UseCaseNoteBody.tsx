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
  players?: string[]
}

const UseCaseNoteBody: QuartzComponent = ({ fileData, allFiles, tree }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter as UseCaseFrontmatter | undefined
  const content = htmlToJsx(tree as Node)
  const classes = frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  const watchOutFor = frontmatter?.["Watch out for"]
  // Entries are "Name | domain.com"; domain drives the logo and link, so a
  // missing domain degrades to a plain unlinked chip.
  const players = Array.isArray(frontmatter?.players)
    ? frontmatter!.players.filter((p) => typeof p === "string" && p.trim() !== "")
    : []

  // Parses "[[Page Name]]" or "[[Page Name|Display]]" into a link resolved
  // against real page slugs, or falls back to plain text.
  const WikiLink = ({ raw }: { raw: string }) => {
    const target = wikiLinkTarget(raw)
    if (target === raw) return <>{raw}</>
    const slug = resolvePageSlug(allFiles, target)
    const label = wikiLinkLabel(raw)
    if (!slug) return <>{label}</>
    // "internal" opts into Quartz link popovers on hover.
    return (
      <a class="internal" href={resolveRelative(fileData.slug!, slug)}>
        {label}
      </a>
    )
  }

  const VerdictBadge = ({ raw }: { raw: string }) => {
    const meta = getVerdictMeta(raw)
    const style = `background:${meta.color};color:${meta.textColor}`
    // Wikilink or plain value alike: link whenever a definition page exists.
    const slug = resolvePageSlug(allFiles, wikiLinkTarget(raw))
    if (!slug) {
      return (
        <span class="usecase-verdict-badge" style={style}>
          {meta.label}
        </span>
      )
    }
    // "internal" opts into Quartz link popovers on hover.
    return (
      <a
        class="usecase-verdict-badge internal"
        href={resolveRelative(fileData.slug!, slug)}
        style={style}
      >
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
      {players.length > 0 && (
        <div class="usecase-players">
          <span class="usecase-players-label">Who's working on this</span>
          <div class="usecase-players-list">
            {players.map((raw) => {
              const [name, domain] = raw.split("|").map((s) => s.trim())
              if (!domain) {
                return <span class="usecase-player">{name}</span>
              }
              // Logos come from Google's favicon service so no image assets
              // need to live in the repo.
              const logo = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`
              return (
                <a
                  class="usecase-player"
                  href={`https://${domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img class="usecase-player-logo" src={logo} alt="" width={20} height={20} loading="lazy" />
                  {name}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </article>
  )
}

UseCaseNoteBody.css = noteStyle

export default (() => UseCaseNoteBody) satisfies QuartzComponentConstructor
