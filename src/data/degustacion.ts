import { MenuItem } from './types';

interface TastingMenu {
  name: string;
  price: string;
  sections: {
    [key: string]: MenuItem[];
  };
}

interface DegustacionData {
  title: string;
  note: string;
  menus: TastingMenu[];
}

export const degustacion: DegustacionData = {
  title: "Menús Degustación",
  note: "Todos los menús degustación incluyen Cheese Naan, Arroz y Postre.",
  menus: [
    {
      name: "TULSI FATEHPUR",
      price: "26,00€ por persona (*mínimo 2 personas)",
      sections: {
        "Entrantes": [
          { name: "Samosa de Carne", description: "", price: "" },
          { name: "Veg Pakora", description: "", price: "" },
          { name: "Cheese Roll", description: "", price: "" },
          { name: "Chicken Tandoori", description: "", price: "" }
        ],
        "Plato Principal": [
          { name: "Butter Chicken", description: "", price: "" },
          { name: "Ternera Rogan Josh", description: "", price: "" },
          { name: "Berenjena Masala", description: "", price: "" }
        ]
      }
    },
    {
        name: "TULSI KERALA",
        price: "28,00€ por persona (*mínimo 2 personas)",
        sections: {
          "Entrantes": [
            { name: "Daal Wada", description: "", price: "" },
            { name: "Beef Cutlet", description: "", price: "" },
            { name: "Salmón", description: "", price: "" },
            { name: "Onion Bhaji", description: "", price: "" }
          ],
          "Plato Principal": [
            { name: "Kerala Fish Curry", description: "", price: "" },
            { name: "Prawns Balcho", description: "", price: "" },
            { name: "Oberjinen Moile", description: "", price: "" }
          ]
        }
    },
    {
        name: "TULSI TEMPLE (VEGETARIANO)",
        price: "24,00€ por persona (*mínimo 2 personas)",
        sections: {
          "Entrantes": [
            { name: "Samosa Vegetal", description: "", price: "" },
            { name: "Onion Bhaji", description: "", price: "" },
            { name: "Gobi 65", description: "", price: "" },
            { name: "Tandoori Brócoli", description: "", price: "" }
          ],
          "Plato Principal": [
            { name: "Mix Vegetales", description: "", price: "" },
            { name: "Paneer Masala", description: "", price: "" },
            { name: "Daal Makhni", description: "", price: "" },
            { name: "Berenjena Masala", description: "", price: "" }
          ]
        }
    },
    {
        name: "TULSI PUNJAB",
        price: "25,00€ por persona (*mínimo 2 personas)",
        sections: {
          "Entrantes": [
            { name: "Pain Puri", description: "", price: "" },
            { name: "Dahi Gol Gappe", description: "", price: "" },
            { name: "Fish Amarsari", description: "", price: "" },
            { name: "Punjabi Samosa", description: "", price: "" },
            { name: "Chicken Tikka", description: "", price: "" }
          ],
          "Plato Principal": [
            { name: "Lamb Kadahi", description: "", price: "" },
            { name: "Lamb Tikka Masala", description: "", price: "" },
            { name: "Punjabi Choley", description: "", price: "" }
          ]
        }
    }
  ]
};
