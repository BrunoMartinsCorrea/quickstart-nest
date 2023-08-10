import { styled, css } from 'styled-components';

type ContainerProps = {
  width?: string;
};

export const Container = styled.div<ContainerProps>`
  border-radius: ${(props) => props.theme.borderRadiusLG};
  border: 1px solid ${(props) => props.theme.border};
  filter: ${(props) => props.theme.dropShadowSM};
  background-color: ${(props) => props.theme.background};
  width: 100%;

  ${(props) =>
    props.width &&
    css`
      max-width: ${props.width};
    `}
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1.5rem;
`;

export const ContainerFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  padding-top: 0;
`;

export const ContainerContent = styled.div`
  padding: 1.5rem;
  padding-top: 0;
`;
