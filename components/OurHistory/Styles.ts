import Image from 'next/image';
import styled from 'styled-components';

export const StyledOurHistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 150rem;
  height: 100%;
  position: relative;
  margin: 5rem auto 0;
`;

export const StyledPathStepComponentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 980px) {
    flex-direction: column;
  }
`;

export const StyledOurHistoryTitle = styled.h1`
  font-size: 5.6rem;
  line-height: 5.6rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 2.4rem;

  @media (max-width: 980px) {
    font-size: 3.6rem;
    line-height: 3.6rem;
  }
`;

export const StyledMountainsBackground = styled(Image)`
  max-width: 110rem;
  object-fit: cover;
`;

export const StyledRoadBackground = styled(Image)`
  position: absolute;
  max-width: 110rem;
  object-fit: cover;
  margin-top: 2.65rem;
`;

export const StyledForever = styled.p`
  font-family: Montaga;
  font-size: 3.2rem;
`;

export const StyledRoadBackgroundMobile = styled(Image)`
  max-width: 130rem;
  object-fit: cover;
  margin-top: 2.65rem;
  margin-bottom: 22.65rem;
`;
