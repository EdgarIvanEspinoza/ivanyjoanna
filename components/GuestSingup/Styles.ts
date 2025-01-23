import styled from 'styled-components';

export const StyledSignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 980px) {
    font-size: 3.6rem;
    line-height: 3.6rem;
    padding: 0 2.4rem;
  }
`;

export const StyledSignupTitle = styled.h2`
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

export const StyledSingupDescription = styled.p`
  font-size: 2rem;
  line-height: 2.4rem;
  font-weight: 400;
  margin-bottom: 2.4rem;
  max-width: 100rem;

  @media (max-width: 980px) {
    font-size: 1.8rem;
    line-height: 2.2rem;
  }
`;
