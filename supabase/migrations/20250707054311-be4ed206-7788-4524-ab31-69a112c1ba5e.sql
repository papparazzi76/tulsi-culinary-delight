-- Add tables table for restaurant table management
CREATE TABLE public.tables (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  table_number integer NOT NULL UNIQUE,
  capacity integer NOT NULL,
  status text NOT NULL DEFAULT 'available',
  current_order_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS on tables
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;

-- Create policies for tables (staff can manage all tables)
CREATE POLICY "Tables are viewable by authenticated users" 
ON public.tables 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update tables" 
ON public.tables 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert tables" 
ON public.tables 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Add missing columns to orders table for restaurant operations  
ALTER TABLE public.orders ADD COLUMN table_id uuid REFERENCES public.tables(id);
ALTER TABLE public.orders ADD COLUMN waiter_id uuid REFERENCES auth.users(id);

-- Update orders table policies to allow staff access
CREATE POLICY "Staff can view all orders" 
ON public.orders 
FOR SELECT 
TO authenticated
USING (true);

-- Create trigger for automatic timestamp updates on tables
CREATE TRIGGER update_tables_updated_at
  BEFORE UPDATE ON public.tables
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample tables data
INSERT INTO public.tables (table_number, capacity, status) VALUES 
(1, 2, 'available'),
(2, 4, 'available'), 
(3, 4, 'available'),
(4, 6, 'available'),
(5, 2, 'available'),
(6, 8, 'available'),
(7, 4, 'available'),
(8, 2, 'available'),
(9, 4, 'available'),
(10, 6, 'available');