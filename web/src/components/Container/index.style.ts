import styled, { css } from "styled-components";

export const ContainerComponent = styled.div`
  padding: 1rem;
  width: 100%;
  margin: 0 auto;

  ${props => {
    const mediaQueries = css``;
    for (const key in props.theme.breakpoints) {
       mediaQueries.push(css`
        @media (min-width: ${props => props.theme.breakpoints[key]}) {
          max-width: ${props => props.theme.breakpoints[key]};
        }
      `);
    }
    return mediaQueries;
  }}
`;
