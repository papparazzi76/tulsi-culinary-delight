import { MenuCategory } from './types';

export const degustacion: MenuCategory = {
  title: "Menús Degustación",
  // Nota: Mínimo dos personas. Cheese Naan, Arroz y Postre incluido en todos los menús.
  subcategories: [
    {
      title: "TULSI FATEHPUR - 26,00€ por persona",
      items: [
        { name: "Samosa de Carne", description: "Entrante", price: "" },
        { name: "Veg Pakora", description: "Entrante", price: "" },
        { name: "Cheese Roll", description: "Entrante", price: "" },
        { name: "Chicken Tandoori", description: "Entrante", price: "" },
        { name: "Butter Chicken", description: "Plato Principal", price: "" },
        { name: "Ternera Rogan Josh", description: "Plato Principal", price: "" },
        { name: "Berenjena Masala", description: "Plato Principal", price: "" },
      ]
    },
    {
      title: "TULSI KERALA - 28,00€ por persona",
      items: [
        { name: "Daal Wada", description: "Entrante", price: "" },
        { name: "Beef Cutlet", description: "Entrante", price: "" },
        { name: "Salmón", description: "Entrante", price: "" },
        { name: "Onion Bhaji", description: "Entrante", price: "" },
        { name: "Kerala Fish Curry", description: "Plato Principal", price: "" },
        { name: "Prawns Balcho", description: "Plato Principal", price: "" },
        { name: "Oberjinen Moile", description: "Plato Principal", price: "" },
      ]
    },
    {
      title: "TULSI TEMPLE (VEGETARIANO) - 24,00€ por persona",
      items: [
        { name: "Samosa Vegetal", description: "Entrante", price: "" },
        { name: "Onion Bhaji", description: "Entrante", price: "" },
        { name: "Gobi 65", description: "Entrante", price: "" },
        { name: "Tandoori Brócoli", description: "Entrante", price: "" },
        { name: "Mix Vegetales", description: "Plato Principal", price: "" },
        { name: "Paneer Masala", description: "Plato Principal", price: "" },
        { name: "Daal Makhni", description: "Plato Principal", price: "" },
        { name: "Berenjena Masala", description: "Plato Principal", price: "" },
      ]
    },
    {
      title: "TULSI PUNJAB - 25,00€ por persona",
      items: [
        { name: "Pain Puri", description: "Entrante", price: "" },
        { name: "Dahi Gol Gappe", description: "Entrante", price: "" },
        { name: "Fish Amarsari", description: "Entrante", price: "" },
        { name: "Punjabi Samosa", description: "Entrante", price: "" },
        { name: "Chicken Tikka", description: "Entrante", price: "" },
        { name: "Lamb Kadahi", description: "Plato Principal", price: "" },
        { name: "Lamb Tikka Masala", description: "Plato Principal", price: "" },
        { name: "Punjabi Choley", description: "Plato Principal", price: "" },
      ]
    }
  ]
};
