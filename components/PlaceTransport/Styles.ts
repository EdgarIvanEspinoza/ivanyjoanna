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

export const StyledPlaceTransportDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 50.8rem;
  min-height: 33.3rem;
  border: 1px solid #e5dcbf;
  padding: 2.8rem;
  gap: 2.7rem;

  @media (max-width: 980px) {
    min-height: 100%;
  }
`;

export const StyledPlaceTransportDetailTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 400;
  line-height: 3.2rem;
  text-align: center;
  text-decoration-skip-ink: none;
`;

export const StyledPlaceTransportDetailText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: center;
`;

export const StyledPlaceTransportDetailFormWrapper = styled.div`
  display: flex;
  height: 4.7rem;
`;

export const StyledLink = styled(Link)`
  font-weight: 700;
  text-decoration: underline;
  font-family: Montserrat;
  font-weight: 700;
  font-size: 1.8rem;
`;
