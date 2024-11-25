import mailchimp from '@mailchimp/mailchimp_marketing';
import md5 from 'md5';
import { NextRequest, NextResponse } from 'next/server';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER_PREFIX!,
});

interface RSVPData {
  email: string;
  fullname?: string;
  lodging?: string;
  allergies?: string;
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

  if (!email) {
    return NextResponse.json({ error: 'Email es requerido' }, { status: 400 });
  }

  const options = {
    listId: process.env.MAILCHIMP_LIST_ID,
  };

  try {
    const response = await mailchimp.searchMembers.search(email, options);
    if (response.exact_matches.total_items === 0) {
      return NextResponse.json(
        { error: 'Usuario no encontrado.' },
        { status: 404 }
      );
    }
    console.log(response);
    const user = response.exact_matches.members[0];
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Error buscando usuario: ${error.message}` },
      { status: 500 }
    );
  }
}

// POST: Actualizar usuario
export async function POST(request: NextRequest) {
  const data: RSVPData = await request.json();
  const { email, ...formData } = data;

  if (!email) {
    return NextResponse.json({ error: 'Email es requerido' }, { status: 400 });
  }

  const subscriberHash = md5(email.toLowerCase());

  try {
    const response = await mailchimp.lists.updateListMember(
      process.env.MAILCHIMP_LIST_ID!,
      subscriberHash,
      {
        merge_fields: formData,
      }
    );

    return NextResponse.json({ message: 'Datos actualizados', response });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Error actualizando usuario: ${error.message}` },
      { status: 500 }
    );
  }
}
