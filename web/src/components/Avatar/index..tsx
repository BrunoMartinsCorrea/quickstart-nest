import { StyledFallback, StyledImage, StyledRoot } from "./index.style"

interface AvatarProps {
  fallback: string;
  src: string;
  alt: string;
}

export function Avatar({fallback, src, alt}: AvatarProps) {
  return (
    <StyledRoot>
      <StyledImage src={src} alt={alt}/>
      <StyledFallback>{fallback}</StyledFallback>
    </StyledRoot>
  )
}
