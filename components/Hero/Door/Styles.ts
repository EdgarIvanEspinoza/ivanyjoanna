import styled from 'styled-components';
import Image from 'next/image';

export const StyledDoorImage = styled(Image)`
  align-self: flex-end;
  max-width: 100vw;
  margin: 8.8rem auto 0 auto;
  object-fit: cover;
  z-index: 1;
`;

export const StyledDoorImageMobile = styled(Image)`
  z-index: 1;
  align-self: flex-end;
  max-width: 100vw;
  margin: 5rem auto 0 auto;
  object-fit: cover;
`;

export const StyledLabelDoorTitle = styled.h2`
  position: absolute;
  top: 24rem;
  left: 50%;
  font-size: 5.6rem;
  line-height: 5.6rem;
  text-align: center;
  font-weight: 400;
  transform: translate(-50%, -50%);
  max-width: 17.1rem;
  max-height: 11.8rem;

  @media (max-width: 980px) {
    font-size: 3.2rem;
    line-height: 3.2rem;
    max-width: 9.8rem;
    top: 14.5rem;
  }
`;

export const StyledLabelDoorSubtitle = styled.h5`
  position: absolute;
  top: 30.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.6rem;
  line-height: 1.6rem;
  text-align: center;
  font-weight: 400;

  @media (max-width: 980px) {
    font-size: 1.5rem;
    line-height: 1.5rem;
    top: 18rem;
  }
`;
