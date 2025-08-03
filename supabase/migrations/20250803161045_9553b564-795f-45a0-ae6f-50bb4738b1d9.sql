-- First, create a temporary table to store current Entrantes items that are NOT tandoori
CREATE TEMP TABLE temp_non_tandoori AS 
SELECT * FROM menu_items 
WHERE category = 'Entrantes' 
AND name NOT IN ('Chicken Haryali', 'Chicken Tikka', 'Sheek Kebab', 'Salmón Tikka (2 uds)', 'Tandoori Brócoli');

-- Delete all current Entrantes items
DELETE FROM menu_items WHERE category = 'Entrantes';

-- Re-insert the non-tandoori items
INSERT INTO menu_items (id, name, description, price, category, available, created_at, updated_at, image_url)
SELECT id, name, description, price, category, available, created_at, updated_at, image_url
FROM temp_non_tandoori;

-- Insert the new tandoori items with exact descriptions from the image
INSERT INTO menu_items (name, description, price, category, available) VALUES
('Chicken Haryali', 'Dados de pollo marinados en una mezcla de yogur, menta, cilantro y especias verdes, asados en el horno tandoor.', 8.00, 'Entrantes', true),
('Chicken Tikka', 'Trozos de pollo en tandoor previamente marinados en yogur y especias tradicionales, resultando jugosos y tiernos.', 8.00, 'Entrantes', true),
('Chicken Reshmi Kebab', 'Brochetas suaves, cremosas gracias a anacardos y crema, con especias delicadas que realzan la textura del pollo.', 8.00, 'Entrantes', true),
('Sheek Kebab', 'Carne picada especiada con cilantro, comino y chile, prensada y asada en horno de barro para una capa crujiente y centro tierno.', 9.00, 'Entrantes', true),
('Chicken Tandoori 1/4', 'Clásico muslo o pechuga marinado en especias y yogur, asado lentamente en tandoor, con piel ahumada y carne tierna.', 8.00, 'Entrantes', true),
('Salmón Tikka 2 uds', 'Trozos de salmón marinados en yogur, jengibre y ajo, cocinados en tandoor para mantener jugosidad y un ligero ahumado.', 9.00, 'Entrantes', true),
('Tandoori Brócoli', 'Floretes de brócoli marinados en yogur y especias, asados en horno tandoor hasta lograr bordes caramelizados y un interior tierno.', 8.50, 'Entrantes', true);