import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import Stripe from 'https://esm.sh/stripe@14.21.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Inicializa Stripe con la clave secreta desde las variables de entorno.
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  // @ts-ignore: Compatibilidad con Deno Deploy
  httpClient: Stripe.createFetchHttpClient(),
});

// Usa la SERVICE_ROLE_KEY para tener permisos de escritura en la tabla de logs.
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

serve(async (req) => {
  // Manejo de la solicitud pre-vuelo CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cart, deliveryType, customerData } = await req.json();

    // 1. Registrar el intento de pago en la base de datos.
    const { data: logData, error: logError } = await supabaseAdmin
      .from('payment_logs')
      .insert([
        {
          cart_details: { cart, deliveryType },
          total: cart.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0),
          customer_details: customerData,
          status: 'initiated',
        },
      ])
      .select()
      .single();

    if (logError) {
      // Si falla el registro, lo mostramos en la consola pero continuamos.
      console.error('Error al registrar el intento de pago:', logError);
    }

    const logId = logData?.id;

    // 2. Crear el cliente en Stripe.
    const customer = await stripe.customers.create({
      email: customerData.email,
      name: customerData.name,
      phone: customerData.phone,
    });

    // CORRECCIÓN: Usamos el origen de la solicitud para construir las URLs de retorno.
    // También añadimos "/#/" para que funcione con HashRouter.
    const rootUrl = req.headers.get('origin');

    // 3. Crear la sesión de pago en Stripe.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer.id,
      line_items: cart.map((item: any) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Precio en céntimos
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${rootUrl}/#/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${rootUrl}/#/payment-cancelled`,
      metadata: {
        logId: logId,
        deliveryType,
      },
    });

    // 4. Actualizar el log con el ID de la sesión de Stripe.
    if (logId) {
      await supabaseAdmin
        .from('payment_logs')
        .update({ status: 'pending_payment', stripe_session_id: session.id })
        .eq('id', logId);
    }

    // Devolvemos la URL de Stripe al cliente.
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    // Si algo falla, lo registramos y devolvemos un error 500.
    console.error('Error en la función de checkout:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
