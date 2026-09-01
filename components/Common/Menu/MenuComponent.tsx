import Link from 'next/link';
import { StyledLi, StyledUlMenu, StyledLiWedding, StyledLiPlain, StyledLiMuted } from './Styles';


export const MenuComponent = () => {


  return (
    <nav style={{"width": "100%", "padding": "1rem"}}>
      <StyledUlMenu>
        <StyledLi className="hover-animation">
            <Link href="/">Nosotros</Link>
        </StyledLi>
        <StyledLi className="hover-animation">
          <Link href="/travel">Lugar y Transporte</Link>
        </StyledLi>
        <StyledLiMuted>
          <Link href="/wedding-details">Detalles de la Boda</Link>
        </StyledLiMuted>
        <StyledLiWedding>
          <Link href="/media">Galería de fotos</Link>
        </StyledLiWedding>
      </StyledUlMenu>
    </nav>
  );
};
