-- Insert missing "Especial de Tulsi" & "Entrantes" items
-- Note: 'Especial de Tulsi' items are categorized as 'Entrantes' for the takeaway system
INSERT INTO public.menu_items (name, description, price, category, available) VALUES
('Pani Puri', 'Crujientes esferas de masa rellenas de patata y garbanzos, servidas con agua especiada.', 5.00, 'Entrantes', true),
('Yogurt Gol Gappa', 'Pani puri rellenos de yogur cremoso, chutneys dulces y especias.', 6.00, 'Entrantes', true),
('Dahi Bhale', 'Buñuelos suaves de lentejas cubiertos con yogur y chutneys dulces.', 6.00, 'Entrantes', true),
('Samosa Chat', 'Samosa crujiente troceada, con yogur, garbanzos y chutneys.', 6.50, 'Entrantes', true),
('Honey Chicken Wings', 'Alitas de pollo glaseadas en salsa dulce de miel, jugosas y doradas.', 10.50, 'Entrantes', true),
('Tacos de Pollo (3 uds)', 'Tacos rellenos de pollo jugoso y sazonado, con salsas y hierbas frescas.', 12.00, 'Entrantes', true),
('Samosa Vegetal (2 uds)', 'Empanadilla de patata, cebolla y guisantes con especias.', 7.00, 'Entrantes', true),
('Samosa de Pollo (2 uds)', 'Triángulo frito relleno de pollo desmenuzado y marinado.', 7.50, 'Entrantes', true),
('Onion Bhaji', 'Aros de cebolla en tempura india especiada.', 7.00, 'Entrantes', true),
('Gobi 65', 'Coliflor frita al estilo Chennai, crujiente y especiada.', 7.00, 'Entrantes', true),
('Chicken 65', 'Trozos de pollo marinados en yogur y especias, fritos.', 7.50, 'Entrantes', true),
('Beef Cutlet (2 uds)', 'Croquetas de ternera y patata, aliñadas y fritas.', 7.50, 'Entrantes', true),
('Chicken Haryali', 'Dados de pollo marinados en yogur, menta y cilantro, asados al tandoor.', 8.00, 'Entrantes', true),
('Chicken Tikka', 'Trozos de pollo en tandoor marinados en yogur y especias.', 8.00, 'Entrantes', true),
('Sheek Kebab', 'Carne picada especiada, prensada y asada en horno de barro.', 9.00, 'Entrantes', true),
('Salmón Tikka (2 uds)', 'Salmón marinado en yogur, jengibre y ajo, cocinado en tandoor.', 9.00, 'Entrantes', true),
('Tandoori Brócoli', 'Floretes de brócoli marinados y asados en horno tandoor.', 8.50, 'Entrantes', true)
ON CONFLICT (name) DO NOTHING;

-- Insert missing "Principales - Pollo" items
INSERT INTO public.menu_items (name, description, price, category, available) VALUES
('Butter Chicken', 'Clásico del norte de la India: pollo tandoori cocinado en una suave y sedosa salsa de tomate, mantequilla, anacardos y fenogreco seco (kasuri methi), con un toque ligeramente dulce.', 14.50, 'Principales', true),
('Chicken Korma', 'Curry elegante y suave elaborado con pollo cocinado en una salsa rica de yogur, coco, anacardos y almendras, perfumado con cardamomo y canela, perfecto para los amantes de sabores cremosos y delicados.', 14.00, 'Principales', true),
('Malai Chicken', 'Trozos de pollo marinados en nata (malai), yogur y especias suaves, asados en el horno. Sabor cremoso, delicado y ligeramente dulce.', 14.00, 'Principales', true),
('Gradma Chicken Curry', 'Curry tradicional especiado con cebolla y tomate.', 14.00, 'Principales', true),
('Chicken Jalfrezi', 'Pollo salteado con pimientos, cebolla y especias.', 14.50, 'Principales', true),
('Chicken Karahi', 'Pollo al estilo Karahi, con tomate, pimiento y especias.', 14.50, 'Principales', true),
('Chicken Madras', 'Pollo en curry especiado y picante con toques de coco.', 14.00, 'Principales', true),
('Chicken Vindaloo', 'Versión india del plato de origen portugués: pollo marinado y cocinado con vinagre, chile rojo seco y especias intensas. Picante y profundo, típico de la región de Goa.', 14.50, 'Principales', true),
('Chicken Balti', 'Pollo especiado con salsa densa al estilo Balti. Se cocina a fuego fuerte en un wok metálico llamado balti, con especias aromáticas, tomates y pimientos.', 14.50, 'Principales', true),
('Chicken Saag', 'Estofado de pollo cocinado lentamente con espinacas frescas, ajo y jengibre, en una salsa verde especiada con comino, clavo y un toque de garam masala.', 14.50, 'Principales', true),
('Chicken Dopiaza', 'Pollo guisado con doble cantidad de cebolla y especias.', 14.50, 'Principales', true)
ON CONFLICT (name) DO NOTHING;

