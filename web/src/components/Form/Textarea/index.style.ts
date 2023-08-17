import { styled } from 'styled-components';

export const StyledTextarea = styled.textarea`
  min-height: 80px;
  background-color: ${(props) => props.theme.surface};
  border-radius: ${(props) => props.theme.borderRadiusMD};
  border: 1px solid ${(props) => props.theme.outline};
  padding: 0.5rem 0.75rem;
  width: 100%;
  resize: vertical;

  &::placeholder {
    color: ${(props) => props.theme.caption};
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
