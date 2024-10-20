import {
  StyledBlackStarOne,
  StyledBlackStarTwo,
  StyledRightCornerImage,
  StyledWhiteStarOne,
  StyledWhiteStarTwo,
} from './Styles';

export const DecoratorRightComponent = () => {
  return (
    <>
      <StyledRightCornerImage
        src="/assets/img-corner-left.png"
        alt="Image"
        width={128}
        height={128}
      />
      <StyledWhiteStarOne
        src="/background/star-white.png"
        alt="Image"
        width={22}
        height={22}
      />
      <StyledWhiteStarTwo
        src="/background/star-white.png"
        alt="Image"
        width={22}
        height={22}
      />
      <StyledBlackStarOne
        src="/background/star-black.png"
        alt="Image"
        width={22}
        height={22}
      />
      <StyledBlackStarTwo
        src="/background/star-black.png"
        alt="Image"
        width={22}
        height={22}
      />
    </>
  );
};
