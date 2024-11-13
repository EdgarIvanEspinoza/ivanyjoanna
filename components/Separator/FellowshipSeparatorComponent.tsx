import { StyledFellowshipWrapper } from './Styles';
import Image from 'next/image';

export const FellowshipSeparatorComponent = () => {
  return (
    <StyledFellowshipWrapper>
      <Image
        src="/assets/images/img-fellowship.png"
        alt="Image"
        width={538}
        height={82}
      />
    </StyledFellowshipWrapper>
  );
};
