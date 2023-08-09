import styled from "styled-components";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

export const StyledRadioGroup = styled(RadioGroupPrimitive.Root)`
  display: grid;
  gap: 0.5rem;
`;

export const StyledRadioItem = styled(RadioGroupPrimitive.Item)`
  aspect-ratio: 1 / 1;
  height: 1rem;
  width: 1rem;
  border-radius: 9999px;
  border: 1px solid ${props => props.theme.primary};
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.primary};


  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const StyledRadioIndicator = styled(RadioGroupPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    height: 0.625rem;
    width: 0.625rem;
    background-color: ${props => props.theme.primary};
    border-radius: 9999px;
  }
`;
