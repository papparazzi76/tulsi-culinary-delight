-- Drop the overly permissive SELECT policy that allows anyone to read customer data
DROP POLICY IF EXISTS "newsletter_select_own" ON public.newsletter_subscribers;

-- Create secure policy: Only authenticated staff can view all newsletter subscribers
CREATE POLICY "Staff can view newsletter subscribers" ON public.newsletter_subscribers
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'waiter', 'kitchen')
  )
);

-- Optional: Allow users to view only their own subscription status (if needed for user features)
CREATE POLICY "Users can view their own subscription" ON public.newsletter_subscribers
FOR SELECT 
TO authenticated
USING (
  -- This would require adding user_id to newsletter_subscribers table
  -- For now, we'll keep it restrictive to staff only
  false
);