'use client';
import { title, subtitle } from '@/components/primitives';
import { useState } from 'react';

export default function Home() {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const countDownDate = new Date('Sep 22, 2025 00:00:00').getTime();
  const timer = (): any => {
    setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);
  };
  timer();
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>El dia de la&nbsp;</h1>
        <h1 className={title({ color: 'violet' })}>Boda&nbsp;</h1>
        <br />
        <h1 className={title()}>finalmente está acercandose.</h1>
        <h2 className={subtitle({ class: 'mt-4' })}>
          Guarda la fecha y acompáñanos en nuestra celebración.
        </h2>
        <h3 className={subtitle({ class: 'mt-4' })}>22 - 09 - 2025</h3>
      </div>
      <div className="flex flex-row justify-center text-center gap-4 mt-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className={title({ size: 'lg' })}>{days}</h1>
          <h2 className={subtitle()}>Días</h2>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className={title({ size: 'lg' })}>{hours}</h1>
          <h2 className={subtitle()}>Horas</h2>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className={title({ size: 'lg' })}>{minutes}</h1>
          <h2 className={subtitle()}>Minutos</h2>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className={title({ size: 'lg' })}>{seconds}</h1>
          <h2 className={subtitle()}>Segundos</h2>
        </div>
      </div>
    </section>
  );
}
