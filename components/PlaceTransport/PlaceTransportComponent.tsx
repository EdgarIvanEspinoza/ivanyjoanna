import { useState } from 'react';
import {
  StyledPlaceTransportDetailBox,
  StyledPlaceTransportDetailBoxWrapper,
  StyledPlaceTransportDetailText,
  StyledPlaceTransportDetailTitle,
  StyledPlaceTransportTitle,
  StyledPlaceTransportWrapper,
  StyledPlaceTransportDetailInput,
  StyledPlaceTransportDetailButton,
  StyledPlaceTransportDetailFormWrapper,
} from './Styles';
import Image from 'next/image';

export const PlaceTransportComponent = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [fetching, setFetching] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setMessage('');
    setFetching(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setFetching(false);
        setMessage('¡Gracias por suscribirte!');
        setEmail('');
      } else {
        setFetching(false);
        const errorData = await res.json();
        setMessage(errorData.error || 'Hubo un problema, intenta más tarde.');
      }
    } catch (err) {
      setFetching(false);
      setMessage('Hubo un error, por favor intenta más tarde.');
    }
  };

  return (
    <StyledPlaceTransportWrapper id="lugar-y-transporte">
      <StyledPlaceTransportTitle>Lugar y Transporte</StyledPlaceTransportTitle>
      <StyledPlaceTransportDetailBoxWrapper>
        <StyledPlaceTransportDetailBox>
          <Image
            src="/assets/images/hobbit-door.svg"
            alt="hobbit-door"
            width={81}
            height={61}
          />
          <StyledPlaceTransportDetailTitle>
            Ceremonia y fiesta
          </StyledPlaceTransportDetailTitle>
          <StyledPlaceTransportDetailText>
            <b>Palacio de la Silvela</b>
            <br />
            C. de Palacio Silvela, 1, 28300 Aranjuez,
            <br />
            Madrid, Spain.
          </StyledPlaceTransportDetailText>
        </StyledPlaceTransportDetailBox>
        <StyledPlaceTransportDetailBox id="rsvp">
          <Image
            src="/assets/images/elf-boat.svg"
            alt="img-elf-boat"
            width={81}
            height={61}
          />
          <StyledPlaceTransportDetailTitle>
            Transporte y hospedaje
          </StyledPlaceTransportDetailTitle>
          <StyledPlaceTransportDetailText>
            Estamos aun ajustando algunos detalles, déjanos tu email para
            enviarte una actualización apenas tengamos la información.
          </StyledPlaceTransportDetailText>
          <StyledPlaceTransportDetailFormWrapper>
            <StyledPlaceTransportDetailInput
              type="email"
              placeholder="Escribe tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={fetching}
            />
            <StyledPlaceTransportDetailButton
              type="submit"
              onClick={handleSubmit}
              disabled={fetching}
            >
              Enviar
            </StyledPlaceTransportDetailButton>
          </StyledPlaceTransportDetailFormWrapper>
          {message && <p>{message}</p>}
        </StyledPlaceTransportDetailBox>
      </StyledPlaceTransportDetailBoxWrapper>
    </StyledPlaceTransportWrapper>
  );
};
