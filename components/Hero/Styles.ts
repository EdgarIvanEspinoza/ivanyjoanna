import styled from 'styled-components';

export const StyledHeroWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

export const StyledHeroImageWrapper = styled.div`
  position: absolute;
  top: 52rem;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 980px) {
    top: 31rem;
  }
`;
