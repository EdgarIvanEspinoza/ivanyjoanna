import Image from 'next/image';
import styled from 'styled-components';

export const StyledFooterWrapper = styled.div`
  background: #454f30;
  width: 100%;
  height: 100%;
  padding: 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

export const StyledFooterImage = styled(Image)`
  width: auto;
  height: auto;
`;

export const StyledCredits = styled.div`
  color: #e5dcbf;
  font-size: 1.2rem;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  opacity: 0.85;
  letter-spacing: 0.3px;
`;

export const StyledDeveloper = styled.div`
  color: #b7b09a;
  font-size: 1.1rem;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  opacity: 0.75;
  
  a {
    color: #f7e9b0;
    text-decoration: none;
    transition: all 0.3s ease;
    border-bottom: 1px solid transparent;
    
    &:hover {
      color: #fffbe6;
      border-bottom-color: #f7e9b0;
      opacity: 1;
    }
  }
`;
