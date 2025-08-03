-- Delete existing Entrantes items from menu_items table
DELETE FROM menu_items WHERE category = 'Entrantes';

-- Insert exactly the items from the fried appetizers section
INSERT INTO menu_items (name, description, price, category, available) VALUES
('Samosa Vegetal (2 uds)', 'Empanadilla triangular relleno de patata, cebolla y guisantes con jengibre, comino y garam masala, acompañado de chutneys.', 7.00, 'Entrantes', true),
('Samosa de Pollo (2 uds)', 'Triángulo frito relleno de pollo desmenuzado marinado con jengibre, cilantro y especias suaves, resultando en un bocado jugoso.', 7.50, 'Entrantes', true),
('Samosa de Carne (2 uds)', 'Empanadilla con una mezcla sazonada de carne picada y cebolla, enriquecida con coriandro, comino y chile, que aporta un contraste jugoso.', 7.50, 'Entrantes', true),
('Pakora Vegetal (4 uds)', 'Frituras crujientes de verduras variadas (cebolla, patata, espinacas, coliflor) rebozadas en una mezcla de harina de garbanzo y especias como cúrcuma y comino, un snack tradicional.', 7.00, 'Entrantes', true),
('Onion Bhaji', 'Aros de cebolla rebozados en tempura india especiada con comino y cúrcuma, fritos hasta lograr una textura crujiente y un sabor dulce y suave.', 7.00, 'Entrantes', true),
('Cheese Roll (2 uds)', 'Delicados rollitos fritos rellenos de una mezcla cremosa de quesos fundidos, salpicados con especias suaves.', 7.50, 'Entrantes', true),
('Gobi 65', 'Coliflor marinada al estilo Chennai (1965), rebozada con un rebozado especiado y luego salteada con curry leaves, ajo y guindillas para un resultado crujiente.', 7.00, 'Entrantes', true),
('Chicken 65', 'Trozos de pollo marinados en yogur, jengibre, ajo, chiles rojos y especias rebozados ligera y fritos hasta quedar dorados.', 7.50, 'Entrantes', true),
('Fish 65', 'Pescado blanco marinado, frito hasta lograr una capa crujiente y luego salteado con especias, ácil y aromático; ideal como aperitivo o acompañamiento de platos principales jugosos.', 7.50, 'Entrantes', true),
('Beef Cutlet (2 uds)', 'Croquetas de ternera y patata, aliñadas con cúrcuma, comino y cilantro empanadas y fritas hasta dorado, con un corazón meloso y aromático ideal como entrante crujiente.', 7.50, 'Entrantes', true);