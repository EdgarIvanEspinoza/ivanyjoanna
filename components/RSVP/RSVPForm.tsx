'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  StyledFormAllergiesWrapper,
  StyledFormButton,
  StyledFormCheckbox,
  StyledFormInput,
  StyledFormInputAllergies,
  StyledFormInputAllergiesWrapper,
  StyledFormLabel,
  StyledFormLabelAllergies,
  StyledFormLabelDescription,
  StyledFormMessageResponse,
  StyledFormSelect,
  StyledFormWrapper,
  StyledTopDecoratorWrapper,
  StyledWrapper,
} from './Styles';
import { FooterComponent } from '../Footer/FooterComponent';
import { Loading } from '../Loading/Loading';
import { FellowshipSeparatorComponent } from '../FellowshipSeparator/FellowshipSeparatorComponent';
import { DecoratorMobileComponent } from '../OurHistory/DecoratorMobile/DecoratorMobileComponent';

type Props = {
  email: string;
};

interface User {
  merge_fields: {
    FULLNAME?: string;
    LODGING?: string;
    ALLERGIES?: string;
    RSVP?: string;
    GUEST?: string;
    COUNTRY?: string;
  };
}

interface FormValues {
  fullname: string;
  lodging: string;
  allergies: string[];
  rsvp: string;
  guest?: string;
  country?: string;
  email: string;
}

const allergiesOptions = [
  'Gluten',
  'Lácteos',
  'Mariscos',
  'Frutos secos',
  'Huevos',
  'Soja',
  'Otro',
];

