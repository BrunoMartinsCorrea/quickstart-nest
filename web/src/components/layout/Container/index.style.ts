import { styled } from 'styled-components';

export const ContainerComponent = styled.div`
  padding: 1rem 0;
  width: 100%;
  margin: 0 auto;
  max-width: ${(props) => props.theme.containerSize};

  @media (max-width: ${(props) => props.theme.containerSize}) {
    padding: 1rem;
  }
`;
