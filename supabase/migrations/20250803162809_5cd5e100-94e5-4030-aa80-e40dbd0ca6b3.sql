-- Update tandoor breads in menu_items table to match the new data structure

-- First, delete existing tandoor bread items
DELETE FROM menu_items WHERE category = 'Acompañamientos y Panes' AND name IN ('Cheese Naan', 'Cheese Garlic Naan', 'Garlic Naan', 'Peshawari Naan', 'Tandoori Naan', 'Roti / Chapati');

-- Insert the updated tandoor breads with correct descriptions and add the missing ones
INSERT INTO menu_items (name, description, price, category, available) VALUES
('Cheese Naan', 'Pan tierno relleno de queso fundido, horneado en el tandoor. Ideal para acompañar salsas cremosas.', 4.50, 'Acompañamientos y Panes', true),
('Cheese Garlic Naan', 'Naan relleno de queso con ajo fresco, dorado en el tandoor. Cremoso y aromático, perfecto para platos intensos.', 5.00, 'Acompañamientos y Panes', true),
('Garlic Naan', 'Clásico naan con ajo fresco y mantequilla, ligeramente crujiente y muy fragante.', 4.00, 'Acompañamientos y Panes', true),
('Onion Naan', 'Naan relleno de cebolla finamente picada, asado en el tandoor. Sabor dulce y tostado.', 4.00, 'Acompañamientos y Panes', true),
('Peshawari Naan', 'Pan dulce relleno de frutos secos, coco y frutas confitadas. Dulce y aromático, ideal con currys picantes.', 5.00, 'Acompañamientos y Panes', true),
('Tandoori Naan', 'Versión tradicional del pan naan simple, suave y tierno, cocinado en el horno tandoor. Acompañamiento esencial.', 3.50, 'Acompañamientos y Panes', true),
('Lacha Paratha', 'Pan multicapa y hojaldrado, hecho con harina y mantequilla, asado en el tandoor. Crujiente y perfecto para absorber salsas.', 3.50, 'Acompañamientos y Panes', true),
('Roti / Chapati', 'Pan plano integral, fino y ligero, cocinado sin grasa en superficie tandoor. Alternativa más saludable y sencilla al naan.', 3.00, 'Acompañamientos y Panes', true);