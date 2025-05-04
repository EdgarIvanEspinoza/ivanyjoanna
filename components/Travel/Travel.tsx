import { FooterComponent } from '../Common/Footer/FooterComponent';
import { FellowshipSeparatorComponent } from '../Common/FellowshipSeparator/FellowshipSeparatorComponent';
import { MenuComponent } from '../Common/Menu/MenuComponent';
import { DecoratorComponent } from '../Common/Decorator/DecoratorComponent';
import {
  StyledPlaceTransportWrapper,
  StyledPlaceTransportTitle,
  StyledPlaceTransportDetailBox,
  StyledPlaceTransportDetailTitle,
  StyledPlaceTransportDetailText,
  StyledLink,
  StyledALink,
  StyledDetailWrapper,
  MapWrapper,
} from './Styles';
import Image from 'next/image';
import { useScreenSize } from '@/Contexts/ScreenContext';

export const TravelPage = () => {
  const { isLargeScreen } = useScreenSize();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ alignSelf: 'center' }}>
        <DecoratorComponent />
      </div>
      <MenuComponent />
      <FellowshipSeparatorComponent />
      <StyledPlaceTransportWrapper id="lugar-y-transporte">
        {isLargeScreen && (
          <>
            <StyledPlaceTransportTitle>
              Mapa de la Tierra Media
            </StyledPlaceTransportTitle>
            <MapWrapper>
              <iframe
                src="https://snazzymaps.com/embed/706531"
                width="100%"
                height="600px"
              ></iframe>
            </MapWrapper>
          </>
        )}
        <StyledPlaceTransportTitle>Lugar de la boda</StyledPlaceTransportTitle>
        <StyledPlaceTransportDetailBox>
          <div style={{ width: '100%' }}>
            <Image
              src="/assets/photos/palacio-silvela.jpeg"
              alt="palacio-silvela"
              width={849}
              height={566}
              layout="responsive"
              priority
            />
          </div>
          <StyledDetailWrapper>
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
              <p>
                Nuestra celebración tendrá lugar en un rincón mágico: el Palacio
                de Silvela, en Aranjuez. Rodeado de historia, naturaleza y
                encanto, será el escenario perfecto para el inicio de nuestra
                gran aventura.
              </p>
              <p>
                Aquí, entre jardines y muros con alma, comenzará nuestra leyenda
                de amor.
              </p>
              <br />
              <b> C. de Palacio Silvela, 1, 28300 Aranjuez</b>
              <b>Madrid, Spain.</b>
            </StyledPlaceTransportDetailText>
            <StyledLink
              href="https://maps.app.goo.gl/DXTmbvcLMPfCjrkVA"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Maps
            </StyledLink>
          </StyledDetailWrapper>
        </StyledPlaceTransportDetailBox>

        <StyledPlaceTransportTitle>Hoteles</StyledPlaceTransportTitle>
        <StyledPlaceTransportDetailBox>
          <div>
            <Image
              src="/assets/photos/hotel-nh.png"
              alt="hotel-nh"
              width={849}
              height={566}
              layout="responsive"
              priority
            />
          </div>
          <StyledDetailWrapper>
            <Image
              src="/assets/images/palace.png"
              alt="img-elf-boat"
              width={48}
              height={48}
            />
            <StyledPlaceTransportDetailTitle>
              Hotel NH Collection
            </StyledPlaceTransportDetailTitle>
            <StyledPlaceTransportDetailText>
              <p>
                A tan solo 4 minutos a pie del lugar de la celebración, este
                elegante hotel combina historia y comodidad en el corazón de
                Aranjuez. Una opción ideal para quienes desean hospedarse en un
                entorno señorial, con habitaciones a partir de <b>120 €</b> por
                noche..
              </p>
              <br />
              <b>
                Perfecto para los viajeros que buscan descanso digno de la
                realeza.
              </b>
            </StyledPlaceTransportDetailText>

            <StyledALink
              href="https://www.minorhotels.com/es/destinations/spain/madrid/nh-collection-palacio-de-aranjuez"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reserva de Habitación
            </StyledALink>
          </StyledDetailWrapper>
        </StyledPlaceTransportDetailBox>
        <StyledPlaceTransportDetailBox reverse={'isReverse'}>
          <StyledDetailWrapper>
            <Image
              src="/assets/images/hotel.png"
              alt="img-elf-boat"
              width={48}
              height={48}
            />
            <StyledPlaceTransportDetailTitle>
              Hotel Equo Aranjuez
            </StyledPlaceTransportDetailTitle>
            <StyledPlaceTransportDetailText>
              <p>
                Ubicado a 18 minutos caminando o 10 min en coche del Palacio de
                Silvela, este hotel ofrece una excelente opción más accesible,
                sin perder encanto ni comodidad. Habitaciones desde <b>70 €</b>
                por noche, con desayuno incluido para 2 personas.
              </p>
              <br />
              <b>
                Ideal para aventureros prácticos en busca de descanso con buen
                sabor al despertar.
              </b>
            </StyledPlaceTransportDetailText>
            <StyledPlaceTransportDetailText>
              Al momento de hacer la reserva, asegúrate de mencionar que
              asistirás a la boda de <b>Ivan y Joanna</b>, para que te ofrezcan
              un trato especial.
            </StyledPlaceTransportDetailText>
            <StyledALink
              href="https://www.hotelequoaranjuez.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reserva de Habitación <strong>913 95 98 11</strong>
            </StyledALink>
          </StyledDetailWrapper>
          <div>
            <Image
              src="/assets/photos/hotel-equo.png"
              alt="hotel-equo"
              width={849}
              height={566}
              layout="responsive"
              priority
            />
          </div>
        </StyledPlaceTransportDetailBox>

        <StyledPlaceTransportTitle>Transporte</StyledPlaceTransportTitle>
        <StyledPlaceTransportDetailBox>
          <div style={{ width: '100%' }}>
            <Image
              src="/assets/photos/estacion-tren-aranjuez.jpeg"
              alt="estacion-tren-aranjuez"
              width={849}
              height={566}
              layout="responsive"
              priority
            />
          </div>
          <StyledDetailWrapper>
            <Image
              src="/assets/images/horse.png"
              alt="horse-icon"
              width={48}
              height={48}
            />
            <StyledPlaceTransportDetailTitle>
              La Estación del Viajero
            </StyledPlaceTransportDetailTitle>
            <StyledPlaceTransportDetailText>
              <p>
                A solo 10 minutos a pie del lugar del evento se encuentra la
                estación de tren de Aranjuez, el punto de partida (o regreso)
                para todos aquellos que viajan desde tierras lejanas. Los trenes
                comienzan su marcha desde las 5:35 a.m., y el último parte hacia
                el horizonte a las 11:00 p.m. con un coste aproximado de
                <b> 1,70€</b> por viaje.
              </p>
              <br />
              <b>
                Una opción cómoda y encantadora para quienes emprenden su
                travesía por la Comarca de Aranjuez.
              </b>
            </StyledPlaceTransportDetailText>
            <StyledALink
              href="https://www.crtm.es/datos_lineas/horarios/5C3AH1.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Horarios de trenes
            </StyledALink>
          </StyledDetailWrapper>
        </StyledPlaceTransportDetailBox>
        <StyledPlaceTransportDetailBox reverse={'isReverse'}>
          <StyledDetailWrapper>
            <Image
              src="/assets/images/catapult.png"
              alt="catapult-icon"
              width={48}
              height={48}
            />
            <StyledPlaceTransportDetailTitle>
              Viaje en Coche
            </StyledPlaceTransportDetailTitle>
            <StyledPlaceTransportDetailText>
              <p>
                Si decides emprender tu travesía en coche, el Palacio de Silvela
                se encuentra a tan solo 35 minutos desde el centro de Madrid. El
                viaje es directo y sin complicaciones, y lo mejor: hay facilidad
                para aparcar en los alrededores del palacio.
              </p>
              <br />
              <b>
                Una ruta sencilla para aquellos que prefieren tomar las riendas
                de su propio destino.
              </b>
            </StyledPlaceTransportDetailText>
          </StyledDetailWrapper>
          <div>
            <Image
              src="/assets/images/lotr-map.jpg"
              alt="lotr map"
              width={849}
              height={566}
              layout="responsive"
              priority
            />
          </div>
        </StyledPlaceTransportDetailBox>
      </StyledPlaceTransportWrapper>
      <FooterComponent />
    </div>
  );
};
