import { useScreenSize } from '@/Contexts/ScreenContext';
import { StyledLi, StyledLiRSVP, StyledUlMenu } from './Styles';

export const MenuComponent = () => {
  const { isLargeScreen } = useScreenSize();

  return (
    <>
      {isLargeScreen ? (
        <nav>
          <StyledUlMenu>
            <StyledLi className="hover-animation">
              <a href="#nosotros">Nosotros</a>
            </StyledLi>
            <StyledLi className="hover-animation">
              <a href="#lugar-y-logistica">Lugar y logística</a>
            </StyledLi>
            <StyledLiRSVP className="rsvp-hover-animation">
              <a href="#rsvp">RSVP</a>
            </StyledLiRSVP>
          </StyledUlMenu>
        </nav>
      ) : null}
    </>
  );
};
