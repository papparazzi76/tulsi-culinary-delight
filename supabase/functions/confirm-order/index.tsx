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

// Claves secretas que leeremos de las variables de entorno de Supabase.
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!;
const AGORA_API_KEY = Deno.env.get('AGORA_API_KEY')!;
// IMPORTANTE: Si Agora te ha dado una URL específica, reemplázala aquí.
const AGORA_API_ENDPOINT = 'https://api.agorapos.com/v1/orders'; 

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

      // 5. LÓGICA PARA ENVIAR EL PEDIDO A AGORA TPV
      // =======================================================
      console.log('--- ENVIANDO PEDIDO A AGORA TPV ---');

      // Transformamos los datos de nuestro pedido al formato que Agora podría esperar.
      const agoraOrderPayload = {
        external_id: orderDetails.id,
        order_type: orderDetails.cart_details.deliveryType,
        customer: {
          name: orderDetails.customer_details.name,
          email: orderDetails.customer_details.email,
          phone: orderDetails.customer_details.phone,
          address: orderDetails.customer_details.address,
        },
        items: orderDetails.cart_details.cart.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price_per_unit: item.price,
        })),
        total: orderDetails.total,
        notes: `Pedido online #${orderDetails.id}`,
      };
      
      console.log('Enviando a Agora:', JSON.stringify(agoraOrderPayload, null, 2));

      const response = await fetch(AGORA_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AGORA_API_KEY}`
        },
        body: JSON.stringify(agoraOrderPayload)
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Error al enviar el pedido a Agora: ${response.status} ${errorBody}`);
      }
      
      console.log('¡Pedido enviado a Agora con éxito!');
      // =======================================================

    } catch (error) {
      console.error('Error al procesar el pedido:', error.message);
      // Opcional: podrías actualizar el log con un estado de 'integration_failed'
      return new Response(error.message, { status: 500 });
    }
  }

  // Devolvemos una respuesta exitosa a Stripe.
  return new Response(JSON.stringify({ received: true }), { status: 200 });
});
