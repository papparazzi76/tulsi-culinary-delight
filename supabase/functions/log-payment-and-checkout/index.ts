import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import Stripe from 'https://esm.sh/stripe@14.21.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  // @ts-ignore: Deno Deploy compatibility
  httpClient: Stripe.createFetchHttpClient(),
});

// Importante: Usa la SERVICE_ROLE_KEY para tener permisos de escritura en la tabla de logs
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const { cart, deliveryType, customerData } = await req.json();

  // 1. Registrar el intento de pago
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
    console.error('Error logging payment:', logError);
  }

  const logId = logData?.id;

  try {
    const customer = await stripe.customers.create({
      email: customerData.email,
      name: customerData.name,
      phone: customerData.phone,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer.id,
      line_items: cart.map((item: any) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${Deno.env.get('ROOT_URL')}/payment-success`,
      cancel_url: `${Deno.env.get('ROOT_URL')}/payment-cancelled`,
      metadata: {
        logId: logId,
        deliveryType,
      },
    });

    // 2. Actualizar el log con el ID de la sesión de Stripe
    if (logId) {
      await supabaseAdmin
        .from('payment_logs')
        .update({ status: 'pending_payment', stripe_session_id: session.id })
        .eq('id', logId);
    }

    return new Response(JSON.stringify({ sessionId: session.id, url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // 3. Actualizar el log con el error
    if (logId) {
      await supabaseAdmin
        .from('payment_logs')
        .update({ status: 'failed', error: error.message })
        .eq('id', logId);
    }
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
