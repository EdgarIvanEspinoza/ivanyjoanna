import styled from 'styled-components';
import Image from 'next/image';

export const StyledDoorImage = styled(Image)`
  alignself: flex-end;
  max-width: 100vw;
  margin: 8.8rem auto 0 auto;
  object-fit: cover;
`;

export const StyledDoorImageMobile = styled(Image)`
  alignself: flex-end;
  max-width: 100vw;
  margin: 5rem auto 0 auto;
  object-fit: cover;
`;

export const StyledLabelDoorTitle = styled.label`
  position: absolute;
  top: 27rem;
  left: 50%;
  font-size: 5.6rem;
  line-height: 5.6rem;
  text-align: center;
  font-weight: 400;
  transform: translate(-50%, -50%);
  max-width: 17.1rem;
  max-height: 11.8rem;

  @media (max-width: 768px) {
    font-size: 3.2rem;
    line-height: 3.2rem;
    max-width: 9.8rem;
    top: 15.3rem;
  }
`;

export const StyledLabelDoorSubtitle = styled.label`
  position: absolute;
  top: 33rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.6rem;
  line-height: 1.6rem;
  text-align: center;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    line-height: 1.5rem;
    top: 47rem;
  }
`;
