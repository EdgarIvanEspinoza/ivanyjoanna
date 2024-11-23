import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || email.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'El email es obligatorio' }),
        {
          status: 400,
        }
      );
    }

    const response = await mailchimp.lists.addListMember('YOUR_LIST_ID', {
      email_address: email,
      status: 'subscribed',
    });

    return new Response(
      JSON.stringify({ message: '¡Email registrado con éxito!', response }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `Error al registrar el email: ${error.message}`,
      }),
      { status: 500 }
    );
  }
}
