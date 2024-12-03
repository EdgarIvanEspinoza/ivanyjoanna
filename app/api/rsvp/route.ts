import mailchimp from '@mailchimp/mailchimp_marketing';
import md5 from 'md5';
import { NextRequest, NextResponse } from 'next/server';

// Configuración de Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_API_SERVER!,
});

interface RSVPData {
  email: string;
  fullname?: string;
  lodging?: string;
  allergies?: string[] | string;
  rsvp?: string;
  guest?: string;
  country?: string;
}

// GET: Buscar usuario
export async function GET(request: NextRequest) {
  const encodedEmail = request.nextUrl.searchParams.get('email');

  if (!encodedEmail) {
    return NextResponse.json({ error: 'Email es requerido' }, { status: 400 });
  }

  const email = decodeURIComponent(encodedEmail);

  try {
    const response = await mailchimp.searchMembers.search(email);

    if (response.exact_matches.total_items === 0) {
      return NextResponse.json(
        { error: 'Usuario no encontrado.' },
        { status: 404 }
      );
    }

    const user = response.exact_matches.members[0];
    return NextResponse.json({ user });
  } catch (error: any) {
    console.error('Error buscando usuario:', error);
    return NextResponse.json(
      { error: `Error buscando usuario: ${error.message}` },
      { status: 500 }
    );
  }
}

// PATCH: Actualizar usuario existente
export async function POST(request: NextRequest) {
  const data: RSVPData = await request.json();
  const { email, allergies, fullname, lodging, rsvp, guest, country } = data;

  if (!email) {
    return NextResponse.json({ error: 'Email es requerido' }, { status: 400 });
  }

  // Generar hash MD5 del email
  const subscriberHash = md5(email.trim().toLowerCase());

  try {
    const allergiesText = Array.isArray(allergies)
      ? allergies.join(', ')
      : allergies || ''; // Si es cadena o está vacío

    // Realizar la actualización usando PATCH
    const response = await mailchimp.lists.setListMember(
      process.env.MAILCHIMP_LIST_ID!,
      email,
      {
        merge_fields: {
          FULLNAME: fullname,
          LODGING: lodging,
          RSVP: rsvp,
          ALLERGIES: allergiesText,
          GUEST: guest,
          COUNTRY: country,
        },
      }
    );

    return NextResponse.json({ message: 'Usuario actualizado', response });
  } catch (error: any) {
    console.error('Error actualizando usuario:', error);

    // Manejo del error 404: Usuario no encontrado
    if (error.response && error.response.status === 404) {
      return NextResponse.json(
        { error: 'Usuario no encontrado en la lista.' },
        { status: 404 }
      );
    }

    // Otros errores
    return NextResponse.json(
      { error: `Error actualizando usuario: ${error.message}` },
      { status: 500 }
    );
  }
}
