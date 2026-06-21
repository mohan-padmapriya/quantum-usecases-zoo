import { QuartzPageTypePlugin } from "../types"
import { match } from "./matchers"
import { UseCaseNoteBody } from "../../components"

export const UseCaseNotePageType: QuartzPageTypePlugin = () => ({
  name: "UseCaseNotePage",
  priority: 50,
  match: match.frontmatter("tags", (tags) => Array.isArray(tags) && tags.includes("usecase")),
  layout: "usecase-note",
  body: UseCaseNoteBody,
})
