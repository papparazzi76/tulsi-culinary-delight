import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReservationData {
  number_of_guests: number;
  reservation_date: string;
  reservation_time: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const data: ReservationData = await req.json();
    console.log("Saving reservation:", data);

    // Combine date and time
    const reservationDateTime = `${data.reservation_date}T${data.reservation_time}:00`;

    // Save to database
    const { data: reservation, error: dbError } = await supabase
      .from('reservations')
      .insert({
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        number_of_guests: data.number_of_guests,
        reservation_time: reservationDateTime,
        status: 'confirmed',
        notes: 'Reserva realizada por asistente de voz'
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Error al guardar reserva: ${dbError.message}`);
    }

    console.log("Reservation saved:", reservation);

    // Format date for emails
    const dateOptions: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const formattedDate = new Date(data.reservation_date).toLocaleDateString('es-ES', dateOptions);

    // Send notification to restaurant
    try {
      await resend.emails.send({
        from: "Tulsi Reservas <reservas@tulsiindianvalladolid.com>",
        to: ["reservas@tulsiindianvalladolid.com"],
        subject: `Nueva Reserva - ${data.customer_name} - ${formattedDate}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #D97706; border-bottom: 2px solid #D97706; padding-bottom: 10px;">
              🎤 Nueva Reserva por Asistente de Voz
            </h1>
            
            <div style="background: #FEF3C7; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #92400E;">Detalles de la Reserva</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold;">Nombre:</td><td>${data.customer_name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Fecha:</td><td>${formattedDate}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Hora:</td><td>${data.reservation_time}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Comensales:</td><td>${data.number_of_guests} personas</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Teléfono:</td><td>${data.customer_phone}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${data.customer_email}</td></tr>
              </table>
            </div>
          </div>
        `,
      });
      console.log("Restaurant notification sent");
    } catch (emailError) {
      console.error("Error sending restaurant notification:", emailError);
    }

    // Send confirmation to customer
    try {
      console.log("Sending customer confirmation to:", data.customer_email);
      const customerEmailResult = await resend.emails.send({
        from: "Tulsi Indian Restaurant <reservas@tulsiindianvalladolid.com>",
        to: [data.customer_email],
        subject: `Confirmación de Reserva - Tulsi Indian Restaurant`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #D97706;">Tulsi Indian Restaurant</h1>
              <p style="color: #666;">Auténtica Cocina India en Valladolid</p>
            </div>
            
            <h2 style="color: #1F2937;">¡Reserva Confirmada!</h2>
            <p>Hola ${data.customer_name},</p>
            <p>Tu reserva ha sido confirmada con éxito. Aquí están los detalles:</p>
            
            <div style="background: #F3F4F6; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #D97706;">
              <p style="margin: 5px 0;"><strong>📅 Fecha:</strong> ${formattedDate}</p>
              <p style="margin: 5px 0;"><strong>🕐 Hora:</strong> ${data.reservation_time}</p>
              <p style="margin: 5px 0;"><strong>👥 Comensales:</strong> ${data.number_of_guests} personas</p>
            </div>
            
            <div style="background: #FEF3C7; padding: 15px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 0;"><strong>📍 Dirección:</strong> C/ Marina Escobar 1, 47001 Valladolid</p>
              <p style="margin: 5px 0 0 0;"><strong>📞 Teléfono:</strong> +34 645 94 62 02</p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Si necesitas modificar o cancelar tu reserva, por favor contáctanos por teléfono.
            </p>
            
            <p>¡Te esperamos!</p>
            <p><strong>El equipo de Tulsi Indian Restaurant</strong></p>
          </div>
        `,
      });
      console.log("Customer confirmation result:", JSON.stringify(customerEmailResult));
      
      if (customerEmailResult.error) {
        console.error("Resend error for customer:", customerEmailResult.error);
      }
    } catch (emailError) {
      console.error("Error sending customer confirmation:", emailError);
    }

    return new Response(
      JSON.stringify({ success: true, reservation }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
