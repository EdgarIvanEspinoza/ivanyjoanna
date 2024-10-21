import { HeroDoorComponent } from './Door/HeroDoorComponent';
import { DecoratorLeftComponent } from './DecoratorLeft/DecoratorLeftComponent';
import { DecoratorRightComponent } from './DecoratorRight/DecoratorRightComponent';
import { StyledHeroWrapper } from './Styles';
import { useScreenSize } from '@/Contexts/ScreenContext';

export const HeroComponent = () => {
  const { isLargeScreen } = useScreenSize();

  return (
    <StyledHeroWrapper>
      {isLargeScreen && <DecoratorLeftComponent />}
      <HeroDoorComponent />
      {isLargeScreen && <DecoratorRightComponent />}
    </StyledHeroWrapper>
  );
};
