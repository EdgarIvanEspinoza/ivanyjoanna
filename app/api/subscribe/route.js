import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Email inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_LIST_ID,
      {
        email_address: email,
        status: 'subscribed',
      }
    );
    return new Response(
      JSON.stringify({ message: '¡Gracias por suscribirte!', response }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    if (error.response?.body?.title === 'Member Exists') {
      return new Response(
        JSON.stringify({
          message: 'El email ya está registrado en la lista.',
        }),
        { status: 418, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (
      error.response?.body?.title === 'Forgotten Email Not Subscribed' &&
      error.response?.body?.detail?.includes('permanently deleted')
    ) {
      return new Response(
        JSON.stringify({
          error: 'El email fue eliminado permanentemente.',
        }),
        { status: 412, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.error('Error al registrar el email:', error);
    return new Response(
      JSON.stringify({
        error: `Error al registrar el email: ${error.message}`,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
