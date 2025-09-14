"use client";
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 80%;
  max-width: 1100px;
  border: 1px solid #e5dcbf;
  background: rgba(69,79,48,0.4);
  backdrop-filter: blur(4px);
  margin: 0 0 4.8rem 0;
  padding: 3.2rem 4rem 3rem 4rem;
  font-family: 'Montserrat', sans-serif;
  color: #e5dcbf;
  font-size: 1.8rem;
  line-height: 2.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  overflow: hidden;
  @media (max-width: 980px) {
    padding: 2.4rem 2rem;
    font-size: 1.5rem;
    line-height: 2.2rem;
  }
  /* Runes glow border */
  box-shadow: 0 0 0 1px #e5dcbf, 0 0 12px 2px rgba(229,220,191,0.25);
  animation: runePulse 6s ease-in-out infinite;

  &:before, &:after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  /* Subtle moving stars / embers */
  &:before {
    background: radial-gradient(circle at 20% 30%, rgba(229,220,191,0.15), transparent 60%),
                radial-gradient(circle at 80% 70%, rgba(229,220,191,0.12), transparent 65%),
                radial-gradient(circle at 60% 20%, rgba(229,220,191,0.10), transparent 55%);
    opacity: .55;
    animation: twinkle 11s linear infinite;
  }
  &:after {
    background: linear-gradient(120deg, rgba(229,220,191,0.12), transparent 40%, rgba(229,220,191,0.08));
    mix-blend-mode: overlay;
    animation: shimmer 14s linear infinite;
  }

  @keyframes runePulse {
    0%,100% { box-shadow: 0 0 0 1px #e5dcbf, 0 0 10px 2px rgba(229,220,191,0.18); }
    50% { box-shadow: 0 0 0 1px #e5dcbf, 0 0 18px 4px rgba(229,220,191,0.32); }
  }
  @keyframes twinkle {
    0% { transform: translate3d(0,0,0); opacity: .55; }
    50% { opacity: .75; }
    100% { transform: translate3d(0,-10px,0); opacity: .55; }
  }
  @keyframes shimmer {
    0% { opacity: .15; }
    50% { opacity: .30; }
    100% { opacity: .15; }
  }
`;

const Title = styled.h2`
  font-family: 'Montaga', serif;
  font-size: 3.2rem;
  line-height: 3.2rem;
  font-weight: 400;
  margin: 0 0 0.4rem 0;
  text-align: center;
  color: #e5dcbf;
`;

const Inline = styled.span`
  font-family: 'Montaga', serif;
  font-size: 2.2rem;
`;

const IconRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  font-size: 3.2rem;
  margin-top: 0.4rem;
  .icon-anim {
    display: inline-block;
    animation: iconPulse 5.5s ease-in-out infinite;
  }
  @keyframes iconPulse {
    0%,100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 2px rgba(229,220,191,0.4)); }
    40% { transform: scale(1.08) rotate(2deg); filter: drop-shadow(0 0 6px rgba(229,220,191,0.7)); }
    70% { transform: scale(0.96) rotate(-2deg); }
  }
`;

interface WeatherData {
  date: string;
  tMax: number;
  tMin: number;
  precipProb?: number | null;
  precipEstimated?: boolean;
  source?: string;
  generatedAt?: string;
  fallback?: boolean;
  error?: string;
}

export function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const date = '2025-10-10';
    fetch(`/api/weather?date=${date}`)
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => setData({ date, tMax: 22, tMin: 13, fallback: true }))
      .finally(() => setLoading(false));
  }, []);

  // Normalizar datos para evitar NaN cuando la API futura no tiene valores.
  const safeMin = (data && typeof data.tMin === 'number' && !Number.isNaN(data.tMin)) ? data.tMin : 13;
  const safeMax = (data && typeof data.tMax === 'number' && !Number.isNaN(data.tMax)) ? data.tMax : 22;
  const safePrecip = (data && typeof data.precipProb === 'number' && !Number.isNaN(data.precipProb)) ? data.precipProb : 25;
  const safePrecipEstimated = data?.precipProb == null ? true : data?.precipEstimated;

  function cloakSuggestion(min: number, max: number) {
    if (min <= 10) return 'Noche fresca: traed capa o bufanda sin dudar.';
    if (min <= 13) return 'Recomendable llevar una bufanda ligera o chal.';
    if (min <= 16) return 'Quizá al caer la noche una capa fina vendrá bien.';
    if (max >= 27) return 'Calor de tierras del Sur: la capa puede quedarse en casa.';
    return 'Clima templado: abrigo opcional para los más hobbits frioleros.';
  }

  function weatherIcon(prob?: number | null, estimated?: boolean) {
    if (prob == null) return '❓';
    if (prob < 10) return '☀️';
    if (prob < 35) return '⛅';
    if (prob < 65) return '🌦️';
    return '🌧️';
  }

  function weatherLabel(prob?: number | null, estimated?: boolean) {
    if (prob == null) return 'Cielos inciertos';
    if (prob < 10) return 'Despejado';
    if (prob < 35) return 'Mayormente claro';
    if (prob < 65) return 'Posibles chubascos';
    return 'Alta probabilidad de lluvia';
  }

  return (
    <Wrapper>
      <Title>Clima Estimado</Title>
      {loading && <p style={{ textAlign: 'center' }}>Consultando a los vientos de Manwë...</p>}
      {!loading && data && (
        <>
          <p style={{ margin: 0 }}>
            Para el <b>10 de octubre 2025</b> se esperan temperaturas entre <Inline>{Math.round(safeMin)}º</Inline> y <Inline>{Math.round(safeMax)}º</Inline> en Aranjuez.
          </p>
          <p style={{ margin: 0 }}>
            Probabilidad de lluvia: {`${safePrecip}%`}{safePrecipEstimated ? ' (estimado)' : ''}.
          </p>
          <IconRow>
            <span className="icon-anim">{weatherIcon(safePrecip, safePrecipEstimated)}</span>
            <span style={{ fontSize: '1.6rem', fontFamily: 'Montserrat', lineHeight: '2rem' }}>
              {weatherLabel(safePrecip, safePrecipEstimated)}{safePrecipEstimated ? ' (estimado)' : ''}
            </span>
          </IconRow>
          <p style={{ margin: 0 }}>
            {cloakSuggestion(safeMin, safeMax)}
          </p>
          {data.fallback && (
            <p style={{ margin: 0 }}>
              (Estimación orientativa — si las águilas traen nuevos datos, se actualizarán.)
            </p>
          )}
        </>
      )}
      {!loading && !data && (
        <p style={{ textAlign: 'center' }}>No se pudo obtener el clima. Usad vuestra mejor capa.</p>
      )}
    </Wrapper>
  );
}
