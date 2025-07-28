import { MenuCategory } from './types';

export const entrantes: MenuCategory = {
  title: "Entrantes",
  subcategories: [
    {
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
};
