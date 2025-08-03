-- Clear existing menu items to avoid duplicates and start fresh
DELETE FROM menu_items;

-- Insert all Entrantes items
-- Especial de Tulsi subcategory
INSERT INTO menu_items (name, description, price, category, available) VALUES
('Pani Puri', 'Crujientes esferas de masa rellenas de patata y garbanzos, servidas con agua especiada.', 5.00, 'Entrantes', true),
('Yogurt Gol Gappa', 'Pani puri rellenos de yogur cremoso, chutneys dulces y especias.', 6.00, 'Entrantes', true),
('Dahi Bhale', 'Buñuelos suaves de lentejas cubiertos con yogur y chutneys dulces.', 6.00, 'Entrantes', true),
('Samosa Chat', 'Samosa crujiente troceada, con yogur, garbanzos y chutneys.', 6.50, 'Entrantes', true),
('Honey Chicken Wings', 'Alitas de pollo glaseadas en salsa dulce de miel, jugosas y doradas.', 10.50, 'Entrantes', true),
('Tacos de Pollo (3 uds)', 'Tacos rellenos de pollo jugoso y sazonado, con salsas y hierbas frescas.', 12.00, 'Entrantes', true),

-- Fritos subcategory
('Samosa Vegetal (2 uds)', 'Empanadilla triangular relleno de patata, cebolla y guisantes con jengibre, comino y garam masala, acompañado de chutneys.', 7.00, 'Entrantes', true),
('Samosa de Pollo (2 uds)', 'Triángulo frito relleno de pollo desmenuzado marinado con jengibre, cilantro y especias suaves, resultando en un bocado jugoso.', 7.50, 'Entrantes', true),
('Samosa de Carne (2 uds)', 'Empanadilla con una mezcla sazonada de carne picada y cebolla, enriquecida con coriandro, comino y chile, que aporta un contraste jugoso.', 7.50, 'Entrantes', true),
('Pakora Vegetal (4 uds)', 'Frituras crujientes de verduras variadas (cebolla, patata, espinacas, coliflor) rebozadas en una mezcla de harina de garbanzo y especias como cúrcuma y comino, un snack tradicional.', 7.00, 'Entrantes', true),
('Onion Bhaji', 'Aros de cebolla rebozados en tempura india especiada con comino y cúrcuma, fritos hasta lograr una textura crujiente y un sabor dulce y suave.', 7.00, 'Entrantes', true),
('Cheese Roll (2 uds)', 'Delicados rollitos fritos rellenos de una mezcla cremosa de quesos fundidos, salpicados con especias suaves.', 7.50, 'Entrantes', true),
('Gobi 65', 'Coliflor marinada al estilo Chennai (1965), rebozada con un rebozado especiado y luego salteada con curry leaves, ajo y guindillas para un resultado crujiente.', 7.00, 'Entrantes', true),
('Chicken 65', 'Trozos de pollo marinados en yogur, jengibre, ajo, chiles rojos y especias rebozados ligera y fritos hasta quedar dorados.', 7.50, 'Entrantes', true),
('Fish 65', 'Pescado blanco marinado, frito hasta lograr una capa crujiente y luego salteado con especias, ácil y aromático; ideal como aperitivo o acompañamiento de platos principales jugosos.', 7.50, 'Entrantes', true),
('Beef Cutlet (2 uds)', 'Croquetas de ternera y patata, aliñadas con cúrcuma, comino y cilantro empanadas y fritas hasta dorado, con un corazón meloso y aromático ideal como entrante crujiente.', 7.50, 'Entrantes', true),

-- Tandoori subcategory
('Chicken Haryali', 'Dados de pollo marinados en una mezcla de yogur, menta, cilantro y especias verdes, asados en el horno tandoor.', 8.00, 'Entrantes', true),
('Chicken Tikka', 'Trozos de pollo en tandoor previamente marinados en yogur y especias tradicionales, resultando jugosos y tiernos.', 8.00, 'Entrantes', true),
('Chicken Reshmi Kebab', 'Brochetas suaves, cremosas gracias a anacardos y crema, con especias delicadas que realzan la textura del pollo.', 8.00, 'Entrantes', true),
('Sheek Kebab', 'Carne picada especiada con cilantro, comino y chile, prensada y asada en horno de barro para una capa crujiente y centro tierno.', 9.00, 'Entrantes', true),
('Chicken Tandoori 1/4', 'Clásico muslo o pechuga marinado en especias y yogur, asado lentamente en tandoor, con piel ahumada y carne tierna.', 8.00, 'Entrantes', true),
('Salmón Tikka 2 uds', 'Trozos de salmón marinados en yogur, jengibre y ajo, cocinados en tandoor para mantener jugosidad y un ligero ahumado.', 9.00, 'Entrantes', true),
('Tandoori Brócoli', 'Floretes de brócoli marinados en yogur y especias, asados en horno tandoor hasta lograr bordes caramelizados y un interior tierno.', 8.50, 'Entrantes', true);

