import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderStatusRequest {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  status: 'accepted' | 'cancelled';
  items: { name: string; quantity: number; price: number }[];
  total: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: OrderStatusRequest = await req.json();
    console.log("Order status email request:", data);

    const { orderNumber, customerName, customerEmail, customerPhone, status, items, total } = data;

    if (!customerEmail || !orderNumber || !status) {
      throw new Error("Missing required fields: customerEmail, orderNumber, or status");
    }

    const restaurantPhone = "+34 645 94 62 02";
    
    let subject: string;
    let htmlContent: string;

    if (status === 'accepted') {
      subject = `✅ Pedido ${orderNumber} Confirmado - Tulsi Indian`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .header .check { font-size: 48px; margin-bottom: 10px; }
            .content { padding: 30px; }
            .order-number { background: #f0fdf4; border: 2px solid #16a34a; border-radius: 8px; padding: 15px; text-align: center; margin-bottom: 20px; }
            .order-number span { font-size: 24px; font-weight: bold; color: #16a34a; }
            .items { margin: 20px 0; }
            .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .total { font-size: 20px; font-weight: bold; text-align: right; padding: 15px 0; border-top: 2px solid #333; }
            .message { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="check">✓</div>
              <h1>¡Pedido Confirmado!</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${customerName}</strong>,</p>
              <p>Nos complace informarte que tu pedido ha sido <strong>aceptado</strong> y estamos preparándolo con mucho cariño.</p>
              
              <div class="order-number">
                <p style="margin: 0 0 5px 0; color: #666;">Número de pedido</p>
                <span>${orderNumber}</span>
              </div>
              
              <div class="items">
                <h3>Resumen de tu pedido:</h3>
                ${items.map(item => `
                  <div class="item">
                    <span>${item.quantity}x ${item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}€</span>
                  </div>
                `).join('')}
              </div>
              
              <div class="total">
                Total: ${total.toFixed(2)}€
              </div>
              
              <div class="message">
                <strong>⏱️ Tiempo estimado:</strong> Tu pedido estará listo en aproximadamente 20-30 minutos.
              </div>
              
              <p>Si tienes alguna pregunta, no dudes en llamarnos al <strong>${restaurantPhone}</strong></p>
            </div>
            <div class="footer">
              <p><strong>Tulsi Indian Restaurant</strong></p>
              <p>C/ Santiago, 12 - Valladolid</p>
              <p>Tel: ${restaurantPhone}</p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      // Cancelled
      subject = `❌ Pedido ${orderNumber} No Disponible - Tulsi Indian`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .header .icon { font-size: 48px; margin-bottom: 10px; }
            .content { padding: 30px; }
            .order-number { background: #fef2f2; border: 2px solid #dc2626; border-radius: 8px; padding: 15px; text-align: center; margin-bottom: 20px; }
            .order-number span { font-size: 24px; font-weight: bold; color: #dc2626; }
            .message { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; }
            .phone-box { background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
            .phone-box .phone { font-size: 28px; font-weight: bold; color: #1d4ed8; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="icon">📞</div>
              <h1>No Podemos Procesar tu Pedido Online</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${customerName}</strong>,</p>
              <p>Lamentamos informarte que <strong>no podemos procesar tu pedido online</strong> en este momento debido a alta demanda o disponibilidad de ingredientes.</p>
              
              <div class="order-number">
                <p style="margin: 0 0 5px 0; color: #666;">Pedido cancelado</p>
                <span>${orderNumber}</span>
              </div>
              
              <div class="message">
                <strong>🙏 ¡Pero no te preocupes!</strong><br>
                Puedes realizar tu pedido llamando directamente a nuestro restaurante. Estaremos encantados de atenderte personalmente.
              </div>
              
              <div class="phone-box">
                <p style="margin: 0 0 10px 0; color: #666;">Llámanos ahora al:</p>
                <div class="phone">${restaurantPhone}</div>
              </div>
              
              <p>Disculpa las molestias causadas. ¡Esperamos poder servirte pronto!</p>
            </div>
            <div class="footer">
              <p><strong>Tulsi Indian Restaurant</strong></p>
              <p>C/ Santiago, 12 - Valladolid</p>
              <p>Tel: ${restaurantPhone}</p>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // Send email to customer
    const emailResponse = await resend.emails.send({
      from: "Tulsi Indian <reservas@tulsiindianvalladolid.com>",
      to: [customerEmail],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Order ${status} email sent to ${customerEmail}`,
        emailId: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending order status email:", error);
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
