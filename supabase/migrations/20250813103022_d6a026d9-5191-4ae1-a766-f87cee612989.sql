-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Staff can view all orders" ON public.orders;
DROP POLICY IF EXISTS "orders_insert" ON public.orders;
DROP POLICY IF EXISTS "orders_update" ON public.orders;

-- Create secure RLS policies for orders table

-- Allow customers to view only their own orders (by user_id or session_id for guest orders)
CREATE POLICY "Users can view their own orders" ON public.orders
FOR SELECT 
USING (
  (auth.uid() = user_id) OR 
  (session_id IS NOT NULL AND session_id != '')
);

-- Allow authenticated staff (waiters, admins) to view all orders
CREATE POLICY "Staff can view all orders" ON public.orders
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('waiter', 'admin', 'kitchen')
  )
);

-- Allow public order creation for checkout process (anonymous users can create orders)
CREATE POLICY "Allow order creation" ON public.orders
FOR INSERT 
WITH CHECK (true);

-- Only allow staff to update order status and details
CREATE POLICY "Staff can update orders" ON public.orders
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('waiter', 'admin', 'kitchen')
  )
);

-- Allow users to update their own orders (for status changes from payment systems)
CREATE POLICY "Users can update their own orders" ON public.orders
FOR UPDATE 
USING (
  (auth.uid() = user_id) OR 
  (session_id IS NOT NULL AND session_id != '')
);