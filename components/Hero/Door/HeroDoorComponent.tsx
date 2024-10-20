import {
  StyledDoorImage,
  StyledLabelDoorSubtitle,
  StyledLabelDoorTitle,
} from './Styles';

export const HeroDoorComponent = () => {
  return (
    <>
      <StyledDoorImage
        src="/assets/img-door.png"
        alt="Image"
        width={629}
        height={740}
      />
      <StyledLabelDoorTitle>Joanna & Ivan</StyledLabelDoorTitle>
      <StyledLabelDoorSubtitle>Viernes 10 Octubre 2025</StyledLabelDoorSubtitle>
    </>
  );
};
