-- Create profiles table for user management
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'waiter',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Profiles are viewable by authenticated users" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

-- Create reservations table
CREATE TABLE public.reservations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  reservation_time timestamp with time zone NOT NULL,
  number_of_guests integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  notes text,
  table_id text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS on reservations
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Create policies for reservations
CREATE POLICY "Reservations are viewable by authenticated users" 
ON public.reservations 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Anyone can create reservations" 
ON public.reservations 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update reservations" 
ON public.reservations 
FOR UPDATE 
TO authenticated
USING (true);

-- Create trigger for automatic timestamp updates on profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for automatic timestamp updates on reservations
CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create get_sales_summary function for reports
CREATE OR REPLACE FUNCTION public.get_sales_summary(start_date date, end_date date)
RETURNS TABLE(
  total_orders bigint,
  total_revenue numeric,
  average_order_value numeric
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::bigint as total_orders,
    COALESCE(SUM(total_amount), 0) as total_revenue,
    COALESCE(AVG(total_amount), 0) as average_order_value
  FROM orders 
  WHERE created_at::date BETWEEN start_date AND end_date
    AND payment_status = 'completed';
END;
$$;