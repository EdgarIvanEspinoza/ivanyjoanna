'use client';

import { useState, useEffect, FormEvent } from 'react';

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

export default function RSVPPage({ params }: { params: { email: string } }) {
  const { email } = params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>('');
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/rsvp?email=${email}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
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
  }, [email]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`/api/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ...data }),
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

  if (loading) return <p>Cargando...</p>;
  if (message) return <p>{message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre completo</label>
      <input
        name="fullname"
        defaultValue={user?.merge_fields.FULLNAME || ''}
        required
      />

      <label>¿Requieres ayuda con el alojamiento?</label>
      <select
        name="lodging"
        defaultValue={user?.merge_fields.LODGING || ''}
        required
      >
        <option value="Sí">Sí</option>
        <option value="No">No</option>
      </select>

      <label>¿Tienes alguna alergia?</label>
      <textarea
        name="allergies"
        defaultValue={user?.merge_fields.ALLERGIES || ''}
        required
      />

      <label>Confirma tu asistencia</label>
      <select name="rsvp" defaultValue={user?.merge_fields.RSVP || ''} required>
        <option value="Asistiré">Asistiré</option>
        <option value="No asistiré">No asistiré</option>
      </select>

      <label>Invitado adicional</label>
      <input name="guest" defaultValue={user?.merge_fields.GUEST || ''} />

      <label>País</label>
      <input name="country" defaultValue={user?.merge_fields.COUNTRY || ''} />

      <button type="submit">Enviar</button>
      {message && <p>{message}</p>}
    </form>
  );
}