-- Insert all Principales items
-- Pollo subcategory
INSERT INTO menu_items (name, description, price, category, available) VALUES
('Butter Chicken', 'Clásico del norte de la India: pollo tandoori cocinado en una suave y sedosa salsa de tomate, mantequilla, anacardos y fenogreco seco (kasuri methi), con un toque ligeramente dulce.', 14.50, 'Principales', true),
('Chicken Tikka Masala', 'Pollo asado en horno tandoor y servido en una cremosa salsa de tomate y almendras, con un delicado equilibrio entre dulzor y especias aromáticas, ideal para quienes buscan un curry suave y sabroso.', 14.50, 'Principales', true),
('Chicken Korma', 'Curry elegante y suave elaborado con pollo cocinado en una salsa rica de yogur, coco, anacardos y almendras, perfumado con cardamomo y canela, perfecto para los amantes de sabores cremosos y delicados.', 14.00, 'Principales', true),
('Malai Chicken', 'Trozos de pollo marinados en nata (malai), yogur y especias suaves, asados en el horno. Sabor cremoso, delicado y ligeramente dulce.', 14.00, 'Principales', true),
('Gradma Chicken Curry', 'Curry tradicional especiado con cebolla y tomate.', 14.00, 'Principales', true),
('Chicken Jalfrezi', 'Pollo salteado con pimientos, cebolla y especias.', 14.50, 'Principales', true),
('Chicken Karahi', 'Pollo al estilo Karahi, con tomate, pimiento y especias.', 14.50, 'Principales', true),
('Chicken Madras', 'Pollo en curry especiado y picante con toques de coco.', 14.00, 'Principales', true),
('Chicken Vindaloo', 'Versión india del plato de origen portugués: pollo marinado y cocinado con vinagre, chile rojo seco y especias intensas. Picante y profundo, típico de la región de Goa.', 14.50, 'Principales', true),
('Chicken Balti', 'Pollo especiado con salsa densa al estilo Balti. Se cocina a fuego fuerte en un wok metálico llamado balti, con especias aromáticas, tomates y pimientos.', 14.50, 'Principales', true),
('Chicken Saag', 'Estofado de pollo cocinado lentamente con espinacas frescas, ajo y jengibre, en una salsa verde especiada con comino, clavo y un toque de garam masala.', 14.50, 'Principales', true),
('Chicken Dopiaza', 'Pollo guisado con doble cantidad de cebolla y especias.', 14.50, 'Principales', true),

-- Cordero subcategory
('Lamb Shank', 'Pierna de cordero cocinada lentamente hasta quedar melosa, bañada en una salsa rica en cebolla, tomate, cardamomo y especias tradicionales. Un plato reconfortante.', 16.50, 'Principales', true),
('Cordero Tikka Masala', 'Dados de cordero marinados y asados al horno, servidos en una salsa cremosa de tomate con un matiz especiado suave.', 16.50, 'Principales', true),
('Cordero Korma', 'Cordero tierno en una salsa cremosa y aromática de yogur, coco y frutos secos, con especias dulces como canela y cardamomo.', 16.50, 'Principales', true),
('Cordero Curry', 'Un clásico curry al estilo indio: cordero cocido en una salsa especiada (incluyendo cúrcuma, comino, cilantro, ajo y jengibre), con base de tomate y cebolla. Ideal para acompañar con arroz o pan naan.', 16.00, 'Principales', true),
('Cordero Jalfrezi', 'Origen bengalí, se caracteriza por su técnica de hot-fry: el cordero se fríe rápidamente junto con pimientos, cebolla, tomate y chiles, resultando en una preparación jugosa, sabor agri-dulce y más seca que un curry típico.', 16.50, 'Principales', true),
('Cordero Karahi', 'Cocinado en un karahi (wok indio) con abundante jengibre, ajo, tomate y especias, dando una salsa espesa y jammy. Tiene una textura intensa y sabor vibrante.', 16.50, 'Principales', true),
('Cordero Madras', 'Curry del sur de la India, conocido por su sabor fuerte y picante gracias al uso generoso de guindilla seca, cúrcuma, curry leaves y a una base de cuerpo medio a abundante.', 16.50, 'Principales', true),
('Cordero Vindaloo', 'Curry picante y profundo de cordero, cocinado con vinagre, ajo, chile rojo seco y una mezcla intensa de especias al estilo de Goa. Picante y vibrante.', 16.50, 'Principales', true),
('Cordero Balti', 'Plato originario de la región de Baltustan y popularizado en Reino Unido. El cordero se cocina a fuego fuerte en un wok metálico llamado balti, con especias aromáticas, tomates y pimientos. Se sirve normalmente con pan naan o arroz.', 16.50, 'Principales', true),
('Cordero Saag', 'Saag significa hojas verdes. En este plato, el cordero se guisa lentamente junto con espinacas y especias tradicionales como comino, ajo y jengibre, dando como resultado una salsa cremosa y nutritiva.', 16.50, 'Principales', true),
('Cordero Dopiaza', 'Dopiaza significa literalmente doble cebolla. El plato combina cordero tierno cocinado con cebolla en dos etapas: parte se cocina en la salsa especiada y parte se incorpora al final, dándole textura y un dulzor suave.', 16.50, 'Principales', true),

