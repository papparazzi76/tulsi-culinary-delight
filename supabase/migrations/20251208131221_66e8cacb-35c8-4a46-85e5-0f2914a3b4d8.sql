-- Eliminar política restrictiva de UPDATE que causa conflicto
DROP POLICY IF EXISTS "Staff can update orders" ON orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;

-- Crear política permisiva para que staff pueda actualizar cualquier pedido
CREATE POLICY "Staff can update all orders" 
ON orders 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('waiter', 'admin', 'kitchen')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('waiter', 'admin', 'kitchen')
  )
);

-- Política para que usuarios puedan actualizar sus propios pedidos
CREATE POLICY "Users can update own orders" 
ON orders 
FOR UPDATE 
TO authenticated, anon
USING (
  (auth.uid() = user_id) OR (session_id IS NOT NULL AND session_id <> '')
)
WITH CHECK (
  (auth.uid() = user_id) OR (session_id IS NOT NULL AND session_id <> '')
);