import { styled } from 'styled-components';

export const Container = styled.textarea`
  min-height: 80px;
  background-color: ${(props) => props.theme.background};
  border-radius: ${(props) => props.theme.borderRadiusMD};
  border: 1px solid ${(props) => props.theme.border};
  padding: 0.5rem 0.75rem;
  width: 100%;
  resize: vertical;

  &::placeholder {
    color: ${(props) => props.theme.mutedText};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:disabled + label {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
