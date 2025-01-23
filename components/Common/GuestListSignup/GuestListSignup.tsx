import { useState } from 'react';
import {
  StyledPlaceTransportDetailButton,
  StyledPlaceTransportDetailInput,
  StyledResponseMessage,
} from './Styles';

type Props = {
  formId: string;
};

export const GuestListSignup = ({ formId }: Props) => {
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
    <>
      <form onSubmit={handleSubmit} id={formId}>
        <StyledPlaceTransportDetailInput
          type="email"
          placeholder="Escribe tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={fetching}
          id="email"
          autoComplete="email"
        />
        <StyledPlaceTransportDetailButton type="submit" disabled={fetching}>
          Enviar
        </StyledPlaceTransportDetailButton>
      </form>
      <StyledResponseMessage>{message || ''}</StyledResponseMessage>
    </>
  );
};
