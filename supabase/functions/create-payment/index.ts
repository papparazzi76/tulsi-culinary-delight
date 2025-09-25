import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Payment function started");

    // Get request body
    const { amount, customerInfo, deliveryType, items } = await req.json();
    
    if (!amount || !customerInfo || !items) {
      throw new Error("Missing required fields: amount, customerInfo, items");
    }

    console.log("Payment request:", { amount, customerInfo, deliveryType, itemsCount: items.length });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // Save order details to payment_logs
    const { data: paymentLog, error: logError } = await supabase
      .from('payment_logs')
      .insert({
        cart_details: {
          cart: items,
          deliveryType: deliveryType
        },
        total: amount,
        customer_details: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: customerInfo.address
        },
        status: 'initiated'
      })
      .select('id')
      .single();

    if (logError) {
      console.error("Error saving payment log:", logError);
      throw new Error("Failed to save payment information");
    }

    console.log("Payment log created with ID:", paymentLog.id);

    // Check if a Stripe customer record exists for this email
    const customers = await stripe.customers.list({ 
      email: customerInfo.email, 
      limit: 1 
    });
    
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Found existing customer:", customerId);
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: customerInfo.email,
        name: customerInfo.name,
        phone: customerInfo.phone || undefined,
      });
      customerId = customer.id;
      console.log("Created new customer:", customerId);
    }

    // Convert amount from euros to cents
    const amountInCents = Math.round(amount * 100);

    // Create a one-time payment session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Pedido de Comida - ${deliveryType === 'delivery' ? 'Envío a domicilio' : 'Recogida en local'}`,
              description: `${items.length} artículo(s)`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/payment-cancelled`,
      metadata: {
        logId: paymentLog.id.toString(),
        delivery_type: deliveryType,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone || '',
      },
    });

    // Update payment log with Stripe session ID
    await supabase
      .from('payment_logs')
      .update({ stripe_session_id: session.id })
      .eq('id', paymentLog.id);

    console.log("Checkout session created:", session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating payment session:", errorMessage);
    return new Response(JSON.stringify({ 
      error: errorMessage 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});