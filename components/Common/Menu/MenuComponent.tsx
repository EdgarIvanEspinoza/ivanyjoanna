import Link from 'next/link';
import { StyledLi, StyledLiRSVP, StyledUlMenu, StyledLiWedding } from './Styles';

export const MenuComponent = () => {
  return (
    <>
      <nav>
        <StyledUlMenu>
          <StyledLi className="hover-animation">
            <Link href="/#nosotros">Nosotros</Link>
          </StyledLi>
          <StyledLi className="hover-animation">
            <Link href="/travel">Lugar y Transporte</Link>
          </StyledLi>
          <StyledLiRSVP className="rsvp-hover-animation">
            <Link href="/#rsvp">RSVP</Link>
          </StyledLiRSVP>
          <StyledLiWedding>
            <Link href="/wedding-details">Detalles de la Boda</Link>
          </StyledLiWedding>
        </StyledUlMenu>
      </nav>
    </>
  );
};
