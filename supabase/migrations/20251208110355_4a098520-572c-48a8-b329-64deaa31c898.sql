-- Añadir política para permitir inserción de order_items desde service role
CREATE POLICY "order_items_insert_any" ON order_items
FOR INSERT
TO authenticated, anon
WITH CHECK (true);