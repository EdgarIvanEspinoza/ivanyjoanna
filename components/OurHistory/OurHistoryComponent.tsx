import { useScreenSize } from '@/Contexts/ScreenContext';
import { DecoratorComponent } from '../Common/Decorator/DecoratorComponent';
import {
  StyledForever,
  StyledOurHistoryTitle,
  StyledOurHistoryWrapper,
  StyledMountainsBackground,
  StyledRoadBackground,
  StyledRoadBackgroundMobile,
  StyledPathStepComponentWrapper,
} from './Styles';
import { PathStepComponent } from './PathStep/PathStepComponent';

export const OurHistoryComponent = () => {
  const { isLargeScreen } = useScreenSize();
  return (
    <StyledOurHistoryWrapper id="nosotros">
      {!isLargeScreen && <DecoratorComponent />}
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
          priority
        />
      )}
      <StyledPathStepComponentWrapper>
        <PathStepComponent
          top={isLargeScreen ? '25rem' : '20rem'}
          left="12%"
          reverse={true}
          title="El Inicio de la Aventura"
          description="En Caracas, nuestros caminos se cruzaron como dos viajeros destinados a encontrarse."
          imageUrl="/assets/photos/history1.jpg"
        />
        <PathStepComponent
          top={isLargeScreen ? '45rem' : '40rem'}
          right="12%"
          reverse={false}
          title="Leales Compañeros"
          description="Odín y ahora Thor han sido los guardianes de nuestra pequeña comunidad. Nos une el amor por lo extraordinario: videojuegos, anime y mundos mágicos."
          imageUrl="/assets/photos/history2.jpg"
        />
        <PathStepComponent
          top={isLargeScreen ? '65rem' : '60rem'}
          left="12%"
          reverse={true}
          title="Barcelona Encantada"
          description="Durante la pandemia, quedamos atrapados en la mágica Barcelona. Allí forjamos un lazo inquebrantable, guiados por nuestra luz."
          imageUrl="/assets/photos/history3.jpg"
        />
        <PathStepComponent
          top={isLargeScreen ? '85rem' : '80rem'}
          right="12%"
          reverse={false}
          title="Las Tierras de Madrid"
          description="En Madrid, hemos hecho realidad nuestros sueños. Juntos exploramos el mundo, escribiendo capítulos llenos de magia."
          imageUrl="/assets/photos/history4.jpg"
        />
        <PathStepComponent
          top={isLargeScreen ? '105rem' : '100rem'}
          left="12%"
          reverse={true}
          title="Propuesta Épica"
          description="El 22 de septiembre de 2023, en una tarima iluminada, llegó un momento inolvidable. Como en los cuentos épicos, nuestro amor se transformó en una propuesta mágica. Su 'sí' marcó el inicio de nuestra leyenda."
          imageUrl="/assets/photos/history5.jpg"
        />
      </StyledPathStepComponentWrapper>
      <StyledForever>Forever</StyledForever>
    </StyledOurHistoryWrapper>
  );
};
