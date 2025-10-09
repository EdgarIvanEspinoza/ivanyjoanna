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
