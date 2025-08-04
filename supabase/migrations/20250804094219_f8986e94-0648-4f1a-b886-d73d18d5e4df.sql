-- Create function to automatically update menu item image URLs based on uploaded files
CREATE OR REPLACE FUNCTION public.update_menu_images()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    file_record RECORD;
    menu_item_record RECORD;
    base_url TEXT;
BEGIN
    -- Get the base URL for the storage bucket
    base_url := 'https://lwklmazvdqrmuriczhws.supabase.co/storage/v1/object/public/menu-images/';
    
    -- Loop through all files in the menu-images bucket
    FOR file_record IN 
        SELECT name, updated_at 
        FROM storage.objects 
        WHERE bucket_id = 'menu-images'
    LOOP
        -- Try to match file names with menu item names
        -- Remove file extension and normalize the name for matching
        FOR menu_item_record IN 
            SELECT id, name 
            FROM menu_items 
            WHERE LOWER(REPLACE(REPLACE(name, ' ', '-'), 'ñ', 'n')) = LOWER(REPLACE(file_record.name, '.jpg', ''))
               OR LOWER(REPLACE(REPLACE(name, ' ', '-'), 'ñ', 'n')) = LOWER(REPLACE(file_record.name, '.png', ''))
               OR LOWER(REPLACE(REPLACE(name, ' ', '-'), 'ñ', 'n')) = LOWER(REPLACE(file_record.name, '.webp', ''))
               OR LOWER(REPLACE(REPLACE(REPLACE(name, ' ', '-'), 'ñ', 'n'), 'í', 'i')) = LOWER(REPLACE(REPLACE(REPLACE(file_record.name, '.jpg', ''), '.png', ''), '.webp', ''))
        LOOP
            -- Update the menu item with the image URL
            UPDATE menu_items 
            SET image_url = base_url || file_record.name,
                updated_at = now()
            WHERE id = menu_item_record.id;
            
            RAISE NOTICE 'Updated image for menu item: % with file: %', menu_item_record.name, file_record.name;
        END LOOP;
    END LOOP;
END;
$$;

-- Create a more flexible function that allows manual mapping by file name pattern
CREATE OR REPLACE FUNCTION public.map_menu_image(file_name TEXT, menu_item_name TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    base_url TEXT;
BEGIN
    base_url := 'https://lwklmazvdqrmuriczhws.supabase.co/storage/v1/object/public/menu-images/';
    
    UPDATE menu_items 
    SET image_url = base_url || file_name,
        updated_at = now()
    WHERE LOWER(name) = LOWER(menu_item_name);
    
    IF FOUND THEN
        RAISE NOTICE 'Successfully mapped % to menu item: %', file_name, menu_item_name;
    ELSE
        RAISE NOTICE 'No menu item found with name: %', menu_item_name;
    END IF;
END;
$$;