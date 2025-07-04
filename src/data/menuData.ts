import { MenuCategory } from './types';
import { especiales } from './especiales';
import { entrantes } from './entrantes';
import { principales } from './principales';
import { postres } from './postres';

const biryani: MenuCategory = {
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
};

const vegetales: MenuCategory = {
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
};

const panes: MenuCategory = {
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
};

export const menuData: Record<string, MenuCategory> = {
  especiales,
  entrantes,
  principales,
  biryani,
  vegetales,
  panes,
  postres
};