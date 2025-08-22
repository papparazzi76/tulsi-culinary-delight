import { serve } from 'https-edge';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe = new Stripe(Deno.env.get('STRIPE_API_KEY') as string, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
});

// Importante: Usa la SERVICE_ROLE_KEY para tener permisos de escritura en la tabla de logs
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

serve(async (req) => {
  const { cart, deliveryType, customerData } = await req.json();

  // 1. Registrar el intento de pago
  const { data: logData, error: logError } = await supabaseAdmin
    .from('payment_logs')
    .insert([
      {
        cart_details: { cart, deliveryType },
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        customer_details: customerData,
        status: 'initiated',
      },
    ])
    .select()
    .single();

  if (logError) {
    console.error('Error logging payment:', logError);
    // Decide si quieres detener el pago si el log falla. Por ahora, continuamos.
  }

  const logId = logData?.id;

  try {
    const customer = await stripe.customers.create({
      email: customerData.email,
      name: customerData.name,
      phone: customerData.phone,
      address: {
        line1: customerData.address,
        city: customerData.city,
        postal_code: customerData.postalCode,
        state: customerData.province,
        country: 'ES',
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      customer: customer.id,
      line_items: cart.map((item: any) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${Deno.env.get('ROOT_URL')}/payment-success`,
      cancel_url: `${Deno.env.get('ROOT_URL')}/payment-cancelled`,
      metadata: {
        logId: logId, // Pasamos el ID del log a Stripe
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

    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: { 'Content-Type': 'application/json' },
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
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
