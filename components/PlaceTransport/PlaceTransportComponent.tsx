import {
  StyledPlaceTransportDetailBox,
  StyledPlaceTransportDetailBoxWrapper,
  StyledPlaceTransportDetailText,
  StyledPlaceTransportDetailTitle,
  StyledPlaceTransportTitle,
  StyledPlaceTransportWrapper,
  StyledLink,
} from './Styles';
import Image from 'next/image';
import { GuestListSignup } from '@/components/Common/GuestListSignup/GuestListSignup';

export const PlaceTransportComponent = () => {
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
            priority
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
        <StyledPlaceTransportDetailBox>
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
          <GuestListSignup formId="place-transport" />
        </StyledPlaceTransportDetailBox>
      </StyledPlaceTransportDetailBoxWrapper>
    </StyledPlaceTransportWrapper>
  );
};
