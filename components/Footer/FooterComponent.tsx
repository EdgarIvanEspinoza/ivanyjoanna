import { StyledFooterWrapper } from './Styles';
import Image from 'next/image';

export const FooterComponent = () => {
  return (
    <StyledFooterWrapper>
      <Image
        src="/assets/images/gondor-tree.svg"
        alt="img-gondor-tree"
        width={65.73}
        height={93}
      />
    </StyledFooterWrapper>
  );
};
