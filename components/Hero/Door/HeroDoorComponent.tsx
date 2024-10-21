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
          src="/assets/img-door.png"
          alt="Image"
          width={629}
          height={740}
        />
      ) : (
        <StyledDoorImageMobile
          src="/assets/img-door.png"
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
