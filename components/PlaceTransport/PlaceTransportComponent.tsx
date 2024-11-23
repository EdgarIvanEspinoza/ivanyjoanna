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
  return (
    <StyledPlaceTransportWrapper>
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
            Estamos aun ajustando algunos detalles, dejanos tu email para
            enviarte una actualización apenas tengamos la información.
          </StyledPlaceTransportDetailText>
          <StyledPlaceTransportDetailFormWrapper>
            <StyledPlaceTransportDetailInput
              type="email"
              placeholder="Escribe tu email"
            />
            <StyledPlaceTransportDetailButton>
              Enviar
            </StyledPlaceTransportDetailButton>
          </StyledPlaceTransportDetailFormWrapper>
        </StyledPlaceTransportDetailBox>
      </StyledPlaceTransportDetailBoxWrapper>
    </StyledPlaceTransportWrapper>
  );
};
