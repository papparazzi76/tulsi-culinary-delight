-- Update image URLs for main dishes
UPDATE menu_items SET image_url = '/src/assets/dishes/butter-chicken.jpg' WHERE name = 'Butter Chicken';
UPDATE menu_items SET image_url = '/src/assets/dishes/chicken-tikka-masala.jpg' WHERE name = 'Chicken Tikka Masala';
UPDATE menu_items SET image_url = '/src/assets/dishes/chicken-korma.jpg' WHERE name = 'Chicken Korma';
UPDATE menu_items SET image_url = '/src/assets/dishes/lamb-curry.jpg' WHERE name = 'Cordero Curry';
UPDATE menu_items SET image_url = '/src/assets/dishes/chicken-biryani.jpg' WHERE name = 'Chicken Hyderabadi Biryani';

-- Update image URLs for appetizers
UPDATE menu_items SET image_url = '/src/assets/dishes/samosa-vegetal.jpg' WHERE name = 'Samosa Vegetal (2 uds)';
UPDATE menu_items SET image_url = '/src/assets/dishes/tandoori-chicken.jpg' WHERE name = 'Chicken Tandoori 1/4';
UPDATE menu_items SET image_url = '/src/assets/dishes/chicken-65.jpg' WHERE name = 'Chicken 65';
UPDATE menu_items SET image_url = '/src/assets/dishes/pakora.jpg' WHERE name = 'Pakora Vegetal (4 uds)';

-- Update image URLs for vegetarian dishes
UPDATE menu_items SET image_url = '/src/assets/dishes/palak-paneer.jpg' WHERE name = 'Palak Paneer';
UPDATE menu_items SET image_url = '/src/assets/dishes/dal-tadka.jpg' WHERE name = 'Dal Tadka';

-- Update image URLs for seafood
UPDATE menu_items SET image_url = '/src/assets/dishes/fish-curry.jpg' WHERE name = 'Fish Kerala Curry';
UPDATE menu_items SET image_url = '/src/assets/dishes/prawns-curry.jpg' WHERE name = 'Prawns Curry';

-- Update image URLs for bread
UPDATE menu_items SET image_url = '/src/assets/dishes/naan-bread.jpg' WHERE name = 'Tandoori Naan';

-- Update image URLs for desserts and drinks
UPDATE menu_items SET image_url = '/src/assets/dishes/gulab-jamun.jpg' WHERE name = 'Gulab Jamun';
UPDATE menu_items SET image_url = '/src/assets/dishes/mango-lassi.jpg' WHERE name = 'Mango Lassi';