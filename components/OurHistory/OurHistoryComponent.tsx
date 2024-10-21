import { useScreenSize } from '@/Contexts/ScreenContext';
import { StyledOurHistoryTitle, StyledOurHistoryWrapper } from './Styles';
import { DecoratorMobbileComponent } from './DecoratorMobile/DecoratorMobileComponent';

export const OurHistoryComponent = () => {
  const { isLargeScreen } = useScreenSize();
  return (
    <StyledOurHistoryWrapper>
      {!isLargeScreen && <DecoratorMobbileComponent />}
      <StyledOurHistoryTitle>Nuestra Historia</StyledOurHistoryTitle>
    </StyledOurHistoryWrapper>
  );
};
