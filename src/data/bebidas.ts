import { MenuCategory } from './types';

export const bebidas: MenuCategory = {
  title: "Bebidas",
  subcategories: [
    {
      title: "Bebidas Indias",
      items: [
        { name: "MANGO LASSI", description: "Batido de yogur y mango.", price: "5.00€" },
        { name: "SWEET LASSI", description: "Batido de yogur dulce.", price: "4.50€" },
        { name: "SALT LASSI", description: "Batido de yogur salado.", price: "4.50€" }
      ]
    },
    {
      title: "Cervezas",
      items: [
        { name: "COBRA (DE INDIA)", description: "Cerveza india.", price: "4.00€" },
        { name: "MAHOU (NACIONAL)", description: "Cerveza nacional.", price: "3.00€" },
        { name: "MAHOU ZERO TOSTADA", description: "Cerveza sin alcohol tostada.", price: "3.00€" },
        { name: "RADLER", description: "Cerveza con limón.", price: "3.00€" }
      ]
    },
    {
      title: "Vino Tinto",
      items: [
        { name: "PROTOS ROBLE", description: "2022. 750ml", price: "17€" },
        { name: "JOTA FLORES", description: "Roble 9 meses. 750 ml", price: "15€" },
        { name: "PINNA FIDELIS", description: "2021 vendimia manual 750 ml", price: "16€" },
        { name: "CAMINO DE CASTILLA", description: "Roble 2023 750ml", price: "14€" },
        { name: "CARRAMIMBRE", description: "Roble 2023 750ml.", price: "21€" }
      ]
    },
    {
      title: "Vino Rosado y Verdejo",
      items: [
        { name: "SINFO", description: "750 ml", price: "14€" },
        { name: "SALVUEROS", description: "", price: "14€" },
        { name: "GILDA", description: "verdejo 2023", price: "14€" },
        { name: "MARTIVILL", description: "Verdejo 2023 750ml", price: "16€" }
      ]
    },
    {
      title: "Refrescos",
      items: [
        { name: "COCA-COLA", description: "", price: "3.00€" },
        { name: "COCA-COLA ZERO", description: "", price: "3.00€" },
        { name: "FANTA NARANJA", description: "", price: "3.00€" },
        { name: "AQUARIUS LIMÓN", description: "", price: "3.00€" },
        { name: "AGUA CON GAS", description: "", price: "3.00€" },
        { name: "AGUA", description: "", price: "2.50€" }
      ]
    },
    {
      title: "Licores y Copas",
      items: [
        { name: "MAGNO", description: "", price: "2.50€" },
        { name: "VETERANO", description: "", price: "2.50€" },
        { name: "HIERBAS", description: "", price: "2.50€" },
        { name: "PACHARÁN", description: "", price: "2.50€" },
        { name: "TINTO BLANCO Y ROSADO", description: "", price: "3.50€" },
        { name: "CHIVAS REGAL", description: "", price: "7.00€" },
        { name: "BLACK LABEL", description: "", price: "6.50€" },
        { name: "BALLATINES", description: "", price: "6.50€" },
        { name: "RED LABEL", description: "", price: "6.00€" },
        { name: "DYC", description: "", price: "5.00€" },
        { name: "J&B", description: "", price: "6.00€" },
        { name: "BOMBAY DRY GIN", description: "", price: "6.00€" },
        { name: "BEEFEATER", description: "", price: "6.00€" }
      ]
    }
  ]
};
