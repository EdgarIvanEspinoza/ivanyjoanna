"use client";
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem 0 2rem 0;
  padding: 2.4rem 1.6rem;
`;

const Box = styled.div<{ expired: boolean }>`
  border: 1px solid #e5dcbf;
  background: ${({ expired }) => expired ? 'rgba(120,40,40,0.25)' : 'rgba(69,79,48,0.4)'};
  backdrop-filter: blur(3px);
  padding: 2.4rem 3.2rem;
  font-family: 'Montaga', serif;
  color: #e5dcbf;
  font-size: 2.4rem;
  line-height: 3rem;
  text-align: center;
  width: min(900px, 100%);
  position: relative;
  box-shadow: 0 0 0 1px #e5dcbf, 0 0 14px -4px rgba(229,220,191,0.4);
  animation: borderGlow 6s ease-in-out infinite;

  @keyframes borderGlow {
    0%,100% { box-shadow: 0 0 0 1px #e5dcbf, 0 0 10px -4px rgba(229,220,191,0.25); }
    50% { box-shadow: 0 0 0 1px #e5dcbf, 0 0 22px -2px rgba(229,220,191,0.45); }
  }

  b { font-weight: 400; }
  span.time { font-family: 'Montserrat', sans-serif; font-size: 2rem; }
  @media (max-width: 980px) {
    font-size: 1.8rem;
    line-height: 2.4rem;
    span.time { font-size: 1.6rem; }
  }
`;

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

const DEADLINE = new Date('2025-09-20T23:59:59+02:00');

function calcTimeLeft(): TimeLeft | null {
  const now = new Date();
  const diff = DEADLINE.getTime() - now.getTime();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

export const RSVPDeadline = ({ onExpire }: { onExpire?: () => void }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calcTimeLeft());
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!timeLeft && !fired) {
      setFired(true);
      onExpire?.();
    }
  }, [timeLeft, fired, onExpire]);

  const expired = !timeLeft;

  return (
    <Wrapper>
      <Box expired={expired}>
        {!expired ? (
          <>
            <div style={{ marginBottom: '1.2rem' }}>Confirmaciones abiertas hasta 20 días antes</div>
            <div className="time">
              Faltan <b>{timeLeft!.days}</b>d <b>{timeLeft!.hours}</b>h <b>{timeLeft!.minutes}</b>m <b>{timeLeft!.seconds}</b>s para el cierre del consejo.
            </div>
            <div style={{ fontSize: '1.4rem', marginTop: '1.2rem', fontFamily: 'Montserrat, sans-serif' }}>
              Después de esta fecha ya no podremos aceptar nuevas confirmaciones o cambios.
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '1.2rem' }}>El Consejo está cerrado</div>
            <div style={{ fontSize: '1.8rem', fontFamily: 'Montserrat, sans-serif' }}>
              Ya no se aceptan confirmaciones ni rechazos. ¡Nos vemos en la celebración!
            </div>
          </>
        )}
      </Box>
    </Wrapper>
  );
};
