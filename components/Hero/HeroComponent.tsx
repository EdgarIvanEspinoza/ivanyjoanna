import { HeroDoorComponent } from './Door/HeroDoorComponent';
import { DecoratorLeftComponent } from './DecoratorLeft/DecoratorLeftComponent';
import { DecoratorRightComponent } from './DecoratorRight/DecoratorRightComponent';
import { StyledHeroWrapper } from './Styles';
import { HideOnTabletAndSmallScreens } from '../../Utils/MediaQuery';

export const HeroComponent = () => {
  return (
    <StyledHeroWrapper>
      <HideOnTabletAndSmallScreens>
        <DecoratorLeftComponent />
      </HideOnTabletAndSmallScreens>
      <HeroDoorComponent />
      <HideOnTabletAndSmallScreens>
        <DecoratorRightComponent />
      </HideOnTabletAndSmallScreens>
    </StyledHeroWrapper>
  );
};
