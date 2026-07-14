import { QuartzPageTypePlugin } from "../types"
import { AboutBody } from "../../components"

export const AboutPageType: QuartzPageTypePlugin = () => ({
  name: "AboutPage",
  priority: 75,
  match: ({ slug }) => slug.toLowerCase() === "about",
  layout: "about",
  body: AboutBody,
})
