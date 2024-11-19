import { StyledHeroImage } from './Styles';
import { useScreenSize } from '@/Contexts/ScreenContext';

export const HeroImageComponent = () => {
  const { isLargeScreen } = useScreenSize();

  return isLargeScreen ? (
    <StyledHeroImage
      src="/assets/images/hero-image.jpg"
      alt="hero-image"
      width="246"
      height="341"
    />
  ) : (
    <StyledHeroImage
      src="/assets/images/hero-image.jpg"
      alt="hero-image"
      width="151"
      height="210"
    />
  );
};
