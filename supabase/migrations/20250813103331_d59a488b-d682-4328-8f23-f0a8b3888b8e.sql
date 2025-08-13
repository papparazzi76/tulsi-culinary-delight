-- Drop overly permissive policies that allow any authenticated user to read/update reservations
DROP POLICY IF EXISTS "Reservations are viewable by authenticated users" ON public.reservations;
DROP POLICY IF EXISTS "Authenticated users can update reservations" ON public.reservations;

-- Create secure policy: Only authenticated staff can view reservations
CREATE POLICY "Staff can view reservations" ON public.reservations
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'waiter', 'kitchen')
  )
);

-- Create secure policy: Only authenticated staff can update reservations
CREATE POLICY "Staff can update reservations" ON public.reservations
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'waiter', 'kitchen')
  )
);

-- Keep the existing INSERT policy as customers need to create reservations
-- "Anyone can create reservations" policy remains unchanged