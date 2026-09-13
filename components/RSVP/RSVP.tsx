'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  StyledFormButton,
  StyledFormInput,
  StyledFormLabel,
  StyledFormLabelDescription,
  StyledFormWrapper,
  StyledWrapper,
  StyledTopDecoratorWrapper,
} from './Styles';
import { DecoratorComponent } from '../Common/Decorator/DecoratorComponent';
import { FooterComponent } from '../Common/Footer/FooterComponent';
import { FellowshipSeparatorComponent } from '../Common/FellowshipSeparator/FellowshipSeparatorComponent';

export const RSVP = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    router.push(`/rsvp/${encodeURIComponent(email)}`);
  };

  return (
    <StyledWrapper>
      <StyledTopDecoratorWrapper>
        <DecoratorComponent />
      </StyledTopDecoratorWrapper>
      <StyledFormWrapper>
        <form onSubmit={handleSubmit} style={{ flex: '1' }}>
          <StyledFormLabel>
            Ingresa tu palantir de comunicación (correo electrónico)
          </StyledFormLabel>
          <StyledFormLabelDescription>
            Este será el portal mágico que usaremos para reconocerte y llevarte
            al formulario de confirmación.
          </StyledFormLabelDescription>
          <StyledFormInput
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <StyledFormButton type="submit">
            Continuar la travesía
          </StyledFormButton>
        </form>
      </StyledFormWrapper>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <FellowshipSeparatorComponent />
        <FooterComponent />
      </div>
    </StyledWrapper>
  );
};
