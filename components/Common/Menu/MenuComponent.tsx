import { StyledLi, StyledLiRSVP, StyledUlMenu } from './Styles';

export const MenuComponent = () => {
  return (
    <>
      <nav>
        <StyledUlMenu>
          <StyledLi className="hover-animation">
            <a href="/#nosotros">Nosotros</a>
          </StyledLi>
          <StyledLi className="hover-animation">
            <a href="/travel">Lugar y Transporte</a>
          </StyledLi>
          <StyledLiRSVP className="rsvp-hover-animation">
            <a href="/#rsvp">RSVP</a>
          </StyledLiRSVP>
        </StyledUlMenu>
      </nav>
    </>
  );
};
