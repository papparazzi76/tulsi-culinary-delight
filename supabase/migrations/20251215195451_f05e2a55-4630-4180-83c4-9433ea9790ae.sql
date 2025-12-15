-- Drop the restrictive INSERT policy
DROP POLICY IF EXISTS "Anyone can create reservations" ON public.reservations;

-- Create a PERMISSIVE INSERT policy that allows anyone to create reservations
CREATE POLICY "Anyone can create reservations" 
ON public.reservations 
FOR INSERT 
TO public
WITH CHECK (true);