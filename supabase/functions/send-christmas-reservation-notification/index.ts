import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReservationEmailRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfGuests: number;
  reservationTime: string;
  menuName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      numberOfGuests,
      reservationTime,
      menuName,
    }: ReservationEmailRequest = await req.json();

    console.log("Processing Christmas reservation notification:", {
      customerName,
      customerEmail,
      menuName,
      reservationTime,
    });

    // Format the date nicely
    const date = new Date(reservationTime);
    const formattedDate = date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Send notification email to restaurant
    const restaurantEmail = await resend.emails.send({
      from: "Reservas Tul India <reservas@tulsiindianvalladolid.com>",
      to: ["reservas@tulsiindianvalladolid.com"],
      subject: `🎄 Nueva Reserva de Navidad - ${menuName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #d32f2f; border-bottom: 2px solid #d32f2f; padding-bottom: 10px;">
            🎄 Nueva Reserva de Navidad
          </h1>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">${menuName}</h2>
            
            <div style="margin: 15px 0;">
              <p style="margin: 5px 0;"><strong>📅 Fecha:</strong> ${formattedDate}</p>
              <p style="margin: 5px 0;"><strong>🕐 Hora:</strong> ${formattedTime}</p>
              <p style="margin: 5px 0;"><strong>👥 Número de personas:</strong> ${numberOfGuests}</p>
            </div>

            <hr style="border: 1px solid #ddd; margin: 20px 0;">

            <h3 style="color: #333;">Datos del Cliente:</h3>
            <p style="margin: 5px 0;"><strong>Nombre:</strong> ${customerName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${customerEmail}</p>
            <p style="margin: 5px 0;"><strong>Teléfono:</strong> ${customerPhone}</p>
          </div>

          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404;">
              <strong>⚠️ Nota:</strong> Menú único, no modificable. Precio: 32€ por persona.
            </p>
          </div>

          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            Esta es una notificación automática del sistema de reservas de Tul India.
          </p>
        </div>
      `,
    });

    console.log("Restaurant notification sent:", restaurantEmail);

    // Send confirmation email to customer
    const customerConfirmation = await resend.emails.send({
      from: "Tul India Restaurante <reservas@tulsiindianvalladolid.com>",
      to: [customerEmail],
      subject: `Confirmación de Reserva - ${menuName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #d32f2f; text-align: center;">🎄 Tul India Restaurante</h1>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">¡Gracias por tu reserva, ${customerName}!</h2>
            
            <p style="color: #666;">
              Hemos recibido tu reserva para nuestro <strong>${menuName}</strong>. 
              Te confirmaremos la reserva pronto.
            </p>

            <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Detalles de tu Reserva:</h3>
              <p style="margin: 5px 0;"><strong>📅 Fecha:</strong> ${formattedDate}</p>
              <p style="margin: 5px 0;"><strong>🕐 Hora:</strong> ${formattedTime}</p>
              <p style="margin: 5px 0;"><strong>👥 Personas:</strong> ${numberOfGuests}</p>
              <p style="margin: 5px 0;"><strong>💰 Precio:</strong> 32€ por persona</p>
            </div>

            <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #2196f3;">
              <p style="margin: 0; color: #1565c0;">
                <strong>ℹ️ Información importante:</strong><br>
                • Menú único, no se pueden realizar modificaciones<br>
                • Incluye aperitivo, entrantes, platos principales y postres<br>
                • Mínimo 2 personas - Máximo 14 personas
              </p>
            </div>
          </div>

          <p style="text-align: center; color: #666; font-size: 14px;">
            Si tienes alguna pregunta, no dudes en contactarnos.
          </p>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px; margin: 5px 0;">
              Tul India Restaurante<br>
              📧 reservas@tulsiindianvalladolid.com
            </p>
          </div>
        </div>
      `,
    });

    console.log("Customer confirmation sent:", customerConfirmation);

    return new Response(
      JSON.stringify({
        success: true,
        restaurantEmail,
        customerConfirmation,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-christmas-reservation-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
