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
          src="/assets/images/img-door.png"
          alt="Image"
          width={563}
          height={662}
        />
      ) : (
        <StyledDoorImageMobile
          src="/assets/images/img-door.png"
          alt="Image"
          width={347}
          height={408}
        />
      )}
      <StyledLabelDoorTitle>Joanna & Ivan</StyledLabelDoorTitle>
      <StyledLabelDoorSubtitle>Viernes 10 Octubre 2025</StyledLabelDoorSubtitle>
    </>
  );
};
