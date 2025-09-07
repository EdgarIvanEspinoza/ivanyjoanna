import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { FooterComponent } from '../Common/Footer/FooterComponent';
import { MenuComponent } from '../Common/Menu/MenuComponent';
import { FellowshipSeparatorComponent } from '../Common/FellowshipSeparator/FellowshipSeparatorComponent';
import { DecoratorComponent } from '../Common/Decorator/DecoratorComponent';
import { StyledPlaceTransportWrapper, StyledPlaceTransportDetailTitle } from './Styles';

// Wrapper ahora reutiliza el contenedor base oscuro para coherencia
const StyledWrapper = styled(StyledPlaceTransportWrapper)`
  padding-bottom: 8rem;
`;

const StyledTitle = styled(StyledPlaceTransportDetailTitle)`
  font-size: 5.6rem;
  line-height: 5.6rem;
  margin: 4rem 0 3.2rem 0;
  color: #e5dcbf;
  text-shadow: 0 2px 8px #222a13;
  @media (max-width: 980px) {
    font-size: 3.6rem;
    line-height: 3.6rem;
  }
`;

const CountdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 22rem;
  width: 100%;
  background: #ffffff;
  margin: 4rem 0 4.8rem 0;
  box-shadow: 0 0 0 1px #e5dcbf inset, 0 4px 18px -6px rgba(0,0,0,0.45);
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(229,220,191,0.35), transparent 70%);
    pointer-events: none;
  }
`;

const StyledCountdown = styled.div`
  font-family: 'Montaga', serif;
  font-size: 4.8rem;
  color: #454f30;
  text-align: center;
  font-weight: 400;
  letter-spacing: 1px;
  padding: 2rem 3.2rem 1.2rem 3.2rem;
  line-height: 5rem;
  @media (max-width: 980px) {
    font-size: 3rem;
    line-height: 3.4rem;
  }
  span.sub {
    display: block;
    font-size: 1.8rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    margin-top: 1.2rem;
    color: #222a13;
  }
`;

const StyledSection = styled.section`
  width: 80%;
  max-width: 1100px;
  border: 1px solid #e5dcbf;
  background: rgba(69,79,48,0.4);
  backdrop-filter: blur(4px);
  border-radius: 0;
  margin: 4.8rem 0;
  padding: 4rem 6rem;
  font-family: 'Montserrat', sans-serif;
  color: #e5dcbf;
  font-size: 1.8rem;
  line-height: 2.6rem;
  @media (max-width: 980px) {
    padding: 3.2rem 2.4rem;
    font-size: 1.5rem;
    line-height: 2.2rem;
  }
  h2 {
    font-family: 'Montaga', serif;
    font-size: 3.2rem;
    line-height: 3.2rem;
    font-weight: 400;
    margin: 0 0 2.4rem 0;
    text-align: center;
    color: #e5dcbf;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  li:before {
    content: '✶';
    color: #e5dcbf;
    margin-right: 0.8rem;
  }
  a {
    color: #e5dcbf;
    text-decoration: underline;
  }
`;

const StyledContact = styled.div`
  margin-top: 1.5rem;
  font-size: 1.6rem;
  text-align: center;
`;

const StyledLove = styled.div`
  margin: 6.4rem 0 2rem 0;
  font-size: 2rem;
  font-family: 'Montaga', serif;
  color: #e5dcbf;
  text-align: center;
  line-height: 2.8rem;
  padding: 0 2rem;
`;

const StyledRing = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0 1rem 0;
`;

function getTimeLeft() {
  const eventDate = new Date('2025-10-10T17:30:00+02:00');
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function WeddingDetailsPage() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <StyledWrapper>
      <div style={{ alignSelf: 'center' }}>
        <DecoratorComponent />
      </div>
      <MenuComponent />
      <FellowshipSeparatorComponent />
  <CountdownContainer>
        <StyledCountdown>
          {timeLeft ? (
            <>
      Faltan <b>{timeLeft.days}</b> días, <b>{timeLeft.hours}</b> horas, <b>{timeLeft.minutes}</b> minutos y <b>{timeLeft.seconds}</b> segundos
      <span className="sub">para el inicio de la aventura el 10 de octubre de 2025 a las 17:30h</span>
            </>
          ) : (
            <span>¡La aventura ha comenzado!</span>
          )}
        </StyledCountdown>
      </CountdownContainer>
      <StyledRing>
        <Image src="/assets/animations/ring.gif" alt="Anillo Único" width={90} height={90} />
      </StyledRing>
      <StyledTitle>
        Detalles de la Boda
      </StyledTitle>
  <StyledSection>
        <h2>Convocatoria</h2>
        <p>
          La cita es en el <b>Palacio de la Silvela</b> a las <b>17:30h</b>.<br />
          <i>"No llegues tarde, pues ni los magos lo hacen a una boda de la Tierra Media."</i>
        </p>
        <p>
          Se prevé un clima agradable, pero en la Comarca siempre es sabio llevar una bufanda o capa ligera por si acaso. El evento será mayormente en interiores, pero habrá momentos al aire libre.
        </p>
        <p>
          Las mesas para la cena están asignadas; al llegar, encontrarás tu lugar en el gran salón. Si tienes alguna preferencia alimentaria, háznoslo saber.
        </p>
        <p>
          <b>Dress code:</b> Ven como un auténtico miembro de la Comunidad del Anillo: elegante, cómodo y con espíritu aventurero. ¡Disfraces sutiles de la Tierra Media son bienvenidos!
        </p>
      </StyledSection>
  <StyledSection>
        <h2>¿Dudas, preguntas o mensajes de los elfos?</h2>
        <StyledContact>
          Puedes escribirnos a <a href="mailto:ivanjoanna.boda@gmail.com">ivanjoanna.boda@gmail.com</a> o enviarnos un mensaje por WhatsApp a <a href="https://wa.me/34666666666" target="_blank" rel="noopener noreferrer">+34 666 66 66 66</a>.<br />
          Estaremos atentos como los centinelas de Lothlórien.
        </StyledContact>
      </StyledSection>
  <StyledSection>
        <h2>Consejos para tu travesía</h2>
        <ul>
          <li>El parking es gratuito y amplio junto al palacio.</li>
          <li>Habrá un pequeño kit de bienvenida para cada invitado.</li>
          <li>Si necesitas taxi, te ayudamos a gestionarlo en el evento.</li>
          <li>La música y la fiesta durarán hasta bien entrada la noche.</li>
          <li>¡No olvides tu anillo... de alegría!</li>
        </ul>
      </StyledSection>
      <StyledLove>
        Los esperamos con amor y la bendición de los Valar.<br />
        <i>"Que el sol brille sobre el camino que te lleva a Aranjuez."</i>
      </StyledLove>
      <FooterComponent />
    </StyledWrapper>
  );
}
