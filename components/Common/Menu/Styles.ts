import styled from 'styled-components';

export const StyledUlMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  list-style: none;
  margin-top: 2.4rem;
  font-size: 2rem;
  line-height: 2rem;
  width: 100%;

  @media (max-width: 980px) {
    gap: 0.8rem;
  }
`;

export const StyledLi = styled.li`
  background-color: #515d38;
  padding: 0.8rem;
  gap: 1rem;
  color: #e5dcbf;
`;

export const StyledLiRSVP = styled.li`
  background-color: #e5dcbf;
  padding: 0.8rem;
  gap: 1rem;
  color: #515d38;
`;
