import { resolveRelative, simplifySlug } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import homeStyle from "./styles/home.scss"
// @ts-expect-error - inline script import handled by Quartz bundler
import homeScript from "./scripts/home.inline.ts"
// @ts-expect-error - subpath export not resolved under classic moduleResolution, but valid at runtime
import { htmlToJsx } from "@quartz-community/utils/jsx"
import { Node } from "hast"
import { VERDICT_ORDER, getVerdictMeta, normalizeVerdict, resolvePageSlug } from "./verdictMeta"

interface HastParent {
  children?: unknown[]
}

function titleCase(value: string): string {
  return value.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function uniqueSorted(values: (string | undefined)[]): string[] {
  return [...new Set(values.filter((v): v is string => Boolean(v)))].sort()
}

function pad2(n: number): string {
  return String(n).padStart(2, "0")
}

// Evidence-signal bars (0–5). Explicit `signal` frontmatter wins; otherwise a
// coarse default keyed off how speculative the timeline is.
function signalLevel(signal: unknown, timeline?: string): number {
  const explicit = typeof signal === "number" ? signal : Number.parseInt(String(signal ?? ""), 10)
  if (Number.isFinite(explicit)) return Math.max(0, Math.min(5, explicit))
  const t = (timeline ?? "").toLowerCase()
  if (t.includes("fault-tolerant")) return 3
  if (t.includes("unclear") || t === "") return 2
  return 3
}

const BAR_HEIGHTS = [5, 8, 11, 14, 17]

const HomeBody: QuartzComponent = ({ fileData, allFiles, tree }: QuartzComponentProps) => {
  const title = (fileData.frontmatter?.title as string | undefined) ?? "Quantum usecase zoo"
  const kicker =
    (fileData.frontmatter?.kicker as string | undefined) ??
    "An analysis of quantum technology claims"
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
      blurb: f.frontmatter?.blurb as string | undefined,
      note: f.frontmatter?.note as string | undefined,
      signal: signalLevel(f.frontmatter?.signal, f.frontmatter?.timeline as string | undefined),
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

  const filterGroups: { key: string; label: string; values: string[] }[] = [
    { key: "sector", label: "Sector", values: uniqueSorted(usecases.map((u) => u.sector)) },
    { key: "timeline", label: "Timeline", values: uniqueSorted(usecases.map((u) => u.timeline)) },
    { key: "verdict", label: "Verdict", values: verdictKeys },
  ]

  const faqSlug = resolvePageSlug(allFiles, "Quantum Advantage FAQ")

  // The footer byline's LinkedIn URL lives in About.md's `linkedin:` field so
  // it's maintained in one place; without it the name renders unlinked.
  const aboutSlug = resolvePageSlug(allFiles, "About")
  const aboutFile = allFiles.find((f) => f.slug === aboutSlug)
  const linkedin = aboutFile?.frontmatter?.linkedin as string | undefined

  return (
    <div class="usecase-home">
      <nav class="home-nav">
        <span class="home-wordmark">Quantum Usecase Zoo</span>
        <div class="home-nav-links">
          <a
            href={resolveRelative(fileData.slug!, simplifySlug("Methodology"))}
            class="home-nav-link"
          >
            Methodology
          </a>
          <a href={resolveRelative(fileData.slug!, simplifySlug("about"))} class="home-nav-link">
            About
          </a>
          <a
            href={resolveRelative(fileData.slug!, simplifySlug("contribute"))}
            class="home-nav-link"
          >
            Contribute
          </a>
          <button class="usecase-home-darkmode darkmode" aria-label="Toggle dark mode">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              class="dayIcon"
              x="0px"
              y="0px"
              viewBox="0 0 35 35"
              style="enable-background:new 0 0 35 35"
              xmlSpace="preserve"
              aria-label="Toggle dark mode"
            >
              <title>Toggle dark mode</title>
              <path d="M6,17.5C6,16.672,5.328,16,4.5,16h-3C0.672,16,0,16.672,0,17.5    S0.672,19,1.5,19h3C5.328,19,6,18.328,6,17.5z M7.5,26c-0.414,0-0.789,0.168-1.061,0.439l-2,2C4.168,28.711,4,29.086,4,29.5    C4,30.328,4.671,31,5.5,31c0.414,0,0.789-0.168,1.06-0.44l2-2C8.832,28.289,9,27.914,9,27.5C9,26.672,8.329,26,7.5,26z M17.5,6    C18.329,6,19,5.328,19,4.5v-3C19,0.672,18.329,0,17.5,0S16,0.672,16,1.5v3C16,5.328,16.671,6,17.5,6z M27.5,9    c0.414,0,0.789-0.168,1.06-0.439l2-2C30.832,6.289,31,5.914,31,5.5C31,4.672,30.329,4,29.5,4c-0.414,0-0.789,0.168-1.061,0.44    l-2,2C26.168,6.711,26,7.086,26,7.5C26,8.328,26.671,9,27.5,9z M6.439,8.561C6.711,8.832,7.086,9,7.5,9C8.328,9,9,8.328,9,7.5    c0-0.414-0.168-0.789-0.439-1.061l-2-2C6.289,4.168,5.914,4,5.5,4C4.672,4,4,4.672,4,5.5c0,0.414,0.168,0.789,0.439,1.06    L6.439,8.561z M33.5,16h-3c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5h3c0.828,0,1.5-0.672,1.5-1.5S34.328,16,33.5,16z     M28.561,26.439C28.289,26.168,27.914,26,27.5,26c-0.828,0-1.5,0.672-1.5,1.5c0,0.414,0.168,0.789,0.439,1.06l2,2    C28.711,30.832,29.086,31,29.5,31c0.828,0,1.5-0.672,1.5-1.5c0-0.414-0.168-0.789-0.439-1.061L28.561,26.439z M17.5,29    c-0.829,0-1.5,0.672-1.5,1.5v3c0,0.828,0.671,1.5,1.5,1.5s1.5-0.672,1.5-1.5v-3C19,29.672,18.329,29,17.5,29z M17.5,7    C11.71,7,7,11.71,7,17.5S11.71,28,17.5,28S28,23.29,28,17.5S23.29,7,17.5,7z M17.5,25c-4.136,0-7.5-3.364-7.5-7.5    c0-4.136,3.364-7.5,7.5-7.5c4.136,0,7.5,3.364,7.5,7.5C25,21.636,21.636,25,17.5,25z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              class="nightIcon"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              style="enable-background:new 0 0 100 100"
              xmlSpace="preserve"
              aria-label="Toggle light mode"
            >
              <title>Toggle light mode</title>
              <path d="M96.76,66.458c-0.853-0.852-2.15-1.064-3.23-0.534c-6.063,2.991-12.858,4.571-19.655,4.571  C62.022,70.495,50.88,65.88,42.5,57.5C29.043,44.043,25.658,23.536,34.076,6.47c0.532-1.08,0.318-2.379-0.534-3.23  c-0.851-0.852-2.15-1.064-3.23-0.534c-4.918,2.427-9.375,5.619-13.246,9.491c-9.447,9.447-14.65,22.008-14.65,35.369  c0,13.36,5.203,25.921,14.65,35.368s22.008,14.65,35.368,14.65c13.361,0,25.921-5.203,35.369-14.65  c3.872-3.871,7.064-8.328,9.491-13.246C97.826,68.608,97.611,67.309,96.76,66.458z"></path>
            </svg>
          </button>
        </div>
      </nav>

      <header class="home-head">
        <p class="home-kicker">{kicker}</p>
        <h1 class="usecase-home-title">
          <span class="home-title-inner">
            {title}
            <svg
              class="home-title-underline"
              viewBox="0 0 960 26"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M8 15 C 130 7, 280 19, 450 12 C 610 5, 750 17, 952 9"
                fill="none"
                stroke="currentColor"
                stroke-width="7.5"
                stroke-linecap="round"
              />
              <path
                d="M30 20 C 220 13, 420 21, 620 15 C 740 12, 830 16, 905 14"
                fill="none"
                stroke="currentColor"
                stroke-width="4.5"
                stroke-linecap="round"
                opacity="0.85"
              />
            </svg>
          </span>
        </h1>
      </header>

      <section class="home-usecases">
        <div class="home-section-head">
          <h2 class="home-section-title">Usecases</h2>
          {usecases.length > 0 && (
            <p class="usecase-scoreboard">
              <span class="scoreboard-total">{usecases.length} assessed</span>
              {scoreboard.map(({ key, meta, count }) => (
                <span class="scoreboard-item" data-verdict={key}>
                  <span class="scoreboard-dot" style={`background:${meta.color}`}></span>
                  {count} {meta.label.toLowerCase()}
                </span>
              ))}
            </p>
          )}
        </div>

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
          {usecases.map((u, i) => {
            const meta = getVerdictMeta(u.verdict)
            const no = pad2(i + 1)
            return (
              <a
                href={resolveRelative(fileData.slug!, u.slug)}
                class="tile"
                data-sector={u.sector ?? ""}
                data-timeline={u.timeline ?? ""}
                data-verdict={u.verdictKey}
              >
                <span class="tile-ghost" aria-hidden="true">
                  {no}
                </span>
                <div class="tile-top">
                  <span class="tile-no">No. {no}</span>
                  <span class="tile-chip">
                    <span class="tile-chip-mark" style={`background:${meta.color}`}></span>
                    {meta.label}
                  </span>
                </div>
                <h3 class="tile-title">{u.title}</h3>
                {u.blurb && <p class="tile-blurb">{u.blurb}</p>}
                {u.note && <span class="tile-note">{u.note}</span>}
                <span class="tile-spacer"></span>
                <div class="tile-meta">
                  <span class="tile-meta-text">
                    {u.sector && <span>{u.sector}</span>}
                    {u.sector && u.timeline && <span class="dot">·</span>}
                    {u.timeline && <span>{u.timeline}</span>}
                  </span>
                  <svg
                    class="tile-bars"
                    width="34"
                    height="18"
                    viewBox="0 0 34 18"
                    aria-hidden="true"
                  >
                    {BAR_HEIGHTS.map((h, bar) => (
                      <rect
                        x={bar * 7}
                        y={18 - h}
                        width="4"
                        height={h}
                        class={bar < u.signal ? "bar-on" : "bar-off"}
                      />
                    ))}
                  </svg>
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
      </section>

      {hasBody && (
        <div class="usecase-home-extra markdown-preview-view markdown-rendered">
          {htmlToJsx(tree as Node)}
        </div>
      )}

      <footer class="home-footer">
        <div class="home-footer-cols">
          <div class="home-footer-left">
            <h2 class="home-footer-title">Comments or suggestions?</h2>
            <p class="home-footer-write">
              <a href={resolveRelative(fileData.slug!, simplifySlug("about"))}>
                Please write to me!
              </a>
            </p>
            <p class="home-footer-hand">
              Built with{" "}
              <a href="https://quartz.jzhao.xyz" target="_blank" rel="noopener noreferrer">
                Quartz
              </a>
              , maintained using{" "}
              <a href="https://obsidian.md" target="_blank" rel="noopener noreferrer">
                Obsidian.md
              </a>{" "}
              by{" "}
              {linkedin ? (
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  Padmapriya Mohan
                </a>
              ) : (
                "Padmapriya Mohan"
              )}
            </p>
          </div>
          <nav class="home-footer-links" aria-label="Footer">
            <a href={resolveRelative(fileData.slug!, simplifySlug("Methodology"))}>Methodology</a>
            {faqSlug && (
              <a href={resolveRelative(fileData.slug!, faqSlug)}>Quantum Advantage FAQ</a>
            )}
            <a href={resolveRelative(fileData.slug!, simplifySlug("contribute"))}>
              Contribute a use case
            </a>
            <span class="home-footer-domain">quantumusecasezoo.org</span>
          </nav>
        </div>
      </footer>
    </div>
  )
}

HomeBody.css = homeStyle
HomeBody.afterDOMLoaded = homeScript

export default (() => HomeBody) satisfies QuartzComponentConstructor
