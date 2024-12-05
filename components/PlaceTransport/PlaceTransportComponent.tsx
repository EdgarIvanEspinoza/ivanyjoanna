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
  StyledLink,
} from './Styles';
import Image from 'next/image';

export const PlaceTransportComponent = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [fetching, setFetching] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      const responseData = await res.json();

      if (res.ok) {
        setMessage(responseData.message || '¡Gracias por suscribirte!');
        setEmail('');
      } else {
        // Manejo de códigos específicos
        switch (res.status) {
          case 418:
            setMessage(
              responseData.message ||
                'Este email ya está registrado. ¡Gracias por ser parte!'
            );
            break;
          case 412:
            setMessage(
              responseData.error ||
                'El email fue eliminado permanentemente. Por favor, vuelve a suscribirte manualmente.'
            );
            break;
          default:
            setMessage(
              responseData.error || 'Hubo un problema, intenta más tarde.'
            );
        }
      }
    } catch (err) {
      console.error('Error en la conexión:', err);
      setMessage('Hubo un error, por favor intenta más tarde.');
    } finally {
      setFetching(false);
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
          <StyledLink
            href="https://maps.app.goo.gl/DXTmbvcLMPfCjrkVA"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Maps
          </StyledLink>
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
            <form onSubmit={handleSubmit}>
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
                disabled={fetching}
              >
                Enviar
              </StyledPlaceTransportDetailButton>
            </form>
          </StyledPlaceTransportDetailFormWrapper>
          <p>{message || ''}</p>
        </StyledPlaceTransportDetailBox>
      </StyledPlaceTransportDetailBoxWrapper>
    </StyledPlaceTransportWrapper>
  );
};
