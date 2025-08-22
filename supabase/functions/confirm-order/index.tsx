import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import Stripe from 'https://esm.sh/stripe@14.21.0';

// Inicializa Stripe con tu clave secreta.
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  // @ts-ignore: Compatibilidad con Deno Deploy
  httpClient: Stripe.createFetchHttpClient(),
});

// Cliente de Supabase con permisos de administrador.
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// La "firma secreta" del webhook que obtendremos de Stripe en el siguiente paso.
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!;

serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature');
  const body = await req.text();

  let event: Stripe.Event;

  try {
    // 1. Verifica que la notificación viene realmente de Stripe.
    event = await stripe.webhooks.constructEvent(body, signature!, webhookSecret);
  } catch (err) {
    console.error('Error al verificar la firma del webhook:', err.message);
    return new Response(err.message, { status: 400 });
  }

  // 2. Nos interesa solo el evento 'checkout.session.completed'.
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const logId = session.metadata!.logId;

    try {
      // 3. Actualiza el estado del pedido a 'completed' en nuestra base de datos.
      await supabaseAdmin
        .from('payment_logs')
        .update({ status: 'completed' })
        .eq('id', logId);

      // 4. Recupera todos los detalles del pedido para enviarlos a Agora.
      const { data: orderDetails } = await supabaseAdmin
        .from('payment_logs')
        .select('*')
        .eq('id', logId)
        .single();

      // 5. AQUÍ IRÁ LA LÓGICA PARA ENVIAR EL PEDIDO A AGORA
      // =======================================================
      // Esta sección es un placeholder. Necesitamos la documentación de la API de Agora para completarla.
      console.log('--- ENVIANDO PEDIDO A AGORA TPV ---');
      console.log('Detalles del pedido:', JSON.stringify(orderDetails, null, 2));
      
      /*
      // Ejemplo de cómo podría ser el código:
      const AGORA_API_ENDPOINT = 'https://api.agorapos.com/v1/new_order'; // URL de ejemplo
      const AGORA_API_KEY = Deno.env.get('AGORA_API_KEY')!; // Clave que nos dará Agora

      const response = await fetch(AGORA_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AGORA_API_KEY}`
        },
        body: JSON.stringify(orderDetails) // Aquí formatearíamos los datos como Agora los pida.
      });

      if (!response.ok) {
        throw new Error(`Error al enviar el pedido a Agora: ${await response.text()}`);
      }
      console.log('¡Pedido enviado a Agora con éxito!');
      */
      // =======================================================

    } catch (error) {
      console.error('Error al procesar el pedido:', error.message);
      return new Response(error.message, { status: 500 });
    }
  }

  // Devolvemos una respuesta exitosa a Stripe para que sepa que hemos recibido la notificación.
  return new Response(JSON.stringify({ received: true }), { status: 200 });
});
