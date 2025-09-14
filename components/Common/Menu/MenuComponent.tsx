import Link from 'next/link';
import { useEffect, useState } from 'react';
import { StyledLi, StyledLiRSVP, StyledUlMenu, StyledLiWedding } from './Styles';

const RSVP_DEADLINE = new Date('2025-09-20T23:59:59+02:00').getTime();

export const MenuComponent = () => {
  const [rsvpOpen, setRsvpOpen] = useState(true);

  useEffect(() => {
    const check = () => {
      const now = Date.now();
      setRsvpOpen(now < RSVP_DEADLINE);
    };
    check();
    const id = setInterval(check, 60_000); // refresh every minute
    return () => clearInterval(id);
  }, []);

  return (
    <nav>
      <StyledUlMenu>
        <StyledLi className="hover-animation">
            <Link href="/#nosotros">Nosotros</Link>
        </StyledLi>
        <StyledLi className="hover-animation">
          <Link href="/travel">Lugar y Transporte</Link>
        </StyledLi>
        {rsvpOpen ? (
          <StyledLiRSVP className="rsvp-hover-animation">
            <Link href="/#rsvp">RSVP</Link>
          </StyledLiRSVP>
        ) : (
          <StyledLiRSVP style={{ opacity: 0.4, cursor: 'not-allowed' }}>
            <span style={{ textDecoration: 'line-through' }}>RSVP cerrado</span>
          </StyledLiRSVP>
        )}
        <StyledLiWedding>
          <Link href="/wedding-details">Detalles de la Boda</Link>
        </StyledLiWedding>
        {/* <StyledLi className="hover-animation">
          <Link href="/gallery">Galería</Link>
        </StyledLi> */}
      </StyledUlMenu>
    </nav>
  );
};
