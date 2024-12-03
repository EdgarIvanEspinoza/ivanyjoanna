import { StyledLoadingWrapper } from './Style';
import Image from 'next/image';

export const Loading = () => {
  return (
    <StyledLoadingWrapper>
      <Image
        src="/assets/animations/ring.gif"
        alt="loading"
        width={100}
        height={100}
      />
      Cargando formulario...
    </StyledLoadingWrapper>
  );
};
