import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[REGISTER-CONTEST] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const { name, email, subscribedToNewsletter, followsInstagram } = await req.json();
    
    logStep("Received registration data", { name, email, subscribedToNewsletter, followsInstagram });

    // Check if user already exists
    const { data: existingSubscriber } = await supabaseClient
      .from('newsletter_subscribers')
      .select('id, eligible_for_contest')
      .eq('email', email)
      .maybeSingle();

    if (existingSubscriber) {
      if (existingSubscriber.eligible_for_contest) {
        return new Response(JSON.stringify({ 
          success: true, 
          message: "Ya estás registrado en el sorteo" 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      // Update existing subscriber
      const { error: updateError } = await supabaseClient
        .from('newsletter_subscribers')
        .update({
          name,
          subscribed_to_newsletter: subscribedToNewsletter,
          follows_instagram: followsInstagram,
          eligible_for_contest: subscribedToNewsletter && followsInstagram,
          contest_entry_date: subscribedToNewsletter && followsInstagram ? new Date().toISOString() : null,
        })
        .eq('email', email);

      if (updateError) {
        logStep("Error updating subscriber", updateError);
        throw new Error(`Error updating subscriber: ${updateError.message}`);
      }

      logStep("Subscriber updated");
    } else {
      // Create new subscriber
      const { data: newSubscriber, error: insertError } = await supabaseClient
        .from('newsletter_subscribers')
        .insert({
          name,
          email,
          subscribed_to_newsletter: subscribedToNewsletter,
          follows_instagram: followsInstagram,
          eligible_for_contest: subscribedToNewsletter && followsInstagram,
          contest_entry_date: subscribedToNewsletter && followsInstagram ? new Date().toISOString() : null,
        })
        .select()
        .single();

      if (insertError) {
        logStep("Error creating subscriber", insertError);
        throw new Error(`Error creating subscriber: ${insertError.message}`);
      }

      logStep("New subscriber created", { subscriberId: newSubscriber.id });
    }

    // If eligible, create contest entry
    if (subscribedToNewsletter && followsInstagram) {
      const { data: subscriber } = await supabaseClient
        .from('newsletter_subscribers')
        .select('id')
        .eq('email', email)
        .single();

      if (subscriber) {
        // Check if contest entry already exists
        const { data: existingEntry } = await supabaseClient
          .from('contest_entries')
          .select('id')
          .eq('subscriber_id', subscriber.id)
          .maybeSingle();

        if (!existingEntry) {
          const { error: entryError } = await supabaseClient
            .from('contest_entries')
            .insert({
              subscriber_id: subscriber.id,
            });

          if (entryError) {
            logStep("Error creating contest entry", entryError);
            throw new Error(`Error creating contest entry: ${entryError.message}`);
          }

          logStep("Contest entry created");
        }
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: subscribedToNewsletter && followsInstagram 
        ? "¡Registro completado! Ya participas en el sorteo." 
        : "Registro completado. Para participar en el sorteo, asegúrate de suscribirte a la newsletter y seguir nuestro Instagram."
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in register-contest", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});