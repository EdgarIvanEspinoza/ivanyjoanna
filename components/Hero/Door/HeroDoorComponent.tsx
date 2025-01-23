import {
  StyledDoorImage,
  StyledDoorImageMobile,
  StyledLabelDoorSubtitle,
  StyledLabelDoorTitle,
} from './Styles';
import { useScreenSize } from '@/Contexts/ScreenContext';

export const HeroDoorComponent = () => {
  const { isLargeScreen } = useScreenSize();
  return (
    <>
      {isLargeScreen ? (
        <StyledDoorImage
          src="/assets/images/door.svg"
          alt="Image"
          width={563}
          height={662}
          priority
        />
      ) : (
        <StyledDoorImageMobile
          src="/assets/images/door.svg"
          alt="Image"
          width={347}
          height={408}
          priority
        />
      )}
      <StyledLabelDoorTitle>Joanna & Ivan</StyledLabelDoorTitle>
      <StyledLabelDoorSubtitle>Viernes 10 Octubre 2025</StyledLabelDoorSubtitle>
    </>
  );
};
