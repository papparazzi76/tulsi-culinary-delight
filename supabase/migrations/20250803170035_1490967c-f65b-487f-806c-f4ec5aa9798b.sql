-- Update more image URLs for dishes
UPDATE menu_items SET image_url = '/src/assets/dishes/lamb-biryani.jpg' WHERE name = 'Lamb Lakhnau Biryani';
UPDATE menu_items SET image_url = '/src/assets/dishes/samosa-pollo.jpg' WHERE name = 'Samosa de Pollo (2 uds)';
UPDATE menu_items SET image_url = '/src/assets/dishes/garlic-naan.jpg' WHERE name = 'Garlic Naan';
UPDATE menu_items SET image_url = '/src/assets/dishes/malai-kofta.jpg' WHERE name = 'Malai Kofta';
UPDATE menu_items SET image_url = '/src/assets/dishes/chai.jpg' WHERE name = 'Chai (con leche)';

-- Use existing images for similar dishes
UPDATE menu_items SET image_url = '/src/assets/dishes/samosa-vegetal.jpg' WHERE name = 'Samosa de Carne (2 uds)';
UPDATE menu_items SET image_url = '/src/assets/dishes/naan-bread.jpg' WHERE name = 'Cheese Naan';
UPDATE menu_items SET image_url = '/src/assets/dishes/naan-bread.jpg' WHERE name = 'Cheese Garlic Naan';
UPDATE menu_items SET image_url = '/src/assets/dishes/naan-bread.jpg' WHERE name = 'Peshawari Naan';
UPDATE menu_items SET image_url = '/src/assets/dishes/chicken-biryani.jpg' WHERE name = 'Beef Punjabi Biryani';
UPDATE menu_items SET image_url = '/src/assets/dishes/chicken-biryani.jpg' WHERE name = 'Prawns Biryani';
UPDATE menu_items SET image_url = '/src/assets/dishes/chicken-biryani.jpg' WHERE name = 'Veg Biryani';