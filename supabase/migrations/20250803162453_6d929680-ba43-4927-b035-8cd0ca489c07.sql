-- Update rice dishes in menu_items table to match the new data structure

-- First, delete existing rice items
DELETE FROM menu_items WHERE category = 'Acompañamientos y Panes' AND name IN ('Kashmiri Pulao', 'Pulao Rice', 'Boil Rice');

-- Insert the updated rice items with correct descriptions and add the new Egg Fried Rice
INSERT INTO menu_items (name, description, price, category, available) VALUES
('Kashmiri Pulao', 'Arroz basmati aromático cocinado con frutos secos, frutas confitadas y especias suaves. Sabor dulce y fragante, típico de la región de Cachemira. Ideal con platos suaves o cremosos.', 10.50, 'Acompañamientos y Panes', true),
('Pulao Rice', 'Arroz basmati salteado con especias suaves como comino, clavo y laurel. Ligero, aromático y perfecto como base para currys.', 7.50, 'Acompañamientos y Panes', true),
('Egg Fried Rice', 'Arroz basmati salteado al estilo indo-chino con huevo, cebolla y especias. Sabor suave y textura suelta. Buen acompañante de platos picantes o con especias.', 9.50, 'Acompañamientos y Panes', true),
('Boil Rice', 'Arroz basmati blanco hervido, simple y esponjoso. La opción más neutra para acompañar cualquier curry.', 7.00, 'Acompañamientos y Panes', true);