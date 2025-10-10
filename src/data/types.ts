export type Allergen = 
  | 'gluten' 
  | 'crustaceos' 
  | 'huevos' 
  | 'pescado' 
  | 'cacahuetes' 
  | 'soja' 
  | 'lacteos' 
  | 'frutos_cascara' 
  | 'apio' 
  | 'mostaza' 
  | 'sesamo' 
  | 'sulfitos' 
  | 'altramuces' 
  | 'moluscos';

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  image?: string;
  allergens?: Allergen[];
}

export interface MenuCategory {
  title: string;
  items?: MenuItem[];
  subcategories?: {
    title: string;
    items: MenuItem[];
  }[];
}