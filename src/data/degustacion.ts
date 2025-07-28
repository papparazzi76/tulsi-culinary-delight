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
        "ENTRANTES": [
          { name: "SAMOSA DE CARNE", description: "", price: "" },
          { name: "VEG PAKORA", description: "", price: "" },
          { name: "CHEESE ROLL", description: "", price: "" },
          { name: "CHICKEN TANDOORI", description: "", price: "" }
        ],
        "PRINCIPAL": [
          { name: "BUTTER CHICKEN", description: "", price: "" },
          { name: "TERNERA ROGAN JOSH", description: "", price: "" },
          { name: "BERENJENA MASALA", description: "", price: "" }
        ]
      }
    },
    {
        name: "TULSI KERALA",
        price: "28,00€ por persona (*mínimo 2 personas)",
        sections: {
          "ENTRANTES": [
            { name: "DAAL WADA", description: "", price: "" },
            { name: "BEEF CUTLET", description: "", price: "" },
            { name: "SALMÓN", description: "", price: "" },
            { name: "ONION BHAJI", description: "", price: "" }
          ],
          "PRINCIPAL": [
            { name: "KERALA FISH CURRY", description: "", price: "" },
            { name: "PRAWNS BALCHO", description: "", price: "" },
            { name: "OBERJINEN MOILE", description: "", price: "" }
          ]
        }
    },
    {
        name: "TULSI TEMPLE",
        price: "24,00€ por persona (*mínimo 2 personas)",
        sections: {
          "ENTRANTES": [
            { name: "SAMOSA VEGETAL", description: "", price: "" },
            { name: "ONION BHAJI", description: "", price: "" },
            { name: "GOBI 65", description: "", price: "" },
            { name: "TANDOORI BRÓCOLI", description: "", price: "" }
          ],
          "PRINCIPALES": [
            { name: "MIX VEGETALES", description: "", price: "" },
            { name: "PANEER MASALA", description: "", price: "" },
            { name: "DAAL MΑΚΗΝΙ", description: "", price: "" },
            { name: "BERENJENA MASALA", description: "", price: "" }
          ]
        }
    },
    {
        name: "TULSI PUNJAB",
        price: "25,00€ por persona (*mínimo 2 personas)",
        sections: {
          "ENTRANTES": [
            { name: "PAIN PURI", description: "", price: "" },
            { name: "DAHI GOL GAPPE", description: "", price: "" },
            { name: "FISH AMARSARI", description: "", price: "" },
            { name: "PUNJABI SAMOSA", description: "", price: "" },
            { name: "CHICKEN TIKKA", description: "", price: "" }
          ],
          "PRINCIPAL": [
            { name: "LAMB KADAHI", description: "", price: "" },
            { name: "LAMB TІККА MASALA", description: "", price: "" },
            { name: "PUNJABI CHOLEY", description: "", price: "" }
          ]
        }
    }
  ]
};