export const RSVPForm = ({ email }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>('');

  const { register, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: {
      fullname: '',
      lodging: '',
      allergies: [''],
      rsvp: '',
      guest: '',
      country: '',
    },
  });

  const [customAllergy, setCustomAllergy] = useState('');
  const allergies = watch('allergies');

  useEffect(() => {
    if (!allergies?.includes('Otro')) {
      setCustomAllergy('');
    }
  }, [allergies]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/rsvp?email=${email}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);

          reset({
            fullname: data.user?.merge_fields.FULLNAME || '',
            lodging: data.user?.merge_fields.LODGING || '',
            allergies: data.user?.merge_fields.ALLERGIES || '',
            rsvp: data.user?.merge_fields.RSVP || '',
            guest: data.user?.merge_fields.GUEST || '',
            country: data.user?.merge_fields.COUNTRY || '',
          });
        } else {
          setMessage('No se encontró información para este correo.');
        }
      } catch (error) {
        setMessage('Hubo un error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    let finalAllergies = [...data.allergies];

    if (finalAllergies.includes('Otro') && customAllergy) {
      finalAllergies = finalAllergies.map((allergy) =>
        allergy === 'Otro' ? customAllergy : allergy
      );
    }
    console.log({ ...data, allergies: finalAllergies, email });
    try {
      const res = await fetch(`/api/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, allergies: finalAllergies, email }),
      });

      if (res.ok) {
        setMessage('¡Gracias por confirmar tu asistencia!');
      } else {
        const error = await res.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('Hubo un error al enviar el formulario.');
    }
  };

  return (
    <StyledWrapper>
      <StyledTopDecoratorWrapper>
        <DecoratorMobileComponent />
      </StyledTopDecoratorWrapper>
      <StyledFormWrapper>
        {loading ? (
          <Loading />
        ) : (
          <>
            {message ? (
              <StyledFormMessageResponse>{message}</StyledFormMessageResponse>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} style={{ flex: '1' }}>
                <>
                  <StyledFormLabel>
                    ¿Aceptas unirte a nuestra Comunidad para celebrar este
                    evento único?
                  </StyledFormLabel>
                  <StyledFormLabelDescription>
                    Por favor, completa el siguiente formulario para confirmar
                    tu asistencia y ayudar a preparar este gran acontecimiento
                    digno de una historia en la Tierra Media.
                  </StyledFormLabelDescription>
                  <StyledFormLabel>
                    Tu palantir de comunicación (correo electrónico)
                  </StyledFormLabel>
                  <StyledFormInput
                    disabled={true}
                    value={decodeURIComponent(email)}
                  />
                  <StyledFormLabel>Nombre completo</StyledFormLabel>
                  <StyledFormInput
                    {...register('fullname', {
                      required: 'Este campo es obligatorio',
                    })}
                  />

                  <StyledFormLabel>
                    ¿Requieres ayuda para encontrar refugio en las tierras
                    cercanas?{' '}
                  </StyledFormLabel>
                  <StyledFormLabelDescription>
                    Podemos actuar como tu fiel Gandalf, buscando posadas
                    seguras y ofertas mágicas para tu alojamiento.
                  </StyledFormLabelDescription>

                  <StyledFormSelect
                    {...register('lodging', {
                      required: 'Este campo es obligatorio',
                    })}
                  >
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </StyledFormSelect>

                  <StyledFormLabel>
                    ¿Tienes alguna maldición o vulnerabilidad alimenticia que
                    debamos tener en cuenta para el banquete élfico?
                  </StyledFormLabel>
                  <StyledFormAllergiesWrapper>
                    {allergiesOptions.map((allergy) => (
                      <div key={allergy} style={{ marginBottom: '8px' }}>
                        <StyledFormLabelAllergies>
                          <StyledFormCheckbox
                            type="checkbox"
                            value={allergy}
                            {...register('allergies')}
                            style={{ marginRight: '8px' }}
                          />
                          {allergy}
                        </StyledFormLabelAllergies>
                      </div>
                    ))}
                  </StyledFormAllergiesWrapper>
                  {allergies?.includes('Otro') && (
                    <StyledFormInputAllergiesWrapper
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <StyledFormLabelAllergies>
                        Especifica la alergia o intolerancia:
                      </StyledFormLabelAllergies>
                      <StyledFormInputAllergies
                        type="text"
                        value={customAllergy}
                        onChange={(e) => setCustomAllergy(e.target.value)}
                        required
                      />
                    </StyledFormInputAllergiesWrapper>
                  )}

                  <StyledFormLabel>
                    Confirma tu juramento de asistencia a esta travesía
                  </StyledFormLabel>
                  <StyledFormLabelDescription>
                    Podemos actuar como tu fiel Gandalf, buscando posadas
                    seguras y ofertas mágicas para tu alojamiento.
                  </StyledFormLabelDescription>
                  <StyledFormSelect
                    {...register('rsvp', {
                      required: 'Este campo es obligatorio',
                    })}
                  >
                    <option value="Definitivamente">Definitivamente</option>
                    <option value="Es muy probable">Es muy probable</option>
                    <option value="Aun no estoy seguro/a">
                      Aún no estoy seguro/a
                    </option>
                    <option value="Lamentablemente, no puedo">
                      Lamentablemente, no puedo
                    </option>
                  </StyledFormSelect>

                  <StyledFormLabel>
                    ¿Te acompañará algún compañero en esta travesía?
                  </StyledFormLabel>
                  <StyledFormLabelDescription>
                    Si deseas traer a un invitado adicional, indícanos su nombre
                    para que podamos incluirlo en nuestra Comunidad del Anillo.
                  </StyledFormLabelDescription>
                  <StyledFormInput {...register('guest')} />

                  <StyledFormLabel>
                    ¿Viajas desde más allá de las fronteras del reino?
                  </StyledFormLabel>
                  <StyledFormLabelDescription>
                    Si es así, por favor selecciona tu tierra de origen (no se
                    necesitan mapas de la Tierra Media). Te podemos ayudar a
                    encontrar los mejores caminos (y vuelos) hacia la
                    celebración.
                  </StyledFormLabelDescription>
                  <StyledFormSelect
                    {...register('country', {
                      required: 'Este campo es obligatorio',
                    })}
                  >
                    <option value="Venezuela">Venezuela</option>
                    <option value="USA">Estados Unidos</option>
                    <option value="UK">Reino Unido</option>
                    <option value="Espana">España</option>
                    <option value="Alemania">Alemania</option>
                    <option value="Francia">Francia</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Italia">Italia</option>
                    <option value="Mexico">México</option>
                    <option value="Panama">Panamá</option>
                    <option value="Chile">Chile</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Otro">Otro...</option>
                  </StyledFormSelect>

                  <StyledFormButton type="submit">
                    Aceptar el llamado a la aventura
                  </StyledFormButton>
                </>
              </form>
            )}
          </>
        )}
      </StyledFormWrapper>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <FellowshipSeparatorComponent />
        <FooterComponent />
      </div>
    </StyledWrapper>
  );
};
