-- Create public bucket for downloadable menu PDF
insert into storage.buckets (id, name, public)
values ('menu-files', 'menu-files', true)
on conflict (id) do nothing;

-- Ensure public read access to files in this bucket (create only if missing)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
      AND tablename = 'objects' 
      AND policyname = 'Public read for menu-files'
  ) THEN
    EXECUTE 'CREATE POLICY "Public read for menu-files" ON storage.objects FOR SELECT USING (bucket_id = ''menu-files'')';
  END IF;
END;
$$;