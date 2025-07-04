-- Insert all missing menu items from the restaurant menu into the database

-- Biryani dishes
INSERT INTO public.menu_items (name, description, price, category, available) VALUES
('Lamb Lakhnau Biryani', 'Arroz basmati cocinado a fuego lento con cordero marinado y azafrán.', 15.50, 'Biryani', true),
('Chicken Hyderabadi Biryani', 'Famoso biryani picante con arroz y pollo marinado en yogur.', 14.50, 'Biryani', true),
('Beef Punjabi Biryani', 'Biryani del norte de India con ternera y especias robustas.', 15.50, 'Biryani', true),
('Prawns Biryani', 'Biryani de gambas con arroz basmati, especias y cebolla frita.', 18.00, 'Biryani', true),
('Veg Biryani', 'Versión vegetariana con arroz, verduras mixtas y frutos secos.', 13.50, 'Biryani', true)
ON CONFLICT (name) DO NOTHING;

-- Vegetable dishes
INSERT INTO public.menu_items (name, description, price, category, available) VALUES
('Mix Vegetable', 'Verduras variadas salteadas y cocinadas con especias suaves en salsa ligera. Plato equilibrado y saludable.', 12.50, 'Vegetales', true),
('Vegetable Stew', 'Guiso de verduras al estilo del sur de la India, cocinado en leche de coco con jengibre, ajo y especias suaves. Cremoso y reconfortante.', 12.50, 'Vegetales', true),
('Mango Mix Vegetable', 'Verduras mixtas en salsa especiada con un toque de mango, que aporta un sabor dulce y afrutado muy especial.', 12.50, 'Vegetales', true),
('Bombe Potato', 'Patatas especiadas al estilo Bombay, salteadas con mostaza, cúrcuma y hierbas. Ligeramente picantes y muy aromáticas.', 12.50, 'Vegetales', true),
('Mushroom Curry', 'Champiñones cocinados en salsa especiada de tomate, cebolla y ajo. Textura suave y sabor terroso, con especias medias.', 12.50, 'Vegetales', true),
('Palak Paneer', 'Espinacas cocinadas con queso fresco (paneer), ajo y especias. Plato cremoso, suave y muy popular en la cocina india vegetariana.', 13.50, 'Vegetales', true),
('Aloo Palak', 'Espinacas y patatas cocinadas juntas con ajo, cebolla y especias suaves. Plato ligero y lleno de sabor verde.', 12.50, 'Vegetales', true),
('Channa Masala', 'Garbanzos guisados en salsa especiada de tomate y cebolla, con comino, cilantro y un toque de limón. Muy aromático y nutritivo.', 12.50, 'Vegetales', true),
('Dal Tadka', 'Lentejas amarillas cocinadas con cebolla, ajo y especias, terminadas con un sofrito de ghee (mantequilla clarificada) y hierbas. Sabor suave y muy tradicional.', 12.50, 'Vegetales', true),
('Dal Makhni', 'Lentejas negras y alubias cocidas lentamente en salsa cremosa con mantequilla y especias suaves. Textura densa y muy reconfortante.', 13.00, 'Vegetales', true),
('Paneer Butter Masala', 'Queso fresco (paneer) en salsa cremosa de tomate, mantequilla y especias dulces como fenogreco. Suave, ligeramente dulce y muy aromático.', 14.00, 'Vegetales', true),
('Achari Baingan', 'Berenjenas cocinadas al estilo achari, es decir, con especias de encurtido (hinojo, mostaza, comino). Sabor intenso y picante, con toques ácidos.', 13.00, 'Vegetales', true),
('Baingan Moilee', 'Berenjenas guisadas al estilo Kerala, en salsa suave de leche de coco con especias. Plato cremoso y ligeramente especiado.', 13.00, 'Vegetales', true),
('Malai Kofta', 'Albóndigas de queso y patata en salsa cremosa de tomate y frutos secos, ligeramente dulce. Plato elegante, suave y muy popular en celebraciones.', 13.00, 'Vegetales', true)
ON CONFLICT (name) DO NOTHING;

-- Rice and bread accompaniments
INSERT INTO public.menu_items (name, description, price, category, available) VALUES
('Kashmiri Pulao', 'Arroz basmati con frutos secos, frutas y especias suaves.', 10.50, 'Acompañamientos', true),
('Pulao Rice', 'Arroz basmati salteado con especias suaves.', 7.50, 'Acompañamientos', true),
('Boil Rice', 'Arroz basmati blanco hervido, simple y esponjoso.', 7.00, 'Acompañamientos', true),
('Cheese Naan', 'Pan tierno relleno de queso fundido, horneado en el tandoor.', 4.50, 'Acompañamientos', true),
('Cheese Garlic Naan', 'Naan relleno de queso con ajo fresco, dorado en el tandoor.', 5.00, 'Acompañamientos', true),
('Garlic Naan', 'Clásico naan con ajo fresco y mantequilla.', 4.00, 'Acompañamientos', true),
('Peshawari Naan', 'Pan naan relleno de frutos secos, coco y frutas confitadas.', 5.00, 'Acompañamientos', true),
('Tandoori Naan', 'Versión tradicional del pan naan simple, suave y tierno.', 3.50, 'Acompañamientos', true),
('Roti / Chapati', 'Pan plano integral, fino y ligero, sin grasa.', 3.00, 'Acompañamientos', true)
ON CONFLICT (name) DO NOTHING;

-- Desserts
INSERT INTO public.menu_items (name, description, price, category, available) VALUES
('Malai / Mango Kulfi', 'Helado tradicional indio, cremoso y denso. Con mango o malai.', 5.00, 'Postres', true),
('Gulab Jamun', 'Deliciosas bolitas de leche fritas, bañadas en un jarabe dulce perfumado con agua de rosas y cardamomo.', 5.50, 'Postres', true),
('Mango Pudding', 'Suave y refrescante pudín de mango, de textura cremosa y sabor afrutado, ideal para los amantes del mango.', 5.00, 'Postres', true),
('Crema de Mango', 'Postre cremoso y ligero elaborado con pulpa de mango natural, un toque de nata y decorado con frutas frescas.', 5.00, 'Postres', true),
('Tarta de Queso', 'Clásica y cremosa tarta de queso.', 6.00, 'Postres', true),
('Gajjar Ka Halwa', 'Postre tradicional a base de zanahoria rallada cocida lentamente en leche, con azúcar, frutos secos.', 5.50, 'Postres', true),
('Sorbete (Limón, Naranja)', 'Refrescante sorbete disponible en sabores de limón o naranja.', 5.00, 'Postres', true)
ON CONFLICT (name) DO NOTHING;

-- Beverages
INSERT INTO public.menu_items (name, description, price, category, available) VALUES
('Mango Lassi', 'Batido tradicional indio a base de yogur y mango natural, cremoso y refrescante, ideal para acompañar platos especiados.', 5.00, 'Bebidas', true),
('Sweet Lassi', 'Bebida dulce y suave hecha con yogur batido, con un toque de azúcar, un clásico indio.', 5.00, 'Bebidas', true),
('Chai (con leche)', 'Té especiado cocido con leche y aromatizado con cardamomo, jengibre y canela. Reconfortante y lleno de sabor.', 3.00, 'Bebidas', true),
('Café', 'Café recién hecho.', 3.00, 'Bebidas', true),
('Infusión', 'Selección de infusiones de hierbas.', 2.50, 'Bebidas', true)
ON CONFLICT (name) DO NOTHING;