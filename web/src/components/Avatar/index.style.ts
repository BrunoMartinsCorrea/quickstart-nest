import { styled } from 'styled-components';
import * as AvatarPrimitive from "@radix-ui/react-avatar"

// "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",

export const StyledRoot = styled(AvatarPrimitive.Root)`
  position: relative;
  display: flex;
  height: 2.5rem;
  width: 2.5rem;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 9999px;
`;

export const StyledImage = styled(AvatarPrimitive.Image)`
  aspect-ratio: 1 / 1;
  height: 100%;
  width: 100%;
`;


export const StyledFallback = styled(AvatarPrimitive.AvatarFallback)`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: ${props => props.theme.mutedBackground};
`;
