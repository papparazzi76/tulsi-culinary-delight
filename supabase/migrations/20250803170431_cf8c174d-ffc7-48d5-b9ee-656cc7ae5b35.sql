-- Update image URLs for more dishes
UPDATE menu_items SET image_url = '/src/assets/dishes/lamb-shank.jpg' WHERE name = 'Lamb Shank';
UPDATE menu_items SET image_url = '/src/assets/dishes/chicken-vindaloo.jpg' WHERE name = 'Chicken Vindaloo';
UPDATE menu_items SET image_url = '/src/assets/dishes/cheese-garlic-naan.jpg' WHERE name = 'Cheese Garlic Naan';
UPDATE menu_items SET image_url = '/src/assets/dishes/fish-moilee.jpg' WHERE name = 'Fish Moilee';
UPDATE menu_items SET image_url = '/src/assets/dishes/channa-masala.jpg' WHERE name = 'Channa Masala';
UPDATE menu_items SET image_url = '/src/assets/dishes/paneer-butter-masala.jpg' WHERE name = 'Paneer Butter Masala';
UPDATE menu_items SET image_url = '/src/assets/dishes/king-prawn-tandoori.jpg' WHERE name = 'King Prawn Tandoori';
UPDATE menu_items SET image_url = '/src/assets/dishes/beef-biryani.jpg' WHERE name = 'Beef Punjabi Biryani';
UPDATE menu_items SET image_url = '/src/assets/dishes/honey-chicken-wings.jpg' WHERE name = 'Honey Chicken Wings';
UPDATE menu_items SET image_url = '/src/assets/dishes/pani-puri.jpg' WHERE name = 'Pani Puri';

-- Add images to more chicken dishes using similar images
UPDATE menu_items SET image_url = '/src/assets/dishes/chicken-korma.jpg' WHERE name = 'Malai Chicken';
UPDATE menu_items SET image_url = '/src/assets/dishes/chicken-tikka-masala.jpg' WHERE name = 'Chicken Jalfrezi';
UPDATE menu_items SET image_url = '/src/assets/dishes/butter-chicken.jpg' WHERE name = 'Chicken Karahi';
UPDATE menu_items SET image_url = '/src/assets/dishes/chicken-tikka-masala.jpg' WHERE name = 'Chicken Madras';
UPDATE menu_items SET image_url = '/src/assets/dishes/butter-chicken.jpg' WHERE name = 'Chicken Balti';
UPDATE menu_items SET image_url = '/src/assets/dishes/palak-paneer.jpg' WHERE name = 'Chicken Saag';

-- Add images to lamb dishes
UPDATE menu_items SET image_url = '/src/assets/dishes/chicken-tikka-masala.jpg' WHERE name = 'Cordero Tikka Masala';
UPDATE menu_items SET image_url = '/src/assets/dishes/chicken-korma.jpg' WHERE name = 'Cordero Korma';
UPDATE menu_items SET image_url = '/src/assets/dishes/chicken-tikka-masala.jpg' WHERE name = 'Cordero Jalfrezi';
UPDATE menu_items SET image_url = '/src/assets/dishes/lamb-curry.jpg' WHERE name = 'Cordero Karahi';
UPDATE menu_items SET image_url = '/src/assets/dishes/chicken-vindaloo.jpg' WHERE name = 'Cordero Vindaloo';
UPDATE menu_items SET image_url = '/src/assets/dishes/lamb-curry.jpg' WHERE name = 'Cordero Balti';
UPDATE menu_items SET image_url = '/src/assets/dishes/palak-paneer.jpg' WHERE name = 'Cordero Saag';