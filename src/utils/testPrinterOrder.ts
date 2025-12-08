import { supabase } from '@/integrations/supabase/client';

export async function createTestPrinterOrder() {
  // Generate order number
  const now = new Date();
  const orderNumber = `TEST-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      customer_name: 'Cliente Prueba Impresora',
      customer_email: 'prueba@tulsi.test',
      customer_phone: '+34 666 123 456',
      delivery_type: 'pickup', // This triggers the printer
      delivery_address: null,
      status: 'pending',
      payment_status: 'pending',
      subtotal: 28.50,
      total_amount: 28.50,
      session_id: 'test-printer-session'
    })
    .select()
    .single();

  if (orderError) {
    console.error('Error creating test order:', orderError);
    throw orderError;
  }

  // Add order items
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert([
      {
        order_id: order.id,
        menu_item_id: 'ce7fa50d-da6b-4cac-b32a-96f5757abe50', // Chicken Tikka Masala
        quantity: 2,
        unit_price: 14.50,
        total_price: 29.00
      }
    ]);

  if (itemsError) {
    console.error('Error creating test order items:', itemsError);
    throw itemsError;
  }

  console.log('✅ Test order created:', order.order_number);
  return order;
}
