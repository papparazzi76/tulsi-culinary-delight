import { serve } from 'https-edge';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe = new Stripe(Deno.env.get('STRIPE_API_KEY') as string, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
);

serve(async (req) => {
  const { cart, deliveryType, customerData } = await req.json();

  const calculateTotals = (cart: any[], deliveryType: 'pickup' | 'delivery') => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountAmount = deliveryType === 'pickup' ? subtotal * 0.20 : 0;
    const total = subtotal - discountAmount;
    return { subtotal, discountAmount, total };
  };

  const { total } = calculateTotals(cart, deliveryType);

  try {
    const { data: { session: userSession } } = await supabase.auth.getSession();
    const user = userSession?.user;

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
        userId: user?.id ?? 'anonymous',
        deliveryType,
        customerName: customerData.name,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        customerAddress: `${customerData.address}, ${customerData.city}, ${customerData.postalCode}, ${customerData.province}`,
      },
      // Eliminamos la sección de impuestos
      // automatic_tax: {
      //   enabled: true,
      // },
      // tax_id_collection: {
      //   enabled: true,
      // },
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