-- Ternera subcategory
('Ternera Tikka Masala', 'Troceado de ternera marinado en yogur con especias como comino, cilantro, jengibre y cúrcuma, luego asado y cocinado en una salsa cremosa de tomate, nata y masala. De sabor aromático, ligeramente picante y muy popular.', 15.50, 'Principales', true),
('Ternera Korma', 'Estofado suave de ternera al estilo mughal con salsa espesa a base de yogur, leche de coco o nata, frutos secos (almendras u otros) y especias dulces como comino, cardamomo y clavo. Cremoso, delicado y reconfortante.', 15.50, 'Principales', true),
('Ternera Curry', 'Preparación tradicional de ternera en salsa especiada con tomate, cebolla, ajo y jengibre; puede ajustarse de suave a picante. Es el estilo más común y versátil de curry indio.', 15.50, 'Principales', true),
('Ternera Jalfrezi', 'Ternera salteada a fuego vivo con pimientos, cebolla, tomate y chiles, muy jugosa y con poca salsa. Similar al estilo de hot-fry, más seca e intensa.', 15.50, 'Principales', true),
('Ternera Karahi', 'Cocinada en un karahi (wok metálico), con jengibre, ajo, tomate y especias. Salsa espesa jammy y sabor vibrante, posiblemente un toque picante.', 15.50, 'Principales', true),
('Ternera Madras', 'Curry del sur de la India con especias como guindilla seca, cúrcuma y hojas de curry, color rojizo intenso.', 15.50, 'Principales', true),
('Ternera Vindaloo', 'Plato picante originario de Goa, adaptado del portugués vinha d alhos (vino y ajo). Carne marinada en vinagre, ajo y especias (pimentón, comino, cardamomo) y cocinada en salsa espesa. Se le conoce como el rey de los currys.', 15.50, 'Principales', true),
('Ternera Balti', 'Cocida rápidamente en wok metálico balti, con salsa ligera de tomate, ajo y especias. Muy aromática y sabrosa, con un toque más seco que los currys estándar.', 15.50, 'Principales', true),
('Ternera Saag', 'Ternera guisada lentamente con hojas verdes (espinacas o mostaza), especias suaves como ajo, jengibre y comino. Salsa cremosa de sabor herbáceo y textura más ligera.', 15.50, 'Principales', true),
('Ternera Dopiaza', 'Dobles cebollas: parte se cocina en la base, parte se añade al final, aportando dulzura y textura. Curry de intensidad media, aromático y muy equilibrado.', 15.50, 'Principales', true),

-- Perca subcategory
('Fish Tikka Masala', 'Pez marinado en yogur y especias, asado o salteado y luego sumergido en una cremosa salsa de tomate y cebolla.', 16.00, 'Principales', true),
('Fish Kerala Curry', 'Estilo tradicional de Kerala con pescado guisado en una salsa de coco suave, cocinada con curry, jengibre, tomate y hojas de curry. De sabor suave y cremoso.', 17.00, 'Principales', true),
('Fish Korma', 'Similar al korma de carne: pescado tierno en salsa cremosa de frutos secos y especias delicadas (yogur o leche de coco). Textura suave y con un toque dulce.', 16.00, 'Principales', true),
('Fish Masala', 'Variación con pescado en salsa especiada (masala), con base de tomate, cebolla, jengibre y ajo. Sabor vibrante, más ligero que el tikka masala.', 16.00, 'Principales', true),
('Fish Madras', 'Curry sur indio de sabor intenso y picante gracias a guindillas secas, cúrcuma y especias. Salsa roja bien especiada que realza mucho el sabor del pescado.', 16.00, 'Principales', true),
('Fish Vindaloo', 'Adopta la versión de Goa: pescado marinado en vinagre, ajo, chiles y especias. Muy picante, con un toque ácido fuerte característico.', 16.00, 'Principales', true),
('Fish Moilee', 'Estofado de pescado típico de Kerala en leche de coco, suave, ligeramente especiado y cremoso. Es un plato reconfortante.', 16.00, 'Principales', true),

