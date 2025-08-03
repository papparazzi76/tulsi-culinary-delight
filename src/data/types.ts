export interface MenuItem {
  name: string;
  description: string;
  price: string;
  image?: string;
}

export interface MenuCategory {
  title: string;
  items?: MenuItem[];
  subcategories?: {
    title: string;
    items: MenuItem[];
  }[];
}