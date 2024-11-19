import { useScreenSize } from '@/Contexts/ScreenContext';
import { HeroDoorComponent } from './Door/HeroDoorComponent';
import { DecoratorLeftComponent } from './DecoratorLeft/DecoratorLeftComponent';
import { DecoratorRightComponent } from './DecoratorRight/DecoratorRightComponent';
import { HeroImageComponent } from './HeroImage/HeroImage';
import { StyledHeroWrapper, StyledHeroImageWrapper } from './Styles';

export const HeroComponent = () => {
  const { isLargeScreen } = useScreenSize();

  return (
    <StyledHeroWrapper>
      {isLargeScreen && <DecoratorLeftComponent />}
      <StyledHeroImageWrapper>
        <HeroImageComponent />
      </StyledHeroImageWrapper>
      <HeroDoorComponent />
      {isLargeScreen && <DecoratorRightComponent />}
    </StyledHeroWrapper>
  );
};
