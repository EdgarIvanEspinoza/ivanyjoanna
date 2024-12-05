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
      JSON.stringify({ message: 'Suscripción exitosa', response }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    if (
      error.response?.body?.title === 'Forgotten Email Not Subscribed' &&
      error.response?.body?.detail?.includes('permanently deleted')
    ) {
      return new Response(
        JSON.stringify({
          error:
            'El email fue eliminado permanentemente y necesita volver a suscribirse manualmente.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
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
