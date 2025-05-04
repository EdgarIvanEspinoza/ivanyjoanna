import styled from 'styled-components';
import Image from "next/legacy/image";

export const StyledDecoratorMobileImage = styled(Image)`
  width: 8rem;
  height: 8rem;
  object-fit: contain;
  transform: rotate(45deg);
  margin: 4.4rem 0 2.7rem;
`;

StyledDecoratorMobileImage.displayName = 'StyledDecoratorMobileImage';
