import { StyledFooterImage, StyledFooterWrapper } from './Styles';

export const FooterComponent = () => {
  return (
    <StyledFooterWrapper>
      <StyledFooterImage
        src="/assets/images/gondor-tree.svg"
        alt="img-gondor-tree"
        width={65.73}
        height={93}
      />
    </StyledFooterWrapper>
  );
};
