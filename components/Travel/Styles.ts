import Link from 'next/link';
import styled from 'styled-components';

export const StyledPlaceTransportWrapper = styled.div`
  background: #454f30;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledPlaceTransportTitle = styled.h1`
  font-size: 5.6rem;
  line-height: 5.6rem;
  font-weight: 400;
  text-align: center;
  margin: 7.2rem 0;

  @media (max-width: 980px) {
    font-size: 3.6rem;
    line-height: 3.6rem;
  }
`;

export const StyledPlaceTransportDetailBoxWrapper = styled.div`
  display: flex;
  gap: 6.4rem;

  @media (max-width: 980px) {
    flex-direction: column;
    gap: 3.2rem;
  }
`;

export const StyledPlaceTransportDetailBox = styled.div<{ reverse?: string }>`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 2.4rem;
  min-height: 33.3rem;
  border: 1px solid #e5dcbf;
  padding: 2.8rem;
  gap: 2.7rem;

  @media (max-width: 980px) {
    min-height: 100%;
    flex-direction: ${({ reverse }) =>
      reverse === 'isReverse' ? 'column-reverse' : 'column'};
  }
`;

export const StyledPlaceTransportDetailTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 400;
  line-height: 3.2rem;
  text-align: center;
  text-decoration-skip-ink: none;
`;

export const StyledPlaceTransportDetailText = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: ju;
`;

export const StyledPlaceTransportDetailFormWrapper = styled.div`
  display: flex;
  height: 4.7rem;
`;

export const StyledDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 50%;

  @media (max-width: 980px) {
    max-width: 100%;
  }
`;

export const StyledLink = styled(Link)`
  font-weight: 700;
  text-decoration: underline;
  font-family: Montserrat;
  font-weight: 700;
  font-size: 1.8rem;
`;

export const StyledALink = styled.a`
  font-weight: 700;
  text-decoration: underline;
  font-family: Montserrat;
  font-weight: 700;
  font-size: 1.8rem;
`;

export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 ratio */
  height: 0;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;
