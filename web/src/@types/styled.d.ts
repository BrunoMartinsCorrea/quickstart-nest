import 'styled-components'
import { Theme } from '../styles/themes/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
