import styled from 'styled-components';
import Image from 'next/image';

export const StyledPathStepWrapper = styled.div<{ reverse: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  ${(props) => props.reverse && 'flex-direction: reverse-row;'};
`;

export const StyledPathStepTitle = styled.h1`
  font-size: 3.6rem;
  line-height: 3.6rem;
  font-weight: 400;
  text-align: center;
  margin: 2.4rem 0 1.6rem 0;
`;

export const StyledPathStepDescription = styled.p`
  font-size: 1.8rem;
  line-height: 2.4rem;
  font-weight: 400;
  text-align: center;
`;

export const StyledPathStepImage = styled(Image)`
  border-radius: 100%;
  object-fit: cover;
`;

export const StyledPathStepConnectorImage = styled(Image)`
  object-fit: cover;
`;

export const StyledPathStepLeyendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
