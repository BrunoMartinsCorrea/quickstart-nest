import { darken } from 'polished';
import { createGlobalStyle, keyframes } from 'styled-components';

interface GlobalStyleProps {}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  :focus {
    outline: 1px solid ${(props) => darken(0.3, props.theme.outline)};
    outline-offset: 0.15rem;
  }

  body {
    /* background: ${(props) => props.theme.surface}; */
  }

  body, input, textarea, button {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: ${(props) => props.theme.fontSize};
    /* line-height: 1.4; */
  }

  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    html {
      font-size: calc(${(props) => props.theme.fontSize} -2px);
    }

    body, input, textarea, button {
      font-size: calc(${(props) => props.theme.fontSize} -2px);
    }
  }
`;
export const fadeInAnimation = keyframes`
  from { opacity: 0 }
  to { opacity:  1 }
`;

export const fadeOutAnimation = keyframes`
  from { opacity: 1 }
  to { opacity: 0 }
`;

export const scaleInAnimation = keyframes`
  from { transform: scale(0.7) }
  to { transform: scale(1) }
`;

export const scaleOutAnimation = keyframes`
  from { transform: scale(1) }
  to { transform: scale(0.7) }
`;
