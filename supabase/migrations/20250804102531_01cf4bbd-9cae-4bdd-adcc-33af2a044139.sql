-- Verificar primero qué imágenes funcionan correctamente
SELECT name, image_url FROM menu_items WHERE image_url IS NOT NULL ORDER BY name;