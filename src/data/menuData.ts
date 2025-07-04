interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface MenuCategory {
  title: string;
  items?: MenuItem[];
  subcategories?: {
    title: string;
    items: MenuItem[];
  }[];
}

export const menuData: Record<string, MenuCategory> = {
  especiales: {
    title: "Especial de Tulsi",
    items: [
      {
        name: "Pani Puri",
        description: "Crujientes esferas de masa rellenas de patata y garbanzos, servidas con agua especiada.",
        price: "5.00€"
      },
      {
        name: "Yogurt Gol Gappa",
        description: "Pani puri rellenos de yogur cremoso, chutneys dulces y especias.",
        price: "6.00€"
      },
      {
        name: "Dahi Bhale",
        description: "Buñuelos suaves de lentejas cubiertos con yogur y chutneys dulces.",
        price: "6.00€"
      },
      {
        name: "Samosa Chat",
        description: "Samosa crujiente troceada, con yogur, garbanzos y chutneys.",
        price: "6.50€"
      },
      {
        name: "Honey Chicken Wings",
        description: "Alitas de pollo glaseadas en salsa dulce de miel, jugosas y doradas.",
        price: "10.50€"
      },
      {
        name: "Tacos de Pollo (3 uds)",
        description: "Tacos rellenos de pollo jugoso y sazonado, con salsas y hierbas frescas.",
        price: "12.00€"
      }
    ]
  },

  entrantes: {
    title: "Entrantes",
    subcategories: [
      {
        title: "Fritos",
        items: [
          {
            name: "Samosa Vegetal (2 uds)",
            description: "Empanadilla de patata, cebolla y guisantes con especias.",
            price: "7.00€"
          },
          {
            name: "Samosa de Pollo (2 uds)",
            description: "Triángulo frito relleno de pollo desmenuzado y marinado.",
            price: "7.50€"
          },
          {
            name: "Onion Bhaji",
            description: "Aros de cebolla en tempura india especiada.",
            price: "7.00€"
          },
          {
            name: "Gobi 65",
            description: "Coliflor frita al estilo Chennai, crujiente y especiada.",
            price: "7.00€"
          },
          {
            name: "Chicken 65",
            description: "Trozos de pollo marinados en yogur y especias, fritos.",
            price: "7.50€"
          },
          {
            name: "Beef Cutlet (2 uds)",
            description: "Croquetas de ternera y patata, aliñadas y fritas.",
            price: "7.50€"
          }
        ]
      },
      {
        title: "Tandoori",
        items: [
          {
            name: "Chicken Haryali",
            description: "Dados de pollo marinados en yogur, menta y cilantro, asados al tandoor.",
            price: "8.00€"
          },
          {
            name: "Chicken Tikka",
            description: "Trozos de pollo en tandoor marinados en yogur y especias.",
            price: "8.00€"
          },
          {
            name: "Sheek Kebab",
            description: "Carne picada especiada, prensada y asada en horno de barro.",
            price: "9.00€"
          },
          {
            name: "Salmón Tikka (2 uds)",
            description: "Salmón marinado en yogur, jengibre y ajo, cocinado en tandoor.",
            price: "9.00€"
          },
          {
            name: "Tandoori Brócoli",
            description: "Floretes de brócoli marinados y asados en horno tandoor.",
            price: "8.50€"
          }
        ]
      }
    ]
  },

  principales: {
    title: "Platos Principales",
    subcategories: [
      {
        title: "Pollo",
        items: [
          {
            name: "Butter Chicken",
            description: "Clásico del norte de la India: pollo tandoori cocinado en una suave y sedosa salsa de tomate, mantequilla, anacardos y fenogreco seco (kasuri methi), con un toque ligeramente dulce.",
            price: "14.50€"
          },
          {
            name: "Chicken Tikka Masala",
            description: "Pollo asado en horno tandoor y servido en una cremosa salsa de tomate y almendras, con un delicado equilibrio entre dulzor y especias aromáticas, ideal para quienes buscan un curry suave y sabroso.",
            price: "14.50€"
          },
          {
            name: "Chicken Korma",
            description: "Curry elegante y suave elaborado con pollo cocinado en una salsa rica de yogur, coco, anacardos y almendras, perfumado con cardamomo y canela, perfecto para los amantes de sabores cremosos y delicados.",
            price: "14.00€"
          },
          {
            name: "Malai Chicken",
            description: "Trozos de pollo marinados en nata (malai), yogur y especias suaves, asados en el horno. Sabor cremoso, delicado y ligeramente dulce.",
            price: "14.00€"
          },
          {
            name: "Gradma Chicken Curry",
            description: "Curry tradicional especiado con cebolla y tomate.",
            price: "14.00€"
          },
          {
            name: "Chicken Jalfrezi",
            description: "Pollo salteado con pimientos, cebolla y especias.",
            price: "14.50€"
          },
          {
            name: "Chicken Karahi",
            description: "Pollo al estilo Karahi, con tomate, pimiento y especias.",
            price: "14.50€"
          },
          {
            name: "Chicken Madras",
            description: "Pollo en curry especiado y picante con toques de coco.",
            price: "14.00€"
          },
          {
            name: "Chicken Vindaloo",
            description: "Versión india del plato de origen portugués: pollo marinado y cocinado con vinagre, chile rojo seco y especias intensas. Picante y profundo, típico de la región de Goa.",
            price: "14.50€"
          },
          {
            name: "Chicken Balti",
            description: "Pollo especiado con salsa densa al estilo Balti. Se cocina a fuego fuerte en un wok metálico llamado balti, con especias aromáticas, tomates y pimientos.",
            price: "14.50€"
          },
          {
            name: "Chicken Saag",
            description: "Estofado de pollo cocinado lentamente con espinacas frescas, ajo y jengibre, en una salsa verde especiada con comino, clavo y un toque de garam masala.",
            price: "14.50€"
          },
          {
            name: "Chicken Dopiaza",
            description: "Pollo guisado con doble cantidad de cebolla y especias.",
            price: "14.50€"
          }
        ]
      },
      {
        title: "Cordero",
        items: [
          {
            name: "Lamb Shank",
            description: "Pierna de cordero cocinada lentamente hasta quedar melosa, bañada en una salsa rica en cebolla, tomate, cardamomo y especias tradicionales. Un plato reconfortante.",
            price: "16.50€"
          },
          {
            name: "Cordero Tikka Masala",
            description: "Dados de cordero marinados y asados al horno, servidos en una salsa cremosa de tomate con un matiz especiado suave.",
            price: "16.50€"
          },
          {
            name: "Cordero Korma",
            description: "Cordero tierno en una salsa cremosa y aromática de yogur, coco y frutos secos, con especias dulces como canela y cardamomo.",
            price: "16.50€"
          },
          {
            name: "Cordero Curry",
            description: "Un clásico curry al estilo indio: cordero cocido en una salsa especiada (incluyendo cúrcuma, comino, cilantro, ajo y jengibre), con base de tomate y cebolla. Ideal para acompañar con arroz o pan naan.",
            price: "16.00€"
          },
          {
            name: "Cordero Jalfrezi",
            description: "Origen bengalí, se caracteriza por su técnica de hot-fry: el cordero se fríe rápidamente junto con pimientos, cebolla, tomate y chiles, resultando en una preparación jugosa, sabor agri-dulce y más seca que un curry típico.",
            price: "16.50€"
          },
          {
            name: "Cordero Karahi",
            description: "Cocinado en un karahi (wok indio) con abundante jengibre, ajo, tomate y especias, dando una salsa espesa y 'jammy'. Tiene una textura intensa y sabor vibrante.",
            price: "16.50€"
          },
          {
            name: "Cordero Madras",
            description: "Curry del sur de la India, conocido por su sabor fuerte y picante gracias al uso generoso de guindilla seca, cúrcuma, curry leaves y a una base de cuerpo medio a abundante.",
            price: "16.50€"
          },
          {
            name: "Cordero Vindaloo",
            description: "Curry picante y profundo de cordero, cocinado con vinagre, ajo, chile rojo seco y una mezcla intensa de especias al estilo de Goa. Picante y vibrante.",
            price: "16.50€"
          },
          {
            name: "Cordero Balti",
            description: "Plato originario de la región de Baltustan y popularizado en Reino Unido. El cordero se cocina a fuego fuerte en un wok metálico llamado balti, con especias aromáticas, tomates y pimientos. Se sirve normalmente con pan naan o arroz.",
            price: "16.50€"
          },
          {
            name: "Cordero Saag",
            description: "'Saag' significa hojas verdes. En este plato, el cordero se guisa lentamente junto con espinacas y especias tradicionales como comino, ajo y jengibre, dando como resultado una salsa cremosa y nutritiva.",
            price: "16.50€"
          },
          {
            name: "Cordero Dopiaza",
            description: "'Dopiaza' significa literalmente 'doble cebolla'. El plato combina cordero tierno cocinado con cebolla en dos etapas: parte se cocina en la salsa especiada y parte se incorpora al final, dándole textura y un dulzor suave.",
            price: "16.50€"
          }
        ]
      },
      {
        title: "Ternera",
        items: [
          {
            name: "Ternera Tikka Masala",
            description: "Troceado de ternera marinado en yogur con especias como comino, cilantro, jengibre y cúrcuma, luego asado y cocinado en una salsa cremosa de tomate, nata y masala. De sabor aromático, ligeramente picante y muy popular.",
            price: "15.50€"
          },
          {
            name: "Ternera Korma",
            description: "Estofado suave de ternera al estilo mughal con salsa espesa a base de yogur, leche de coco o nata, frutos secos (almendras u otros) y especias dulces como comino, cardamomo y clavo. Cremoso, delicado y reconfortante.",
            price: "15.50€"
          },
          {
            name: "Ternera Curry",
            description: "Preparación tradicional de ternera en salsa especiada con tomate, cebolla, ajo y jengibre; puede ajustarse de suave a picante. Es el estilo más común y versátil de curry indio.",
            price: "15.50€"
          },
          {
            name: "Ternera Jalfrezi",
            description: "Ternera salteada a fuego vivo con pimientos, cebolla, tomate y chiles, muy jugosa y con poca salsa. Similar al estilo de hot-fry, más seca e intensa.",
            price: "15.50€"
          },
          {
            name: "Ternera Karahi",
            description: "Cocinada en un karahi (wok metálico), con jengibre, ajo, tomate y especias. Salsa espesa 'jammy' y sabor vibrante, posiblemente un toque picante.",
            price: "15.50€"
          },
          {
            name: "Ternera Madras",
            description: "Curry del sur de la India con especias como guindilla seca, cúrcuma y hojas de curry, color rojizo intenso.",
            price: "15.50€"
          },
          {
            name: "Ternera Vindaloo",
            description: "Plato picante originario de Goa, adaptado del portugués 'vinha d'alhos' (vino y ajo). Carne marinada en vinagre, ajo y especias (pimentón, comino, cardamomo) y cocinada en salsa espesa. Se le conoce como 'el rey de los currys'.",
            price: "15.50€"
          },
          {
            name: "Ternera Balti",
            description: "Cocida rápidamente en wok metálico balti, con salsa ligera de tomate, ajo y especias. Muy aromática y sabrosa, con un toque más seco que los currys estándar.",
            price: "15.50€"
          },
          {
            name: "Ternera Saag",
            description: "Ternera guisada lentamente con hojas verdes (espinacas o mostaza), especias suaves como ajo, jengibre y comino. Salsa cremosa de sabor herbáceo y textura más ligera.",
            price: "15.50€"
          },
          {
            name: "Ternera Dopiaza",
            description: "'Dobles cebollas': parte se cocina en la base, parte se añade al final, aportando dulzura y textura. Curry de intensidad media, aromático y muy equilibrado.",
            price: "15.50€"
          }
        ]
      },
      {
        title: "Marisco",
        items: [
              {
                name: "Fish Tikka Masala",
                description: "Pez marinado en yogur y especias, asado o salteado y luego sumergido en una cremosa salsa de tomate y cebolla.",
                price: "16.00€"
              },
              {
                name: "Fish Kerala Curry",
                description: "Estilo tradicional de Kerala con pescado guisado en una salsa de coco suave, cocinada con curry, jengibre, tomate y hojas de curry. De sabor suave y cremoso.",
                price: "17.00€"
              },
              {
                name: "Fish Korma",
                description: "Similar al korma de carne: pescado tierno en salsa cremosa de frutos secos y especias delicadas (yogur o leche de coco). Textura suave y con un toque dulce.",
                price: "16.00€"
              },
              {
                name: "Fish Masala",
                description: "Variación con pescado en salsa especiada (masala), con base de tomate, cebolla, jengibre y ajo. Sabor vibrante, más ligero que el tikka masala.",
                price: "16.00€"
              },
              {
                name: "Fish Madras",
                description: "Curry sur indio de sabor intenso y picante gracias a guindillas secas, cúrcuma y especias. Salsa roja bien especiada que realza mucho el sabor del pescado.",
                price: "16.00€"
              },
              {
                name: "Fish Vindaloo",
                description: "Adopta la versión de Goa: pescado marinado en vinagre, ajo, chiles y especias. Muy picante, con un toque ácido fuerte característico.",
                price: "16.00€"
              },
              {
                name: "Fish Moilee",
                description: "Estofado de pescado típico de Kerala en leche de coco, suave, ligeramente especiado y cremoso. Es un plato reconfortante.",
                price: "16.00€"
              },
              {
                name: "Kerala Prawns Curry",
                description: "Camarones cocinados al estilo Kerala en salsa de coco, curry, jengibre y tomate. Similar al fish moilee, cremoso y aromático.",
                price: "17.50€"
              },
              {
                name: "Prawns Curry",
                description: "Gambas en salsa de curry tradicional, especiada con una base de tomate, cebolla, ajo y jengibre. Intensidad variable según picante.",
                price: "17.00€"
              },
              {
                name: "Malai Prawns",
                description: "Gambas en salsa suave y cremosa (malai = crema), elaborada con nata o leche de coco, especias ligeras y posiblemente frutos secos. Suave y reconfortante.",
                price: "17.00€"
              },
              {
                name: "Prawns Korma",
                description: "Versión de gambas en korma: salsa rica de yogur o coco y frutos secos. Apuntado a un sabor dulce y suave.",
                price: "17.00€"
              },
              {
                name: "Prawns Madras",
                description: "Gambas en un curry al estilo Madras: muy picante, con guindillas, cúrcuma y especias sureñas. Color rojo intenso y sabor fuerte.",
                price: "17.00€"
              },
              {
                name: "Prawns Vindaloo",
                description: "Gambas en versión picante y ácida tipo Goa: marinado en vinagre, ajo y chiles. Picante pronunciado con fondo agrio.",
                price: "17.00€"
              },
              {
                name: "Prawns Moilee",
                description: "Camarones cocidos en una salsa de coco suave al estilo Kerala moilee, con jengibre, ajo y hojas de curry. Cremoso y ligeramente especiado.",
                price: "17.00€"
              }
        ]
      },
      {
        title: "Tandoori",
        items: [
          {
            name: "Chicken Tikka (6 uds)",
            description: "Dados de pechuga de pollo marinados en yogur, especias (comino, cilantro, pimentón) y zumo de limón, asados en el tandoor. Sabor ahumado, jugoso y ligeramente especiado.",
            price: "16.00€"
          },
          {
            name: "Malai Tikka",
            description: "Pollo marinado en nata (malai), queso fresco y especias suaves, luego asado en el tandoor. Versión más cremosa y menos picante que el clásico tikka, ideal para quienes prefieren un toque delicado.",
            price: "16.00€"
          },
          {
            name: "Chicken Tandoori 1/2",
            description: "Medio pollo (con hueso) marinado en yogur, especias intensas y zumo de limón, cocinado en el horno tandoor. Sabor potente, exterior crujiente y carne tierna por dentro, con el toque ahumado característico.",
            price: "15.50€"
          },
          {
            name: "Salmon Tikka (4 uds)",
            description: "Trozos de salmón fresco marinados en yogur, hierbas y especias aromáticas, luego asados al tandoor. Sabor suave, textura jugosa y un toque ahumado. Ideal para los amantes del pescado.",
            price: "17.00€"
          },
          {
            name: "King Prawn Tandoori",
            description: "Langostinos gigantes marinados en especias, yogur y limón, asados al horno tandoor. Textura firme y jugosa, sabor marino intenso y especiado, con el clásico toque ahumado del tandoor.",
            price: "20.50€"
          }
        ]
      }
    ]
  },

  biryani: {
    title: "Biryani",
    items: [
      {
        name: "Lamb Lakhnau Biryani",
        description: "Arroz basmati cocinado a fuego lento con cordero marinado y azafrán.",
        price: "15.50€"
      },
      {
        name: "Chicken Hyderabadi Biryani",
        description: "Famoso biryani picante con arroz y pollo marinado en yogur.",
        price: "14.50€"
      },
      {
        name: "Beef Punjabi Biryani",
        description: "Biryani del norte de India con ternera y especias robustas.",
        price: "15.50€"
      },
      {
        name: "Prawns Biryani",
        description: "Biryani de gambas con arroz basmati, especias y cebolla frita.",
        price: "18.00€"
      },
      {
        name: "Veg Biryani",
        description: "Versión vegetariana con arroz, verduras mixtas y frutos secos.",
        price: "13.50€"
      }
    ]
  },

  vegetales: {
    title: "Vegetales",
    items: [
      {
        name: "Mix Vegetable",
        description: "Verduras variadas salteadas y cocinadas con especias suaves en salsa ligera. Plato equilibrado y saludable.",
        price: "12.50€"
      },
      {
        name: "Vegetable Stew",
        description: "Guiso de verduras al estilo del sur de la India, cocinado en leche de coco con jengibre, ajo y especias suaves. Cremoso y reconfortante.",
        price: "12.50€"
      },
      {
        name: "Mango Mix Vegetable",
        description: "Verduras mixtas en salsa especiada con un toque de mango, que aporta un sabor dulce y afrutado muy especial.",
        price: "12.50€"
      },
      {
        name: "Bombe Potato",
        description: "Patatas especiadas al estilo 'Bombay', salteadas con mostaza, cúrcuma y hierbas. Ligeramente picantes y muy aromáticas.",
        price: "12.50€"
      },
      {
        name: "Mushroom Curry",
        description: "Champiñones cocinados en salsa especiada de tomate, cebolla y ajo. Textura suave y sabor terroso, con especias medias.",
        price: "12.50€"
      },
      {
        name: "Palak Paneer",
        description: "Espinacas cocinadas con queso fresco (paneer), ajo y especias. Plato cremoso, suave y muy popular en la cocina india vegetariana.",
        price: "13.50€"
      },
      {
        name: "Aloo Palak",
        description: "Espinacas y patatas cocinadas juntas con ajo, cebolla y especias suaves. Plato ligero y lleno de sabor verde.",
        price: "12.50€"
      },
      {
        name: "Channa Masala",
        description: "Garbanzos guisados en salsa especiada de tomate y cebolla, con comino, cilantro y un toque de limón. Muy aromático y nutritivo.",
        price: "12.50€"
      },
      {
        name: "Dal Tadka",
        description: "Lentejas amarillas cocinadas con cebolla, ajo y especias, terminadas con un sofrito de ghee (mantequilla clarificada) y hierbas. Sabor suave y muy tradicional.",
        price: "12.50€"
      },
      {
        name: "Dal Makhni",
        description: "Lentejas negras y alubias cocidas lentamente en salsa cremosa con mantequilla y especias suaves. Textura densa y muy reconfortante.",
        price: "13.00€"
      },
      {
        name: "Paneer Butter Masala",
        description: "Queso fresco (paneer) en salsa cremosa de tomate, mantequilla y especias dulces como fenogreco. Suave, ligeramente dulce y muy aromático.",
        price: "14.00€"
      },
      {
        name: "Achari Baingan",
        description: "Berenjenas cocinadas al estilo achari, es decir, con especias de encurtido (hinojo, mostaza, comino). Sabor intenso y picante, con toques ácidos.",
        price: "13.00€"
      },
      {
        name: "Baingan Moilee",
        description: "Berenjenas guisadas al estilo Kerala, en salsa suave de leche de coco con especias. Plato cremoso y ligeramente especiado.",
        price: "13.00€"
      },
      {
        name: "Malai Kofta",
        description: "Albóndigas de queso y patata en salsa cremosa de tomate y frutos secos, ligeramente dulce. Plato elegante, suave y muy popular en celebraciones.",
        price: "13.00€"
      }
    ]
  },

  panes: {
    title: "Acompañamientos y Panes",
    subcategories: [
      {
        title: "Arroces",
        items: [
          {
            name: "Kashmiri Pulao",
            description: "Arroz basmati con frutos secos, frutas y especias suaves.",
            price: "10.50€"
          },
          {
            name: "Pulao Rice",
            description: "Arroz basmati salteado con especias suaves.",
            price: "7.50€"
          },
          {
            name: "Boil Rice",
            description: "Arroz basmati blanco hervido, simple y esponjoso.",
            price: "7.00€"
          }
        ]
      },
      {
        title: "Panes al Tandoor",
        items: [
          {
            name: "Cheese Naan",
            description: "Pan tierno relleno de queso fundido, horneado en el tandoor.",
            price: "4.50€"
          },
          {
            name: "Cheese Garlic Naan",
            description: "Naan relleno de queso con ajo fresco, dorado en el tandoor.",
            price: "5.00€"
          },
          {
            name: "Garlic Naan",
            description: "Clásico naan con ajo fresco y mantequilla.",
            price: "4.00€"
          },
          {
            name: "Peshawari Naan",
            description: "Pan naan relleno de frutos secos, coco y frutas confitadas.",
            price: "5.00€"
          },
          {
            name: "Tandoori Naan",
            description: "Versión tradicional del pan naan simple, suave y tierno.",
            price: "3.50€"
          },
          {
            name: "Roti / Chapati",
            description: "Pan plano integral, fino y ligero, sin grasa.",
            price: "3.00€"
          }
        ]
      }
    ]
  }
};