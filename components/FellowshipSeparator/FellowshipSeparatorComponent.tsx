import { StyledFellowshipWrapper, StyledFellowshipImage } from './Styles';

export const FellowshipSeparatorComponent = () => {
  return (
    <StyledFellowshipWrapper>
      <StyledFellowshipImage
        src="/assets/images/fellowship.svg"
        alt="Image"
        layout="responsive"
        width={538}
        height={82}
      />
    </StyledFellowshipWrapper>
  );
};
