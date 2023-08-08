import { darken, lighten } from 'polished'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 1px solid ${props => darken(0.3, props.theme.border)};
    outline-offset: 0.15rem;
  }

  body {
    background: ${(props) => props.theme.background};
  }

  body, input, textarea, button {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 14px;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    html {
      font-size: 12px;
    }

    body, input, textarea, button {
      font-size: 12px;
    }
  }
`
