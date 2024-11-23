import { useScreenSize } from '@/Contexts/ScreenContext';
import { DecoratorMobileComponent } from './DecoratorMobile/DecoratorMobileComponent';
import {
  StyledForever,
  StyledOurHistoryTitle,
  StyledOurHistoryWrapper,
  StyledMountainsBackground,
  StyledRoadBackground,
  StyledRoadBackgroundMobile,
} from './Styles';
import { PathStepComponent } from './PathStep/PathStepComponent';

export const OurHistoryComponent = () => {
  const { isLargeScreen } = useScreenSize();
  return (
    <StyledOurHistoryWrapper>
      {!isLargeScreen && <DecoratorMobileComponent />}
      <StyledOurHistoryTitle>Nuestra Historia</StyledOurHistoryTitle>
      {isLargeScreen ? (
        <>
          <StyledMountainsBackground
            src="/assets/images/mountains-bg.svg"
            alt="mountains-bg"
            width="1059"
            height="1262"
          />
          <StyledRoadBackground
            src="/assets/images/history-road.svg"
            alt="history-road"
            width="637"
            height="1171"
          />
        </>
      ) : (
        <StyledRoadBackgroundMobile
          src="/assets/images/history-road-mobile.svg"
          alt="history-road"
          width="288"
          height="1965"
        />
      )}
      <PathStepComponent
        top="25rem"
        left="12%"
        reverse={true}
        title="Nosotros"
        description="Two liner of a story I don’t know how long is going to be"
        imageUrl="/assets/images/path-placeholder.png"
      />
      <PathStepComponent
        top="45rem"
        left="55%"
        reverse={false}
        title="Nosotros"
        description="Two liner of a story I don’t know how long is going to be"
        imageUrl="/assets/images/path-placeholder.png"
      />
      <PathStepComponent
        top="65rem"
        left="12%"
        reverse={true}
        title="Nosotros"
        description="Two liner of a story I don’t know how long is going to be"
        imageUrl="/assets/images/path-placeholder.png"
      />
      <PathStepComponent
        top="85rem"
        left="55%"
        reverse={false}
        title="Nosotros"
        description="Two liner of a story I don’t know how long is going to be"
        imageUrl="/assets/images/path-placeholder.png"
      />
      <PathStepComponent
        top="105rem"
        left="12%"
        reverse={true}
        title="Nosotros"
        description="Two liner of a story I don’t know how long is going to be"
        imageUrl="/assets/images/path-placeholder.png"
      />
      <StyledForever>Forever</StyledForever>
    </StyledOurHistoryWrapper>
  );
};
