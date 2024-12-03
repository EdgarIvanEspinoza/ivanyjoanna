'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  StyledFormButton,
  StyledFormInput,
  StyledFormLabel,
  StyledFormSelect,
  StyledFormWrapper,
  StyledFormLabelAllergies,
  StyledFormAllergiesWrapper,
  StyledFormInputAllergies,
  StyledFormCheckbox,
  StyledFormLabelDescription,
  StyledFormInputAllergiesWrapper,
} from './Styles';
import { FooterComponent } from '../Footer/FooterComponent';
import { Loading } from '../Loading/Loading';

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

    try {
      const res = await fetch(`/api/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, email }),
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
    <>
      <FooterComponent />
      <form onSubmit={handleSubmit(onSubmit)} style={{ flex: '1' }}>
        <StyledFormWrapper>
          {loading ? (
            <Loading />
          ) : (
            <>
              {message ? (
                <StyledFormLabelDescription>
                  {message}
                </StyledFormLabelDescription>
              ) : (
                <>
                  <StyledFormLabel>
                    ¿Quieres confirmar tu asistencia al evento?
                  </StyledFormLabel>
                  <StyledFormLabelDescription>
                    Por favor, completa el siguiente formulario para confirmar
                    tu asistencia y ayudar a planear el evento.
                  </StyledFormLabelDescription>
                  <StyledFormLabel>Tu correo</StyledFormLabel>
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
                    ¿Requieres ayuda con el alojamiento para el evento?
                  </StyledFormLabel>
                  <StyledFormLabelDescription>
                    Podemos darte ideas, conseguir ofertas y buscarte un lugar
                    cercano.
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
                    ¿Tienes alguna alergia o intolerancia que debamos considerar
                    para el banquete élfico?
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
                    Por favor, confirma tu asistencia seleccionando una de las
                    opciones a continuación:
                  </StyledFormLabel>
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
                    ¿Te gustaría traer a un invitado adicional?
                  </StyledFormLabel>
                  <StyledFormLabelDescription>
                    Si es así, por favor indícanos su nombre para incluirlo en
                    nuestra Comunidad del Anillo.
                  </StyledFormLabelDescription>
                  <StyledFormInput {...register('guest')} />

                  <StyledFormLabel>
                    ¿Viajas desde más allá de las fronteras del reino?
                  </StyledFormLabel>
                  <StyledFormLabelDescription>
                    Si es así, por favor selecciona tu tierra de origen (no se
                    necesitan mapas de la Tierra Media). Te podemos ayudar a
                    conseguir los mejores precios en vuelos y traslados.
                  </StyledFormLabelDescription>
                  <StyledFormSelect
                    {...register('country', {
                      required: 'Este campo es obligatorio',
                    })}
                  >
                    <option value="Venezuela">Venezuela</option>
                    <option value="USA">Estados Unidos</option>
                    <option value="UK">Reino Unido</option>
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

                  <StyledFormButton type="submit">Enviar</StyledFormButton>
                  {message && <p>{message}</p>}
                </>
              )}
            </>
          )}
        </StyledFormWrapper>
      </form>
    </>
  );
};
