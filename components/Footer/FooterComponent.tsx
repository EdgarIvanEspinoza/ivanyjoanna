import { StyledFooterWrapper, StyledFooterImager } from './Styles';

export const FooterComponent = () => {
  return (
    <StyledFooterWrapper>
      <StyledFooterImager
        src="/assets/img-fellowship.png"
        alt="Image"
        width={538}
        height={82}
      />
    </StyledFooterWrapper>
  );
};
