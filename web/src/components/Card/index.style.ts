import { styled } from 'styled-components';

export type CardContainerProps = {
  $maxW?: string;
};

export const CardContainer = styled.div<CardContainerProps>((props) => ({
  borderRadius: props.theme.borderRadiusLG,
  border: `1px solid ${props.theme.outline}`,
  filter: props.theme.dropShadowSM,
  backgroundColor: props.theme.card,
  color: props.theme.onCard,
  width: '100%',
  maxWidth: props.$maxW,
}));

export const CardContainerHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1.5rem;
`;

export const CardContainerFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  padding-top: 0;
`;

export const CardContainerContent = styled.footer`
  padding: 1.5rem;
  padding-top: 0;
`;
