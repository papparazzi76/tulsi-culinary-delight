-- Create a storage bucket for menu item images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('menu-images', 'menu-images', true);

-- Create storage policies for the menu images bucket
-- Allow public access to view images
CREATE POLICY "Menu images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'menu-images');

-- Allow authenticated users to upload images (for admin management)
CREATE POLICY "Authenticated users can upload menu images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'menu-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update images
CREATE POLICY "Authenticated users can update menu images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'menu-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete images  
CREATE POLICY "Authenticated users can delete menu images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'menu-images' AND auth.role() = 'authenticated');