import { useScreenSize } from '@/Contexts/ScreenContext';
import { DecoratorMobileComponent } from './DecoratorMobile/DecoratorMobileComponent';
import {
  StyledForever,
  StyledOurHistoryTitle,
  StyledOurHistoryWrapper,
  StyledMountainsBackground,
  StyledRoadBackground,
} from './Styles';
import { PathStepComponent } from './PathStep/PathStepComponent';

export const OurHistoryComponent = () => {
  const { isLargeScreen } = useScreenSize();
  return (
    <StyledOurHistoryWrapper>
      {!isLargeScreen && <DecoratorMobileComponent />}
      <StyledOurHistoryTitle>Nuestra Historia</StyledOurHistoryTitle>
      <StyledMountainsBackground
        src="/assets/images/mountains-bg.png"
        alt="mountains-bg"
        width="1059"
        height="1262"
      />
      <StyledRoadBackground
        src="/assets/images/history-road.png"
        alt="history-road"
        width="637"
        height="1171"
      />
      <StyledForever>Forever</StyledForever>
    </StyledOurHistoryWrapper>
  );
};
