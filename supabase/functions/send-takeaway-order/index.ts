import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  total: number;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-takeaway-order function called");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: OrderRequest = await req.json();
    console.log("Order data received:", JSON.stringify(data));

    // Validate required fields
    if (!data.customerName || !data.customerEmail || !data.items || data.items.length === 0) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Faltan campos requeridos" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate order number
    const orderNumber = `TUL-${Date.now().toString(36).toUpperCase()}`;
    const orderDate = new Date().toLocaleString('es-ES', { 
      timeZone: 'Europe/Madrid',
      dateStyle: 'full',
      timeStyle: 'short'
    });

    // Initialize Supabase client with service role for database operations
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save order to database - this triggers automatic printing via real-time subscription
    console.log("Saving order to database...");
    const { data: savedOrder, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        customer_phone: data.customerPhone || null,
        delivery_type: data.deliveryType,
        delivery_address: data.deliveryType === 'delivery' ? data.deliveryAddress : null,
        status: 'pending',
        payment_status: 'pending',
        subtotal: data.subtotal,
        discount_amount: data.discountAmount,
        total_amount: data.total
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error saving order:", orderError);
      throw new Error(`Error al guardar el pedido: ${orderError.message}`);
    }

    console.log("Order saved with ID:", savedOrder.id);

    // Save order items
    const orderItems = data.items.map(item => ({
      order_id: savedOrder.id,
      menu_item_id: item.id,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error("Error saving order items:", itemsError);
      // Don't fail completely, order is saved
    } else {
      console.log("Order items saved successfully");
    }

    // Build items HTML for emails
    const itemsHtml = data.items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">€${item.price.toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">€${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const deliveryInfo = data.deliveryType === 'pickup' 
      ? `<p><strong>📍 Recogida en:</strong> Calle Marina Escobar, 1, 47001 Valladolid</p>`
      : `<p><strong>🚗 Envío a:</strong> ${data.deliveryAddress}</p>`;

    const discountHtml = data.discountAmount > 0 
      ? `<tr>
          <td colspan="3" style="padding: 10px; text-align: right; color: #16a34a;"><strong>Descuento recogida (20%):</strong></td>
          <td style="padding: 10px; text-align: right; color: #16a34a;"><strong>-€${data.discountAmount.toFixed(2)}</strong></td>
        </tr>`
      : '';

    // Email template for customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">
        <div style="background: linear-gradient(135deg, #D97706, #B45309); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">¡Pedido Recibido!</h1>
          <p style="color: #FEF3C7; margin: 10px 0 0 0;">Tulsi Indian Restaurant</p>
        </div>
        
        <div style="padding: 30px;">
          <p style="font-size: 16px;">Hola <strong>${data.customerName}</strong>,</p>
          <p style="font-size: 16px;">Hemos recibido tu pedido correctamente. A continuación te dejamos los detalles:</p>
          
          <div style="background: #FEF3C7; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0;"><strong>📋 Número de pedido:</strong> ${orderNumber}</p>
            <p style="margin: 5px 0 0 0;"><strong>📅 Fecha:</strong> ${orderDate}</p>
          </div>

          ${deliveryInfo}
          
          <h3 style="color: #D97706; margin-top: 30px;">Tu pedido:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #FEF3C7;">
                <th style="padding: 10px; text-align: left;">Producto</th>
                <th style="padding: 10px; text-align: center;">Cant.</th>
                <th style="padding: 10px; text-align: right;">Precio</th>
                <th style="padding: 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right;"><strong>Subtotal:</strong></td>
                <td style="padding: 10px; text-align: right;"><strong>€${data.subtotal.toFixed(2)}</strong></td>
              </tr>
              ${discountHtml}
              <tr style="background: #D97706; color: white;">
                <td colspan="3" style="padding: 15px; text-align: right;"><strong>TOTAL A PAGAR:</strong></td>
                <td style="padding: 15px; text-align: right;"><strong>€${data.total.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
          
          <div style="background: #E0F2FE; padding: 20px; border-radius: 10px; margin: 30px 0; border-left: 4px solid #0284C7;">
            <h4 style="color: #0284C7; margin: 0 0 10px 0;">💳 Forma de pago</h4>
            <p style="margin: 0; color: #0369A1;">
              El pago se realizará <strong>en el restaurante al recoger tu pedido</strong>.<br/>
              Aceptamos <strong>efectivo</strong> y <strong>tarjeta</strong>.
            </p>
          </div>
          
          <div style="background: #FEF3C7; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0;"><strong>📍 Dirección:</strong> Calle Marina Escobar, 1, 47001 Valladolid</p>
            <p style="margin: 5px 0 0 0;"><strong>📞 Teléfono:</strong> +34 645 94 62 02</p>
            <p style="margin: 5px 0 0 0;"><strong>⏰ Tiempo estimado:</strong> 15-25 minutos</p>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.
          </p>
          
          <p style="color: #D97706; font-weight: bold;">¡Gracias por elegir Tulsi Indian Restaurant!</p>
        </div>
      </div>
    `;

    // Email template for restaurant
    const restaurantEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">
        <div style="background: #DC2626; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">🍽️ NUEVO PEDIDO PARA LLEVAR</h1>
        </div>
        
        <div style="padding: 20px;">
          <div style="background: #FEE2E2; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 18px;"><strong>Pedido #${orderNumber}</strong></p>
            <p style="margin: 5px 0 0 0;">${orderDate}</p>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #0284C7;">
              🖨️ Impresión automática activada en panel de staff
            </p>
          </div>
          
          <h3>📋 Datos del cliente:</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Nombre:</strong> ${data.customerName}</li>
            <li><strong>Email:</strong> ${data.customerEmail}</li>
            <li><strong>Teléfono:</strong> ${data.customerPhone || 'No proporcionado'}</li>
            <li><strong>Tipo:</strong> ${data.deliveryType === 'pickup' ? '🏪 RECOGIDA EN LOCAL' : '🚗 ENVÍO A DOMICILIO'}</li>
            ${data.deliveryType === 'delivery' ? `<li><strong>Dirección:</strong> ${data.deliveryAddress}</li>` : ''}
          </ul>
          
          <h3>🍛 Productos:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #FEE2E2;">
                <th style="padding: 10px; text-align: left;">Producto</th>
                <th style="padding: 10px; text-align: center;">Cant.</th>
                <th style="padding: 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${data.items.map(item => `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${item.name}</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">€${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div style="background: #DC2626; color: white; padding: 15px; border-radius: 10px; margin-top: 20px; text-align: center;">
            <p style="margin: 0; font-size: 24px;"><strong>TOTAL: €${data.total.toFixed(2)}</strong></p>
            ${data.discountAmount > 0 ? `<p style="margin: 5px 0 0 0; font-size: 14px;">(Descuento aplicado: €${data.discountAmount.toFixed(2)})</p>` : ''}
            <p style="margin: 10px 0 0 0; font-size: 14px;">💳 PAGO EN RESTAURANTE</p>
          </div>
        </div>
      </div>
    `;

    // Send email to customer
    console.log("Sending customer confirmation to:", data.customerEmail);
    const customerEmailResult = await resend.emails.send({
      from: "Tulsi Indian Restaurant <reservas@tulsiindianvalladolid.com>",
      to: [data.customerEmail],
      subject: `Confirmación de Pedido ${orderNumber} - Tulsi Indian Restaurant`,
      html: customerEmailHtml,
    });
    console.log("Customer email result:", JSON.stringify(customerEmailResult));

    if (customerEmailResult.error) {
      console.error("Error sending customer email:", customerEmailResult.error);
    }

    // Send notification to restaurant
    console.log("Sending restaurant notification");
    const restaurantEmailResult = await resend.emails.send({
      from: "Tulsi Pedidos <reservas@tulsiindianvalladolid.com>",
      to: ["reservas@tulsiindianvalladolid.com"],
      subject: `🍽️ NUEVO PEDIDO ${orderNumber} - ${data.customerName}`,
      html: restaurantEmailHtml,
    });
    console.log("Restaurant email result:", JSON.stringify(restaurantEmailResult));

    if (restaurantEmailResult.error) {
      console.error("Error sending restaurant email:", restaurantEmailResult.error);
    }

    console.log("Order completed successfully:", orderNumber);

    return new Response(
      JSON.stringify({ 
        success: true, 
        orderNumber,
        orderId: savedOrder.id,
        message: "Pedido guardado y enviado correctamente"
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error in send-takeaway-order:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);