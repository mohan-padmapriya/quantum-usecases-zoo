import NotFound from "./pages/404"
import Head from "./Head"
import Spacer from "./Spacer"
import DesktopOnly from "./DesktopOnly"
import MobileOnly from "./MobileOnly"
import Flex from "./Flex"
import ConditionalRender from "./ConditionalRender"
import HomeBody from "./HomeBody"
import UseCaseNoteBody from "./UseCaseNoteBody"
import AboutBody from "./AboutBody"

export { componentRegistry, defineComponent } from "./registry"
export { External } from "./external"
export type { ComponentManifest, RegisteredComponent } from "./registry"
export type { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export {
  Head,
  Spacer,
  DesktopOnly,
  MobileOnly,
  NotFound,
  Flex,
  ConditionalRender,
  HomeBody,
  UseCaseNoteBody,
  AboutBody,
}