-- Gambas subcategory
('Kerala Prawns Curry', 'Camarones cocinados al estilo Kerala en salsa de coco, curry, jengibre y tomate. Similar al fish moilee, cremoso y aromático.', 17.50, 'Principales', true),
('Prawns Curry', 'Gambas en salsa de curry tradicional, especiada con una base de tomate, cebolla, ajo y jengibre. Intensidad variable según picante.', 17.00, 'Principales', true),
('Malai Prawns', 'Gambas en salsa suave y cremosa (malai = crema), elaborada con nata o leche de coco, especias ligeras y posiblemente frutos secos. Suave y reconfortante.', 17.00, 'Principales', true),
('Prawns Korma', 'Versión de gambas en korma: salsa rica de yogur o coco y frutos secos. Apuntado a un sabor dulce y suave.', 17.00, 'Principales', true),
('Prawns Madras', 'Gambas en un curry al estilo Madras: muy picante, con guindillas, cúrcuma y especias sureñas. Color rojo intenso y sabor fuerte.', 17.00, 'Principales', true),
('Prawns Vindaloo', 'Gambas en versión picante y ácida tipo Goa: marinado en vinagre, ajo y chiles. Picante pronunciado con fondo agrio.', 17.00, 'Principales', true),
('Prawns Moilee', 'Camarones cocidos en una salsa de coco suave al estilo Kerala moilee, con jengibre, ajo y hojas de curry. Cremoso y ligeramente especiado.', 17.00, 'Principales', true),

-- Tandoori subcategory
('Chicken Tikka (6 uds)', 'Dados de pechuga de pollo marinados en yogur, especias (comino, cilantro, pimentón) y zumo de limón, asados en el tandoor. Sabor ahumado, jugoso y ligeramente especiado.', 16.00, 'Principales', true),
('Malai Tikka', 'Pollo marinado en nata (malai), queso fresco y especias suaves, luego asado en el tandoor. Versión más cremosa y menos picante que el clásico tikka, ideal para quienes prefieren un toque delicado.', 16.00, 'Principales', true),
('Chicken Tandoori 1/2', 'Medio pollo (con hueso) marinado en yogur, especias intensas y zumo de limón, cocinado en el horno tandoor. Sabor potente, exterior crujiente y carne tierna por dentro, con el toque ahumado característico.', 15.50, 'Principales', true),
('Salmon Tikka (4 uds)', 'Trozos de salmón fresco marinados en yogur, hierbas y especias aromáticas, luego asados al tandoor. Sabor suave, textura jugosa y un toque ahumado. Ideal para los amantes del pescado.', 17.00, 'Principales', true),
('King Prawn Tandoori', 'Langostinos gigantes marinados en especias, yogur y limón, asados al horno tandoor. Textura firme y jugosa, sabor marino intenso y especiado, con el clásico toque ahumado del tandoor.', 20.50, 'Principales', true);

-- Insert all Biryani items
INSERT INTO menu_items (name, description, price, category, available) VALUES
('Lamb Lakhnau Biryani', 'Arroz basmati cocinado a fuego lento con cordero marinado y azafrán.', 15.50, 'Biryani', true),
('Chicken Hyderabadi Biryani', 'Famoso biryani picante con arroz y pollo marinado en yogur.', 14.50, 'Biryani', true),
('Beef Punjabi Biryani', 'Biryani del norte de India con ternera y especias robustas.', 15.50, 'Biryani', true),
('Prawns Biryani', 'Biryani de gambas con arroz basmati, especias y cebolla frita.', 18.00, 'Biryani', true),
('Veg Biryani', 'Versión vegetariana con arroz, verduras mixtas y frutos secos.', 13.50, 'Biryani', true);

-- Insert all Vegetales items
INSERT INTO menu_items (name, description, price, category, available) VALUES
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
('Malai Kofta', 'Albóndigas de queso y patata en salsa cremosa de tomate y frutos secos, ligeramente dulce. Plato elegante, suave y muy popular en celebraciones.', 13.00, 'Vegetales', true);

