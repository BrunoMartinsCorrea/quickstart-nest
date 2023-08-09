import styled from "styled-components";

/*
"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2
text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none
focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed
disabled:opacity-50",
  */
export const Container = styled.textarea`
  min-height: 80px;
  background-color: ${props => props.theme.background};
  border-radius: ${props => props.theme.borderRadiusMD};
  border: 1px solid ${props => props.theme.border};
  padding: 0.5rem 0.75rem;
  width: 100%;
  resize: vertical;

  &::placeholder {
    color: ${props => props.theme.mutedText};
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
