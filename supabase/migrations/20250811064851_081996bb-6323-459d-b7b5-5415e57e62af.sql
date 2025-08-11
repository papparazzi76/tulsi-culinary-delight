-- Create public bucket for downloadable menu PDF
insert into storage.buckets (id, name, public)
values ('menu-files', 'menu-files', true)
on conflict (id) do nothing;

-- Ensure public read access to files in this bucket
create policy if not exists "Public read for menu-files"
on storage.objects
for select
using (bucket_id = 'menu-files');