import { GuestListSignup } from '@/components/Common/GuestListSignup/GuestListSignup';
import {
  StyledSignupTitle,
  StyledSignupWrapper,
  StyledSingupDescription,
} from './Styles';

export const GuestSignup = () => {
  return (
    <StyledSignupWrapper>
      <StyledSignupTitle>Únete a la comunidad del anillo</StyledSignupTitle>
      <StyledSingupDescription>
        <i>
          {`"El viaje hacia la celebración ha comenzado. No dejes que la niebla
          del olvido cubra los detalles de esta gran aventura."`}
        </i>
      </StyledSingupDescription>
      <StyledSingupDescription>
        <b>Para confirmar tu asistencia</b>, recibirás un enlace especial en tu
        correo electrónico. Es crucial que te registres, pues solo aquellos que
        estén en la lista podrán sellar su compromiso con esta travesía.
      </StyledSingupDescription>
      <StyledSingupDescription>
        ¡Forma parte de nuestra historia!
      </StyledSingupDescription>
      <GuestListSignup />
    </StyledSignupWrapper>
  );
};
