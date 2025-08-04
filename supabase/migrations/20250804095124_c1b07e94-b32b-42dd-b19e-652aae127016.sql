-- Step 1: Run automatic image mapping
SELECT public.update_menu_images();

-- Step 2: Manually map the images that don't match automatically
SELECT public.map_menu_image('samosa-carne.webp', 'Samosa de Carne (2 uds)');
SELECT public.map_menu_image('samosa-pollo.webp', 'Samosa de Pollo (2 uds)');

-- Step 3: Verify the mappings worked by checking which items now have image URLs
SELECT name, image_url FROM menu_items WHERE image_url IS NOT NULL;