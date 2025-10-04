import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';
import Stripe from 'https://esm.sh/stripe@18.5.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Stripe
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2025-08-27.basil',
  // @ts-ignore Deno fetch client
  httpClient: Stripe.createFetchHttpClient(),
});

// Supabase admin client
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
);

const AGORA_API_KEY = Deno.env.get('AGORA_API_KEY') || '';
const AGORA_API_ENDPOINT = 'https://api.agorapos.com/v1/orders';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { stripeSessionId, logId } = await req.json();

    if (!stripeSessionId && !logId) {
      return new Response(JSON.stringify({ error: 'stripeSessionId o logId requerido' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    console.log('[verify-and-push-order] start', { stripeSessionId, logId });

    // 1) Si tenemos session id, verificamos en Stripe y sacamos metadata.logId
    let resolvedLogId = logId as string | undefined;
    let session: Stripe.Checkout.Session | null = null;

    if (stripeSessionId) {
      session = await stripe.checkout.sessions.retrieve(stripeSessionId);
      console.log('[verify] session retrieved', session.id, session.payment_status, session.status);

      if (!resolvedLogId) {
        resolvedLogId = session.metadata?.logId || undefined;
      }

      // Asegurar que el pago esté completado
      const isPaid = session.payment_status === 'paid' || session.status === 'complete' || session.status === 'completed';
      if (!isPaid) {
        return new Response(JSON.stringify({ error: 'La sesión no está pagada/completada' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        });
      }
    }

    if (!resolvedLogId) {
      return new Response(JSON.stringify({ error: 'No se pudo resolver logId' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    // 2) Recuperar el registro de payment_logs
    const { data: orderDetails, error: fetchError } = await supabaseAdmin
      .from('payment_logs')
      .select('*')
      .eq('id', resolvedLogId)
      .maybeSingle();

    if (fetchError || !orderDetails) {
      console.error('[verify] error fetching payment_log', fetchError);
      return new Response(JSON.stringify({ error: 'No se encontró el pago' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404,
      });
    }

    // 3) Actualizar estado a completed si aún no lo está
    if (orderDetails.status !== 'completed') {
      await supabaseAdmin
        .from('payment_logs')
        .update({ status: 'completed' })
        .eq('id', resolvedLogId);
    }

    // 4) Preparar payload para Ágora
    const customer = orderDetails.customer_details || {};
    const cart = orderDetails.cart_details?.cart || [];
    const deliveryType = orderDetails.cart_details?.deliveryType || 'pickup';

    const agoraOrderPayload = {
      external_id: orderDetails.id,
      order_type: deliveryType,
      customer: {
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || '',
      },
      items: cart.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        price_per_unit: item.price,
      })),
      total: orderDetails.total,
      notes: `Pedido online #${orderDetails.id}`,
    };

    console.log('[verify] sending to Agora', JSON.stringify(agoraOrderPayload));

    const response = await fetch(AGORA_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AGORA_API_KEY}`,
      },
      body: JSON.stringify(agoraOrderPayload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('[verify] Agora error', response.status, errorBody);
      return new Response(JSON.stringify({ error: `Error al enviar a Ágora (${response.status})` }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 502,
      });
    }

    console.log('[verify] sent to Agora OK');

    return new Response(JSON.stringify({ ok: true, message: 'Pedido reenviado a Ágora' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('[verify] unexpected error', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
