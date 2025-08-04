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
          price: "5.00€",
          image: "https://lwklmazvdqrmuriczhws.supabase.co/storage/v1/object/public/menu-images//pani-puri.png"
        },
        {
          name: "Yogurt Gol Gappa",
          description: "Pani puri rellenos de yogur cremoso, chutneys dulces y especias.",
          price: "6.00€",
          image: "https://lwklmazvdqrmuriczhws.supabase.co/storage/v1/object/public/menu-images//yogurt-gol-gappa.png"
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
          description: "Empanadilla triangular relleno de patata, cebolla y guisantes con jengibre, comino y garam masala, acompañado de chutneys.",
          price: "7.00€",
          image: "/lovable-uploads/0de911de-55e4-4043-93a5-b95de499fbe0.png"
        },
        {
          name: "Samosa de Pollo (2 uds)",
          description: "Triángulo frito relleno de pollo desmenuzado marinado con jengibre, cilantro y especias suaves, resultando en un bocado jugoso.",
          price: "7.50€",
          image: "https://lwklmazvdqrmuriczhws.supabase.co/storage/v1/object/public/menu-images//samosa-pollo.webp"
        },
        {
          name: "Samosa de Carne (2 uds)",
          description: "Empanadilla con una mezcla sazonada de carne picada y cebolla, enriquecida con coriandro, comino y chile, que aporta un contraste jugoso.",
          price: "7.50€",
          image: "https://lwklmazvdqrmuriczhws.supabase.co/storage/v1/object/public/menu-images//samosa-carne.webp"
        },
        {
          name: "Pakora Vegetal (4 uds)",
          description: "Frituras crujientes de verduras variadas (cebolla, patata, espinacas, coliflor) rebozadas en una mezcla de harina de garbanzo y especias como cúrcuma y comino, un snack tradicional.",
          price: "7.00€"
        },
        {
          name: "Onion Bhaji",
          description: "Aros de cebolla rebozados en tempura india especiada con comino y cúrcuma, fritos hasta lograr una textura crujiente y un sabor dulce y suave.",
          price: "7.00€"
        },
        {
          name: "Cheese Roll (2 uds)",
          description: "Delicados rollitos fritos rellenos de una mezcla cremosa de quesos fundidos, salpicados con especias suaves.",
          price: "7.50€"
        },
        {
          name: "Gobi 65",
          description: "Coliflor marinada al estilo Chennai (1965), rebozada con un rebozado especiado y luego salteada con curry leaves, ajo y guindillas para un resultado crujiente.",
          price: "7.00€"
        },
        {
          name: "Chicken 65",
          description: "Trozos de pollo marinados en yogur, jengibre, ajo, chiles rojos y especias rebozados ligera y fritos hasta quedar dorados.",
          price: "7.50€"
        },
        {
          name: "Fish 65",
          description: "Pescado blanco marinado, frito hasta lograr una capa crujiente y luego salteado con especias, ácil y aromático; ideal como aperitivo o acompañamiento de platos principales jugosos.",
          price: "7.50€"
        },
        {
          name: "Beef Cutlet (2 uds)",
          description: "Croquetas de ternera y patata, aliñadas con cúrcuma, comino y cilantro empanadas y fritas hasta dorado, con un corazón meloso y aromático ideal como entrante crujiente.",
          price: "7.50€"
        }
      ]
    },
    {
      title: "Tandoori",
      items: [
        {
          name: "Chicken Haryali",
          description: "Dados de pollo marinados en una mezcla de yogur, menta, cilantro y especias verdes, asados en el horno tandoor.",
          price: "8.00€"
        },
        {
          name: "Chicken Tikka",
          description: "Trozos de pollo en tandoor previamente marinados en yogur y especias tradicionales, resultando jugosos y tiernos.",
          price: "8.00€"
        },
        {
          name: "Chicken Reshmi Kebab",
          description: "Brochetas suaves, cremosas gracias a anacardos y crema, con especias delicadas que realzan la textura del pollo.",
          price: "8.00€"
        },
        {
          name: "Sheek Kebab",
          description: "Carne picada especiada con cilantro, comino y chile, prensada y asada en horno de barro para una capa crujiente y centro tierno.",
          price: "9.00€"
        },
        {
          name: "Chicken Tandoori 1/4",
          description: "Clásico muslo o pechuga marinado en especias y yogur, asado lentamente en tandoor, con piel ahumada y carne tierna.",
          price: "8.00€"
        },
        {
          name: "Salmón Tikka 2 uds",
          description: "Trozos de salmón marinados en yogur, jengibre y ajo, cocinados en tandoor para mantener jugosidad y un ligero ahumado.",
          price: "9.00€"
        },
        {
          name: "Tandoori Brócoli",
          description: "Floretes de brócoli marinados en yogur y especias, asados en horno tandoor hasta lograr bordes caramelizados y un interior tierno.",
          price: "8.50€"
        }
      ]
    }
  ]
};
