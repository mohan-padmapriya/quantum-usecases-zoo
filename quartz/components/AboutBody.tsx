// @ts-expect-error - subpath export not resolved under classic moduleResolution, but valid at runtime
import { htmlToJsx } from "@quartz-community/utils/jsx"
import { Node } from "hast"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import aboutStyle from "./styles/about.scss"

interface AboutFrontmatter {
  title?: string
  name?: string
  photo?: string
  now?: string
  next?: string
  education?: string[]
  awards?: string[]
  publications?: string[]
  technical?: string[]
  society?: string[]
  seeking?: string
  email?: string
  linkedin?: string
  links?: string[]
}

interface ContactLink {
  label: string
  href: string
  external: boolean
}

// Entries are pipe-delimited strings so the whole page stays editable as plain
// frontmatter in About.md. Shapes:
//   publications: "Title | url | venue, year"
//   technical / society: "Role · Org | url | one-line note"
//   links: "Label | href"
function parts(raw: string): string[] {
  return raw.split("|").map((s) => s.trim())
}

const AboutBody: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const fm = (fileData.frontmatter ?? {}) as AboutFrontmatter
  const name = fm.name ?? fm.title ?? "About"
  const bio = htmlToJsx(tree as Node)

  // Contact links come from dedicated email/linkedin fields, plus any extra
  // "Label | href" entries in `links`. Bare emails/URLs are handled too.
  const contactLinks: ContactLink[] = []
  if (fm.email) contactLinks.push({ label: "Email", href: `mailto:${fm.email}`, external: false })
  if (fm.linkedin) contactLinks.push({ label: "LinkedIn", href: fm.linkedin, external: true })
  for (const raw of Array.isArray(fm.links) ? fm.links : []) {
    const [a, b] = parts(raw)
    if (!a) continue
    if (b) contactLinks.push({ label: a, href: b, external: /^https?:/.test(b) })
    else if (a.includes("@"))
      contactLinks.push({ label: "Email", href: `mailto:${a}`, external: false })
    else contactLinks.push({ label: a.replace(/^https?:\/\//, ""), href: a, external: true })
  }

  const WorkList = ({ items }: { items: string[] }) => (
    <ol class="about-ledger">
      {items.map((raw) => {
        const [heading, url, note] = parts(raw)
        const [role, org] = heading.split("·").map((s) => s.trim())
        return (
          <li class="about-ledger-row">
            <div class="about-ledger-head">
              <span class="about-ledger-role">{role}</span>
              {org &&
                (url ? (
                  <a class="about-ledger-org" href={url} target="_blank" rel="noopener noreferrer">
                    {org}
                  </a>
                ) : (
                  <span class="about-ledger-org">{org}</span>
                ))}
            </div>
            {note && <p class="about-ledger-note">{note}</p>}
          </li>
        )
      })}
    </ol>
  )

  return (
    <article class="about popover-hint">
      <header class="about-hero">
        <h1 class="about-name">{name}</h1>
        {(fm.now || fm.next) && (
          <div class="about-roles">
            {fm.now && <p class="about-role">{fm.now}</p>}
            {fm.next && <p class="about-role">{fm.next}</p>}
          </div>
        )}
        <div class="about-bio">{bio}</div>
      </header>

      <section class="about-dossier" aria-label="Credentials">
        {fm.education && fm.education.length > 0 && (
          <div class="about-dossier-col">
            <h2 class="about-dossier-label">Education</h2>
            <ul class="about-dossier-list">
              {fm.education.map((e) => (
                <li>{e}</li>
              ))}
            </ul>
          </div>
        )}
        {fm.awards && fm.awards.length > 0 && (
          <div class="about-dossier-col">
            <h2 class="about-dossier-label">Recognition</h2>
            <ul class="about-dossier-list">
              {fm.awards.map((a) => (
                <li>{a}</li>
              ))}
            </ul>
          </div>
        )}
        {fm.publications && fm.publications.length > 0 && (
          <div class="about-dossier-col about-dossier-col--wide">
            <h2 class="about-dossier-label">Selected writing</h2>
            <ul class="about-dossier-list about-dossier-pubs">
              {fm.publications.map((raw) => {
                const [title, url, venue] = parts(raw)
                return (
                  <li>
                    {url ? (
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                      </a>
                    ) : (
                      title
                    )}
                    {venue && <span class="about-pub-venue">{venue}</span>}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </section>

      <section class="about-work" aria-label="Work">
        <div class="about-switch" role="radiogroup" aria-label="Choose a body of work">
          <input
            class="about-radio"
            type="radio"
            id="about-pane-technical"
            name="about-pane"
            aria-label="Technical work"
            checked
          />
          <input
            class="about-radio"
            type="radio"
            id="about-pane-society"
            name="about-pane"
            aria-label="Quantum and society"
          />
          <div class="about-switch-tabs">
            <label class="about-switch-tab" for="about-pane-technical">
              <span>Technical work</span>
            </label>
            <label class="about-switch-tab" for="about-pane-society">
              <span>Quantum &amp; society</span>
            </label>
            <span class="about-switch-thumb" aria-hidden="true" />
          </div>
          <div class="about-panes">
            <section class="about-pane about-pane--technical" aria-label="Technical work">
              {fm.technical && <WorkList items={fm.technical} />}
            </section>
            <section class="about-pane about-pane--society" aria-label="Quantum and society">
              {fm.society && <WorkList items={fm.society} />}
            </section>
          </div>
        </div>
      </section>

      {(fm.seeking || contactLinks.length > 0) && (
        <section class="about-cta">
          {fm.seeking && <p class="about-cta-text">{fm.seeking}</p>}
          {contactLinks.length > 0 && (
            <div class="about-cta-links">
              {contactLinks.map((link) => (
                <a
                  class="about-cta-link"
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </section>
      )}
    </article>
  )
}

AboutBody.css = aboutStyle

export default (() => AboutBody) satisfies QuartzComponentConstructor
