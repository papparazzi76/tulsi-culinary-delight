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
            description: "Clásico pollo tandoori en una suave salsa de tomate y mantequilla.",
            price: "14.50€"
          },
          {
            name: "Chicken Tikka Masala",
            description: "Pollo asado en cremosa salsa de tomate y almendras.",
            price: "14.50€"
          },
          {
            name: "Chicken Korma",
            description: "Curry elegante y suave con salsa de yogur, coco y anacardos.",
            price: "14.00€"
          },
          {
            name: "Chicken Madras",
            description: "Pollo en curry especiado y picante con toques de coco.",
            price: "14.00€"
          },
          {
            name: "Chicken Vindaloo",
            description: "Pollo marinado con vinagre y chile rojo. Picante y profundo.",
            price: "14.50€"
          },
          {
            name: "Chicken Saag",
            description: "Estofado de pollo cocinado lentamente con espinacas frescas.",
            price: "14.50€"
          }
        ]
      },
      {
        title: "Cordero",
        items: [
          {
            name: "Lamb Shank",
            description: "Pierna de cordero cocinada lentamente en salsa rica de cebolla y tomate.",
            price: "16.50€"
          },
          {
            name: "Cordero Tikka Masala",
            description: "Dados de cordero asados al horno, en salsa cremosa de tomate.",
            price: "16.50€"
          },
          {
            name: "Cordero Korma",
            description: "Cordero tierno en salsa cremosa de yogur, coco y frutos secos.",
            price: "16.50€"
          }
        ]
      },
      {
        title: "Ternera",
        items: [
          {
            name: "Ternera Tikka Masala",
            description: "Ternera asada y cocinada en una salsa cremosa de tomate.",
            price: "15.50€"
          },
          {
            name: "Ternera Korma",
            description: "Estofado suave de ternera al estilo mughal con salsa espesa.",
            price: "15.50€"
          },
          {
            name: "Ternera Vindaloo",
            description: "Plato picante originario de Goa, marinado en vinagre y ajo.",
            price: "15.50€"
          }
        ]
      },
      {
        title: "Marisco",
        items: [
          {
            name: "Fish Kerala Curry",
            description: "Pescado guisado en una salsa de coco suave, estilo Kerala.",
            price: "17.00€"
          },
          {
            name: "Prawns Curry",
            description: "Gambas en salsa de curry tradicional, con base de tomate y cebolla.",
            price: "17.00€"
          },
          {
            name: "King Prawn Tandoori",
            description: "Langostinos gigantes marinados y asados al horno tandoor.",
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
        name: "Palak Paneer",
        description: "Espinacas cocinadas con queso fresco (paneer), ajo y especias.",
        price: "13.50€"
      },
      {
        name: "Channa Masala",
        description: "Garbanzos guisados en salsa especiada de tomate y cebolla.",
        price: "12.50€"
      },
      {
        name: "Dal Makhni",
        description: "Lentejas negras y alubias cocidas lentamente en salsa cremosa.",
        price: "13.00€"
      },
      {
        name: "Paneer Butter Masala",
        description: "Queso fresco (paneer) en salsa cremosa de tomate y mantequilla.",
        price: "14.00€"
      },
      {
        name: "Malai Kofta",
        description: "Albóndigas de queso y patata en salsa cremosa de tomate y frutos secos.",
        price: "13.00€"
      },
      {
        name: "Mix Vegetable",
        description: "Verduras variadas salteadas y cocinadas con especias suaves.",
        price: "12.50€"
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