-- Insert missing "Principales - Cordero" items
INSERT INTO public.menu_items (name, description, price, category, available) VALUES
('Lamb Shank', 'Pierna de cordero cocinada lentamente hasta quedar melosa, bañada en una salsa rica en cebolla, tomate, cardamomo y especias tradicionales. Un plato reconfortante.', 16.50, 'Principales', true),
('Cordero Tikka Masala', 'Dados de cordero marinados y asados al horno, servidos en una salsa cremosa de tomate con un matiz especiado suave.', 16.50, 'Principales', true),
('Cordero Korma', 'Cordero tierno en una salsa cremosa y aromática de yogur, coco y frutos secos, con especias dulces como canela y cardamomo.', 16.50, 'Principales', true),
('Cordero Curry', 'Un clásico curry al estilo indio: cordero cocido en una salsa especiada (incluyendo cúrcuma, comino, cilantro, ajo y jengibre), con base de tomate y cebolla. Ideal para acompañar con arroz o pan naan.', 16.00, 'Principales', true),
('Cordero Jalfrezi', 'Origen bengalí, se caracteriza por su técnica de hot-fry: el cordero se fríe rápidamente junto con pimientos, cebolla, tomate y chiles, resultando en una preparación jugosa, sabor agri-dulce y más seca que un curry típico.', 16.50, 'Principales', true),
('Cordero Karahi', 'Cocinado en un karahi (wok indio) con abundante jengibre, ajo, tomate y especias, dando una salsa espesa y ''jammy''. Tiene una textura intensa y sabor vibrante.', 16.50, 'Principales', true),
('Cordero Madras', 'Curry del sur de la India, conocido por su sabor fuerte y picante gracias al uso generoso de guindilla seca, cúrcuma, curry leaves y a una base de cuerpo medio a abundante.', 16.50, 'Principales', true),
('Cordero Vindaloo', 'Curry picante y profundo de cordero, cocinado con vinagre, ajo, chile rojo seco y una mezcla intensa de especias al estilo de Goa. Picante y vibrante.', 16.50, 'Principales', true),
('Cordero Balti', 'Plato originario de la región de Baltustan y popularizado en Reino Unido. El cordero se cocina a fuego fuerte en un wok metálico llamado balti, con especias aromáticas, tomates y pimientos. Se sirve normalmente con pan naan o arroz.', 16.50, 'Principales', true),
('Cordero Saag', '''Saag'' significa hojas verdes. En este plato, el cordero se guisa lentamente junto con espinacas y especias tradicionales como comino, ajo y jengibre, dando como resultado una salsa cremosa y nutritiva.', 16.50, 'Principales', true),
('Cordero Dopiaza', '''Dopiaza'' significa literalmente ''doble cebolla''. El plato combina cordero tierno cocinado con cebolla en dos etapas: parte se cocina en la salsa especiada y parte se incorpora al final, dándole textura y un dulzor suave.', 16.50, 'Principales', true)
ON CONFLICT (name) DO NOTHING;

-- Insert missing "Principales - Ternera" items
INSERT INTO public.menu_items (name, description, price, category, available) VALUES
('Ternera Tikka Masala', 'Troceado de ternera marinado en yogur con especias como comino, cilantro, jengibre y cúrcuma, luego asado y cocinado en una salsa cremosa de tomate, nata y masala. De sabor aromático, ligeramente picante y muy popular.', 15.50, 'Principales', true),
('Ternera Korma', 'Estofado suave de ternera al estilo mughal con salsa espesa a base de yogur, leche de coco o nata, frutos secos (almendras u otros) y especias dulces como comino, cardamomo y clavo. Cremoso, delicado y reconfortante.', 15.50, 'Principales', true),
('Ternera Curry', 'Preparación tradicional de ternera en salsa especiada con tomate, cebolla, ajo y jengibre; puede ajustarse de suave a picante. Es el estilo más común y versátil de curry indio.', 15.50, 'Principales', true),
('Ternera Jalfrezi', 'Ternera salteada a fuego vivo con pimientos, cebolla, tomate y chiles, muy jugosa y con poca salsa. Similar al estilo de hot-fry, más seca e intensa.', 15.50, 'Principales', true),
('Ternera Karahi', 'Cocinada en un karahi (wok metálico), con jengibre, ajo, tomate y especias. Salsa espesa ''jammy'' y sabor vibrante, posiblemente un toque picante.', 15.50, 'Principales', true),
('Ternera Madras', 'Curry del sur de la India con especias como guindilla seca, cúrcuma y hojas de curry, color rojizo intenso.', 15.50, 'Principales', true),
('Ternera Vindaloo', 'Plato picante originario de Goa, adaptado del portugués ''vinha d''alhos'' (vino y ajo). Carne marinada en vinagre, ajo y especias (pimentón, comino, cardamomo) y cocinada en salsa espesa. Se le conoce como ''el rey de los currys''.', 15.50, 'Principales', true),
('Ternera Balti', 'Cocida rápidamente en wok metálico balti, con salsa ligera de tomate, ajo y especias. Muy aromática y sabrosa, con un toque más seco que los currys estándar.', 15.50, 'Principales', true),
('Ternera Saag', 'Ternera guisada lentamente con hojas verdes (espinacas o mostaza), especias suaves como ajo, jengibre y comino. Salsa cremosa de sabor herbáceo y textura más ligera.', 15.50, 'Principales', true),
('Ternera Dopiaza', '''Dobles cebollas'': parte se cocina en la base, parte se añade al final, aportando dulzura y textura. Curry de intensidad media, aromático y muy equilibrado.', 15.50, 'Principales', true)
ON CONFLICT (name) DO NOTHING;

-- Insert missing "Principales - Marisco" items
INSERT INTO public.menu_items (name, description, price, category, available) VALUES
('Fish Tikka Masala', 'Pez marinado en yogur y especias, asado o salteado y luego sumergido en una cremosa salsa de tomate y cebolla.', 16.00, 'Principales', true),
('Fish Kerala Curry', 'Estilo tradicional de Kerala con pescado guisado en una salsa de coco suave, cocinada con curry, jengibre, tomate y hojas de curry. De sabor suave y cremoso.', 17.00, 'Principales', true),
('Fish Korma', 'Similar al korma de carne: pescado tierno en salsa cremosa de frutos secos y especias delicadas (yogur o leche de coco). Textura suave y con un toque dulce.', 16.00, 'Principales', true),
('Fish Masala', 'Variación con pescado en salsa especiada (masala), con base de tomate, cebolla, jengibre y ajo. Sabor vibrante, más ligero que el tikka masala.', 16.00, 'Principales', true),
('Fish Madras', 'Curry sur indio de sabor intenso y picante gracias a guindillas secas, cúrcuma y especias. Salsa roja bien especiada que realza mucho el sabor del pescado.', 16.00, 'Principales', true),
('Fish Vindaloo', 'Adopta la versión de Goa: pescado marinado en vinagre, ajo, chiles y especias. Muy picante, con un toque ácido fuerte característico.', 16.00, 'Principales', true),
('Fish Moilee', 'Estofado de pescado típico de Kerala en leche de coco, suave, ligeramente especiado y cremoso. Es un plato reconfortante.', 16.00, 'Principales', true),
('Kerala Prawns Curry', 'Camarones cocinados al estilo Kerala en salsa de coco, curry, jengibre y tomate. Similar al fish moilee, cremoso y aromático.', 17.50, 'Principales', true),
('Prawns Curry', 'Gambas en salsa de curry tradicional, especiada con una base de tomate, cebolla, ajo y jengibre. Intensidad variable según picante.', 17.00, 'Principales', true),
('Malai Prawns', 'Gambas en salsa suave y cremosa (malai = crema), elaborada con nata o leche de coco, especias ligeras y posiblemente frutos secos. Suave y reconfortante.', 17.00, 'Principales', true),
('Prawns Korma', 'Versión de gambas en korma: salsa rica de yogur o coco y frutos secos. Apuntado a un sabor dulce y suave.', 17.00, 'Principales', true),
('Prawns Madras', 'Gambas en un curry al estilo Madras: muy picante, con guindillas, cúrcuma y especias sureñas. Color rojo intenso y sabor fuerte.', 17.00, 'Principales', true),
('Prawns Vindaloo', 'Gambas en versión picante y ácida tipo Goa: marinado en vinagre, ajo y chiles. Picante pronunciado con fondo agrio.', 17.00, 'Principales', true),
('Prawns Moilee', 'Camarones cocidos en una salsa de coco suave al estilo Kerala moilee, con jengibre, ajo y hojas de curry. Cremoso y ligeramente especiado.', 17.00, 'Principales', true)
ON CONFLICT (name) DO NOTHING;

-- Insert missing "Principales - Tandoori" items
INSERT INTO public.menu_items (name, description, price, category, available) VALUES
('Chicken Tikka (6 uds)', 'Dados de pechuga de pollo marinados en yogur, especias (comino, cilantro, pimentón) y zumo de limón, asados en el tandoor. Sabor ahumado, jugoso y ligeramente especiado.', 16.00, 'Principales', true),
('Malai Tikka', 'Pollo marinado en nata (malai), queso fresco y especias suaves, luego asado en el tandoor. Versión más cremosa y menos picante que el clásico tikka, ideal para quienes prefieren un toque delicado.', 16.00, 'Principales', true),
('Salmon Tikka (4 uds)', 'Trozos de salmón fresco marinados en yogur, hierbas y especias aromáticas, luego asados al tandoor. Sabor suave, textura jugosa y un toque ahumado. Ideal para los amantes del pescado.', 17.00, 'Principales', true),
('King Prawn Tandoori', 'Langostinos gigantes marinados en especias, yogur y limón, asados al horno tandoor. Textura firme y jugosa, sabor marino intenso y especiado, con el clásico toque ahumado del tandoor.', 20.50, 'Principales', true)
ON CONFLICT (name) DO NOTHING;
