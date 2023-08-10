import { styled } from 'styled-components';

export const Separator = styled.hr`
  width: 100%;
  border-style: inset;
  border-color: ${(props) => props.theme.border};
  border-top: 1px;
`;
