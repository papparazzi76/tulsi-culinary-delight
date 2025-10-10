import { MenuCategory } from './types';

export const postres: MenuCategory = {
  title: "Postres y Bebidas",
  subcategories: [
    {
      title: "Postres",
      items: [
        {
          name: "Malai / Mango Kulfi",
          description: "Helado tradicional indio, cremoso y denso. Con mango o malai.",
          price: "5.00€",
          allergens: ['lacteos']
        },
        {
          name: "Gulab Jamun",
          description: "Deliciosas bolitas de leche fritas, bañadas en un jarabe dulce perfumado con agua de rosas y cardamomo.",
          price: "5.50€",
          allergens: ['gluten', 'lacteos']
        },
        {
          name: "Mango Pudding",
          description: "Suave y refrescante pudín de mango, de textura cremosa y sabor afrutado, ideal para los amantes del mango.",
          price: "5.00€",
          allergens: ['lacteos', 'huevos']
        },
        {
          name: "Crema de Mango",
          description: "Postre cremoso y ligero elaborado con pulpa de mango natural, un toque de nata y decorado con frutas frescas.",
          price: "5.00€",
          allergens: ['lacteos']
        },
        {
          name: "Tarta de Queso",
          description: "Clásica y cremosa tarta de queso.",
          price: "6.00€",
          allergens: ['gluten', 'lacteos', 'huevos']
        },
        {
          name: "Gajjar Ka Halwa",
          description: "Postre tradicional a base de zanahoria rallada cocida lentamente en leche, con azúcar, frutos secos.",
          price: "5.50€",
          allergens: ['lacteos', 'frutos_cascara']
        },
        {
          name: "Sorbete (Limón, Naranja)",
          description: "Refrescante sorbete disponible en sabores de limón o naranja.",
          price: "5.00€",
          allergens: []
        }
      ]
    },
    {
      title: "Bebidas",
      items: [
        {
          name: "Mango Lassi",
          description: "Batido tradicional indio a base de yogur y mango natural, cremoso y refrescante, ideal para acompañar platos especiados.",
          price: "5.00€",
          allergens: ['lacteos']
        },
        {
          name: "Sweet Lassi",
          description: "Bebida dulce y suave hecha con yogur batido, con un toque de azúcar, un clásico indio.",
          price: "5.00€",
          allergens: ['lacteos']
        },
        {
          name: "Chai (con leche)",
          description: "Té especiado cocido con leche y aromatizado con cardamomo, jengibre y canela. Reconfortante y lleno de sabor.",
          price: "3.00€",
          allergens: ['lacteos']
        },
        {
          name: "Café",
          description: "Café recién hecho.",
          price: "3.00€",
          allergens: []
        },
        {
          name: "Infusión",
          description: "Selección de infusiones de hierbas.",
          price: "2.50€",
          allergens: []
        }
      ]
    }
  ]
};