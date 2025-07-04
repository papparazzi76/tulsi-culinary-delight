-- Insertar todos los platos faltantes de Entrantes
INSERT INTO menu_items (name, description, price, category, available) VALUES
-- Fritos
('Samosa Vegetal (2 uds)', 'Empanadilla de patata, cebolla y guisantes con especias.', 7.00, 'Entrantes', true),
('Samosa de Pollo (2 uds)', 'Triángulo frito relleno de pollo desmenuzado y marinado.', 7.50, 'Entrantes', true),
('Onion Bhaji', 'Aros de cebolla en tempura india especiada.', 7.00, 'Entrantes', true),
('Gobi 65', 'Coliflor frita al estilo Chennai, crujiente y especiada.', 7.00, 'Entrantes', true),
('Chicken 65', 'Trozos de pollo marinados en yogur y especias, fritos.', 7.50, 'Entrantes', true),
('Beef Cutlet (2 uds)', 'Croquetas de ternera y patata, aliñadas y fritas.', 7.50, 'Entrantes', true),
-- Tandoori
('Chicken Haryali', 'Dados de pollo marinados en yogur, menta y cilantro, asados al tandoor.', 8.00, 'Entrantes', true),
('Chicken Tikka', 'Trozos de pollo en tandoor marinados en yogur y especias.', 8.00, 'Entrantes', true),
('Sheek Kebab', 'Carne picada especiada, prensada y asada en horno de barro.', 9.00, 'Entrantes', true),
('Salmón Tikka (2 uds)', 'Salmón marinado en yogur, jengibre y ajo, cocinado en tandoor.', 9.00, 'Entrantes', true),
('Tandoori Brócoli', 'Floretes de brócoli marinados y asados en horno tandoor.', 8.50, 'Entrantes', true),

-- Especiales de Tulsi
('Pani Puri', 'Crujientes esferas de masa rellenas de patata y garbanzos, servidas con agua especiada.', 5.00, 'Especiales', true),
('Yogurt Gol Gappa', 'Pani puri rellenos de yogur cremoso, chutneys dulces y especias.', 6.00, 'Especiales', true),
('Dahi Bhale', 'Buñuelos suaves de lentejas cubiertos con yogur y chutneys dulces.', 6.00, 'Especiales', true),
('Samosa Chat', 'Samosa crujiente troceada, con yogur, garbanzos y chutneys.', 6.50, 'Especiales', true),
('Honey Chicken Wings', 'Alitas de pollo glaseadas en salsa dulce de miel, jugosas y doradas.', 10.50, 'Especiales', true),
('Tacos de Pollo (3 uds)', 'Tacos rellenos de pollo jugoso y sazonado, con salsas y hierbas frescas.', 12.00, 'Especiales', true),

-- Principales adicionales
('Chicken Curry', 'Curry de pollo tradicional con especias aromáticas y salsa de tomate.', 15.50, 'Principales', true),
('Lamb Curry', 'Cordero tierno cocinado en salsa especiada con cebolla y tomate.', 16.50, 'Principales', true),
('Beef Curry', 'Ternera en curry con especias robustas y salsa cremosa.', 16.50, 'Principales', true),
('Fish Curry', 'Curry de pescado al estilo sureño con leche de coco y especias.', 17.50, 'Principales', true),
('Prawn Curry', 'Gambas en curry con especias suaves y salsa de coco.', 18.50, 'Principales', true),
('Butter Chicken', 'Pollo en salsa cremosa de tomate y mantequilla, ligeramente dulce.', 16.50, 'Principales', true),
('Chicken Korma', 'Pollo en salsa suave de yogur, almendras y especias dulces.', 16.50, 'Principales', true),
('Lamb Vindaloo', 'Cordero en curry picante con vinagre y especias de Goa.', 17.50, 'Principales', true),
('Beef Madras', 'Ternera en curry picante al estilo Madras con tomate y especias.', 16.50, 'Principales', true),
('Chicken Jalfrezi', 'Pollo salteado con pimientos, cebolla y especias aromáticas.', 15.50, 'Principales', true),
('Lamb Saag', 'Cordero cocinado con espinacas y especias, cremoso y aromático.', 17.50, 'Principales', true),
('Fish Moilee', 'Pescado en curry suave de leche de coco al estilo Kerala.', 17.50, 'Principales', true),
('Prawn Masala', 'Gambas en salsa especiada de tomate y cebolla, con hierbas frescas.', 18.50, 'Principales', true),
('Chicken Chettinad', 'Pollo picante al estilo Chettinad con especias tostadas.', 16.50, 'Principales', true),
('Lamb Rogan Josh', 'Cordero en curry aromático con yogur y especias cachemiras.', 17.50, 'Principales', true),
('Beef Pepper Fry', 'Ternera salteada con pimienta negra y especias del sur de India.', 16.50, 'Principales', true),
('Fish Fry', 'Pescado frito con especias y hierbas, crujiente por fuera y tierno por dentro.', 16.50, 'Principales', true),
('Prawn Pepper Fry', 'Gambas salteadas con pimienta negra y especias aromáticas.', 18.50, 'Principales', true),
('Chicken Biryani', 'Arroz basmati con pollo marinado, cocinado a fuego lento con azafrán.', 14.50, 'Principales', true),
('Lamb Biryani', 'Biryani de cordero con arroz basmati y especias tradicionales.', 15.50, 'Principales', true),
('Beef Biryani', 'Arroz basmati con ternera marinada y especias aromáticas.', 15.50, 'Principales', true),
('Fish Biryani', 'Biryani de pescado con arroz basmati y especias suaves.', 16.50, 'Principales', true),
('Prawn Biryani', 'Arroz basmati con gambas y especias, cocinado al estilo tradicional.', 18.00, 'Principales', true);

-- Eliminar platos duplicados de Biryani en Principales
DELETE FROM menu_items WHERE name = 'Vegetable Biryani' AND category = 'Principales';