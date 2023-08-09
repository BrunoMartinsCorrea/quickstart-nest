import styled from "styled-components";

export const Container = styled.input`
  height: 2.5rem;
  border-radius: ${props => props.theme.borderRadiusMD};
  border: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.background};
  padding: 0.5rem 0.75rem;
  width: 100%;

  &::placeholder {
    color: ${props => props.theme.mutedText};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:disabled + label {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[type=file] {
    background: transparent;
    cursor: pointer;

    &::file-selector-button {
      border: 0;
      font-weight: 700;
      background: transparent;
      padding: 0 0.5rem 0 0;
      line-height: 1.6;
    }
  }
`;
