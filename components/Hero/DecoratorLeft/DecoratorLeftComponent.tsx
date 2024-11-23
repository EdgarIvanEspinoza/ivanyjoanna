import {
  StyledLeftCornerImage,
  StyledWhiteStarOne,
  StyledWhiteStarTwo,
  StyledBlackStarOne,
  StyledBlackStarTwo,
} from './Styles';

export const DecoratorLeftComponent = () => {
  return (
    <>
      <StyledLeftCornerImage
        src="/assets/images/corner-left.svg"
        alt="Image"
        width={128}
        height={128}
      />
      <StyledWhiteStarOne
        src="/assets/images/star-white.svg"
        alt="Image"
        width={22}
        height={22}
      />
      <StyledWhiteStarTwo
        src="/assets/images/star-white.svg"
        alt="Image"
        width={22}
        height={22}
      />
      <StyledBlackStarOne
        src="/assets/images/star-black.svg"
        alt="Image"
        width={22}
        height={22}
      />
      <StyledBlackStarTwo
        src="/assets/images/star-black.svg"
        alt="Image"
        width={22}
        height={22}
      />
    </>
  );
};
