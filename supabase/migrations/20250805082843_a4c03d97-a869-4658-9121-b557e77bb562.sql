-- Eliminar bebidas existentes que no coinciden con los nombres exactos
DELETE FROM menu_items WHERE category = 'Bebidas';

-- Insertar todas las bebidas con los nombres exactos del menú
INSERT INTO menu_items (name, description, price, category, available) VALUES
-- Bebidas Indias
('MANGO LASSI', 'Batido de yogur y mango.', 5.00, 'Bebidas', true),
('SWEET LASSI', 'Batido de yogur dulce.', 4.50, 'Bebidas', true),
('SALT LASSI', 'Batido de yogur salado.', 4.50, 'Bebidas', true),

-- Cervezas
('COBRA (DE INDIA)', 'Cerveza india.', 4.00, 'Bebidas', true),
('MAHOU (NACIONAL)', 'Cerveza nacional.', 3.00, 'Bebidas', true),
('MAHOU ZERO TOSTADA', 'Cerveza sin alcohol tostada.', 3.00, 'Bebidas', true),
('RADLER', 'Cerveza con limón.', 3.00, 'Bebidas', true),

-- Vino Tinto
('PROTOS ROBLE', '2022. 750ml', 17.00, 'Bebidas', true),
('JOTA FLORES', 'Roble 9 meses. 750 ml', 15.00, 'Bebidas', true),
('PINNA FIDELIS', '2021 vendimia manual 750 ml', 16.00, 'Bebidas', true),
('CAMINO DE CASTILLA', 'Roble 2023 750ml', 14.00, 'Bebidas', true),
('CARRAMIMBRE', 'Roble 2023 750ml.', 21.00, 'Bebidas', true),

-- Vino Rosado y Verdejo
('SINFO', '750 ml', 14.00, 'Bebidas', true),
('SALVUEROS', '', 14.00, 'Bebidas', true),
('GILDA', 'verdejo 2023', 14.00, 'Bebidas', true),
('MARTIVILL', 'Verdejo 2023 750ml', 16.00, 'Bebidas', true),

-- Refrescos
('COCA-COLA', '', 3.00, 'Bebidas', true),
('COCA-COLA ZERO', '', 3.00, 'Bebidas', true),
('FANTA NARANJA', '', 3.00, 'Bebidas', true),
('AQUARIUS LIMÓN', '', 3.00, 'Bebidas', true),
('AGUA CON GAS', '', 3.00, 'Bebidas', true),
('AGUA', '', 2.50, 'Bebidas', true),

-- Licores y Copas
('MAGNO', '', 2.50, 'Bebidas', true),
('VETERANO', '', 2.50, 'Bebidas', true),
('HIERBAS', '', 2.50, 'Bebidas', true),
('PACHARÁN', '', 2.50, 'Bebidas', true),
('TINTO BLANCO Y ROSADO', '', 3.50, 'Bebidas', true),
('CHIVAS REGAL', '', 7.00, 'Bebidas', true),
('BLACK LABEL', '', 6.50, 'Bebidas', true),
('BALLATINES', '', 6.50, 'Bebidas', true),
('RED LABEL', '', 6.00, 'Bebidas', true),
('DYC', '', 5.00, 'Bebidas', true),
('J&B', '', 6.00, 'Bebidas', true),
('BOMBAY DRY GIN', '', 6.00, 'Bebidas', true),
('BEEFEATER', '', 6.00, 'Bebidas', true);