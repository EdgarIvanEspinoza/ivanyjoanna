import Image from 'next/image';
import styled, { keyframes } from 'styled-components';

const starAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

export const StyledRightCornerImage = styled(Image)`
  margin: 4.8rem 4.8rem 0 0;
  transform: scaleX(-1);
`;

export const StyledWhiteStarOne = styled(Image)`
  position: absolute;
  top: 78rem;
  right: 4%;
  animation: ${starAnimation} 1s ease-in-out infinite;
`;

export const StyledWhiteStarTwo = styled(Image)`
  position: absolute;
  top: 44.5rem;
  right: 7.9%;
  animation: ${starAnimation} 1.5s ease-in-out infinite;
`;

export const StyledBlackStarOne = styled(Image)`
  position: absolute;
  top: 31.1rem;
  right: 16%;
  animation: ${starAnimation} 1.5s ease-in-out infinite;
`;

export const StyledBlackStarTwo = styled(Image)`
  position: absolute;
  top: 67.3rem;
  right: 19.5%;
  animation: ${starAnimation} 1s ease-in-out infinite;
`;
