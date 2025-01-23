import styled from 'styled-components';
import Image from 'next/image';

export const StyledFellowshipWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 5rem;
  padding-right: 5rem;

  @media (max-width: 406px) {
    padding-right: 0;
  }
`;

export const StyledFellowshipImage = styled(Image)`
  width: 100%;
  height: auto;
  max-width: 40.6rem;
`;