-- Insert all Acompañamientos y Panes items
INSERT INTO menu_items (name, description, price, category, available) VALUES
-- Arroces
('Kashmiri Pulao', 'Arroz basmati aromático cocinado con frutos secos, frutas confitadas y especias suaves. Sabor dulce y fragante, típico de la región de Cachemira. Ideal con platos suaves o cremosos.', 10.50, 'Acompañamientos y Panes', true),
('Pulao Rice', 'Arroz basmati salteado con especias suaves como comino, clavo y laurel. Ligero, aromático y perfecto como base para currys.', 7.50, 'Acompañamientos y Panes', true),
('Egg Fried Rice', 'Arroz basmati salteado al estilo indo-chino con huevo, cebolla y especias. Sabor suave y textura suelta. Buen acompañante de platos picantes o con especias.', 9.50, 'Acompañamientos y Panes', true),
('Boil Rice', 'Arroz basmati blanco hervido, simple y esponjoso. La opción más neutra para acompañar cualquier curry.', 7.00, 'Acompañamientos y Panes', true),

-- Panes al Tandoor
('Cheese Naan', 'Pan tierno relleno de queso fundido, horneado en el tandoor. Ideal para acompañar salsas cremosas.', 4.50, 'Acompañamientos y Panes', true),
('Cheese Garlic Naan', 'Naan relleno de queso con ajo fresco, dorado en el tandoor. Cremoso y aromático, perfecto para platos intensos.', 5.00, 'Acompañamientos y Panes', true),
('Garlic Naan', 'Clásico naan con ajo fresco y mantequilla, ligeramente crujiente y muy fragante.', 4.00, 'Acompañamientos y Panes', true),
('Onion Naan', 'Naan relleno de cebolla finamente picada, asado en el tandoor. Sabor dulce y tostado.', 4.00, 'Acompañamientos y Panes', true),
('Peshawari Naan', 'Pan dulce relleno de frutos secos, coco y frutas confitadas. Dulce y aromático, ideal con currys picantes.', 5.00, 'Acompañamientos y Panes', true),
('Tandoori Naan', 'Versión tradicional del pan naan simple, suave y tierno, cocinado en el horno tandoor. Acompañamiento esencial.', 3.50, 'Acompañamientos y Panes', true),
('Lacha Paratha', 'Pan multicapa y hojaldrado, hecho con harina y mantequilla, asado en el tandoor. Crujiente y perfecto para absorber salsas.', 3.50, 'Acompañamientos y Panes', true),
('Roti / Chapati', 'Pan plano integral, fino y ligero, cocinado sin grasa en superficie tandoor. Alternativa más saludable y sencilla al naan.', 3.00, 'Acompañamientos y Panes', true);

-- Insert all Postres items
INSERT INTO menu_items (name, description, price, category, available) VALUES
('Malai / Mango Kulfi', 'Helado tradicional indio, cremoso y denso. Con mango o malai.', 5.00, 'Postres', true),
('Gulab Jamun', 'Deliciosas bolitas de leche fritas, bañadas en un jarabe dulce perfumado con agua de rosas y cardamomo.', 5.50, 'Postres', true),
('Mango Pudding', 'Suave y refrescante pudín de mango, de textura cremosa y sabor afrutado, ideal para los amantes del mango.', 5.00, 'Postres', true),
('Crema de Mango', 'Postre cremoso y ligero elaborado con pulpa de mango natural, un toque de nata y decorado con frutas frescas.', 5.00, 'Postres', true),
('Tarta de Queso', 'Clásica y cremosa tarta de queso.', 6.00, 'Postres', true),
('Gajjar Ka Halwa', 'Postre tradicional a base de zanahoria rallada cocida lentamente en leche, con azúcar, frutos secos.', 5.50, 'Postres', true),
('Sorbete (Limón, Naranja)', 'Refrescante sorbete disponible en sabores de limón o naranja.', 5.00, 'Postres', true);

-- Insert all Bebidas items  
INSERT INTO menu_items (name, description, price, category, available) VALUES
('Mango Lassi', 'Batido tradicional indio a base de yogur y mango natural, cremoso y refrescante, ideal para acompañar platos especiados.', 5.00, 'Bebidas', true),
('Sweet Lassi', 'Bebida dulce y suave hecha con yogur batido, con un toque de azúcar, un clásico indio.', 5.00, 'Bebidas', true),
('Chai (con leche)', 'Té especiado cocido con leche y aromatizado con cardamomo, jengibre y canela. Reconfortante y lleno de sabor.', 3.00, 'Bebidas', true),
('Café', 'Café recién hecho.', 3.00, 'Bebidas', true),
('Infusión', 'Selección de infusiones de hierbas.', 2.50, 'Bebidas', true);