import { MenuCategory } from './types';

export const bebidas: MenuCategory = {
  title: "Bebidas",
  subcategories: [
    {
      title: "Bebidas Indias",
      items: [
        { name: "MANGO LASSI", description: "Batido de yogur y mango.", price: "5.00€", allergens: ['lacteos'] },
        { name: "SWEET LASSI", description: "Batido de yogur dulce.", price: "4.50€", allergens: ['lacteos'] },
        { name: "SALT LASSI", description: "Batido de yogur salado.", price: "4.50€", allergens: ['lacteos'] }
      ]
    },
    {
      title: "Cervezas",
      items: [
        { name: "COBRA (DE INDIA)", description: "Cerveza india.", price: "4.00€", allergens: ['gluten'] },
        { name: "MAHOU (NACIONAL)", description: "Cerveza nacional.", price: "3.00€", allergens: ['gluten'] },
        { name: "MAHOU ZERO TOSTADA", description: "Cerveza sin alcohol tostada.", price: "3.00€", allergens: ['gluten'] },
        { name: "RADLER", description: "Cerveza con limón.", price: "3.00€", allergens: ['gluten'] }
      ]
    },
    {
      title: "Vino Tinto",
      items: [
        { name: "PROTOS ROBLE", description: "2022. 750ml", price: "17€", allergens: ['sulfitos'] },
        { name: "JOTA FLORES", description: "Roble 9 meses. 750 ml", price: "15€", allergens: ['sulfitos'] },
        { name: "PINNA FIDELIS", description: "2021 vendimia manual 750 ml", price: "16€", allergens: ['sulfitos'] },
        { name: "CAMINO DE CASTILLA", description: "Roble 2023 750ml", price: "14€", allergens: ['sulfitos'] },
        { name: "CARRAMIMBRE", description: "Roble 2023 750ml.", price: "21€", allergens: ['sulfitos'] }
      ]
    },
    {
      title: "Vino Rosado y Verdejo",
      items: [
        { name: "SINFO", description: "750 ml", price: "14€", allergens: ['sulfitos'] },
        { name: "SALVUEROS", description: "", price: "14€", allergens: ['sulfitos'] },
        { name: "GILDA", description: "verdejo 2023", price: "14€", allergens: ['sulfitos'] },
        { name: "MARTIVILL", description: "Verdejo 2023 750ml", price: "16€", allergens: ['sulfitos'] }
      ]
    },
    {
      title: "Refrescos",
      items: [
        { name: "COCA-COLA", description: "", price: "3.00€", allergens: [] },
        { name: "COCA-COLA ZERO", description: "", price: "3.00€", allergens: [] },
        { name: "FANTA NARANJA", description: "", price: "3.00€", allergens: [] },
        { name: "AQUARIUS LIMÓN", description: "", price: "3.00€", allergens: [] },
        { name: "AGUA CON GAS", description: "", price: "3.00€", allergens: [] },
        { name: "AGUA", description: "", price: "2.50€", allergens: [] }
      ]
    },
    {
      title: "Licores y Copas",
      items: [
        { name: "MAGNO", description: "", price: "2.50€", allergens: [] },
        { name: "VETERANO", description: "", price: "2.50€", allergens: [] },
        { name: "HIERBAS", description: "", price: "2.50€", allergens: [] },
        { name: "PACHARÁN", description: "", price: "2.50€", allergens: [] },
        { name: "TINTO BLANCO Y ROSADO", description: "", price: "3.50€", allergens: ['sulfitos'] },
        { name: "CHIVAS REGAL", description: "", price: "7.00€", allergens: [] },
        { name: "BLACK LABEL", description: "", price: "6.50€", allergens: [] },
        { name: "BALLATINES", description: "", price: "6.50€", allergens: [] },
        { name: "RED LABEL", description: "", price: "6.00€", allergens: [] },
        { name: "DYC", description: "", price: "5.00€", allergens: [] },
        { name: "J&B", description: "", price: "6.00€", allergens: [] },
        { name: "BOMBAY DRY GIN", description: "", price: "6.00€", allergens: [] },
        { name: "BEEFEATER", description: "", price: "6.00€", allergens: [] }
      ]
    }
  ]
};