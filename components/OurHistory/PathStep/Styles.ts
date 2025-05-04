import styled from 'styled-components';
import Image from "next/legacy/image";

export const StyledPathStepWrapper = styled.div<{
  $reverse: boolean;
  $top: string;
  $left?: string;
  $right?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50rem;
  max-height: 21.2rem;
  height: 100%;
  position: absolute;
  top: 25rem;
  ${(props) => props.$top && `top: ${props.$top};`};
  ${(props) => props.$left && `left: ${props.$left};`};
  ${(props) => props.$right && `right: ${props.$right};`};
  ${(props) => props.$reverse && 'flex-direction: row-reverse;'};

  @media (max-width: 980px) {
    flex-direction: column;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);

    ${(props) => props.$top && `top: calc(${props.$top} * 2.2);`};
  }
`;

export const StyledPathStepLeyendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 26.4rem;
  height: auto;
  border: 0.1rem solid #e5dcbf;
  padding: 1.2rem;
  background: #515d38;
`;

export const StyledPathStepTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 400;
  width: 100%;
  margin-bottom: 0.8rem;
`;

export const StyledPathStepDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.5rem;
  font-weight: 400;
  height: 100%;
`;

export const StyledPathStepImage = styled(Image)`
  border-radius: 100%;
  object-fit: cover;
  border: 0.2rem dashed #e5dcbf;
`;

export const StyledPathStepConnectorImage = styled(Image)`
  object-fit: cover;
`;
