import { QuartzPageTypePlugin } from "../types"
import { HomeBody } from "../../components"

export const HomePageType: QuartzPageTypePlugin = () => ({
  name: "HomePage",
  priority: 100,
  match: ({ slug }) => slug === "index",
  layout: "home",
  frame: "full-width",
  body: HomeBody,
})
