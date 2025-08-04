-- Map the uploaded yogurt gol gappa image to the menu item
SELECT public.map_menu_image('yogurt-gol-gappa-alt.jpg', 'Yogurt Gol Gappa');

-- Verify the mapping worked
SELECT name, image_url FROM menu_items WHERE name = 'Yogurt Gol Gappa';