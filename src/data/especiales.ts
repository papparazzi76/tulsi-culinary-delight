import { MenuCategory } from './types';
import paniPuriImg from '@/assets/dishes/pani-puri.jpg';
import yogurtGolGappaImg from '@/assets/dishes/yogurt-gol-gappa.jpg';
import dahiBhaleImg from '@/assets/dishes/dahi-bhale.jpg';
import samosaChatImg from '@/assets/dishes/samosa-chat.jpg';
import honeyChickenWingsImg from '@/assets/dishes/honey-chicken-wings.jpg';
import chickenTacosImg from '@/assets/dishes/chicken-tacos.jpg';

export const especiales: MenuCategory = {
  title: "Especial de Tulsi",
  items: [
    {
      name: "Pani Puri",
      description: "Crujientes esferas de masa rellenas de patata y garbanzos, servidas con agua especiada.",
      price: "5.00€",
      image: "https://lwklmazvdqrmuriczhws.supabase.co/storage/v1/object/public/menu-images/pai-puri.png"
    },
    {
      name: "Yogurt Gol Gappa",
      description: "Pani puri rellenos de yogur cremoso, chutneys dulces y especias.",
      price: "6.00€",
      image: yogurtGolGappaImg
    },
    {
      name: "Dahi Bhale",
      description: "Buñuelos suaves de lentejas cubiertos con yogur y chutneys dulces.",
      price: "6.00€",
      image: dahiBhaleImg
    },
    {
      name: "Samosa Chat",
      description: "Samosa crujiente troceada, con yogur, garbanzos y chutneys.",
      price: "6.50€",
      image: samosaChatImg
    },
    {
      name: "Honey Chicken Wings",
      description: "Alitas de pollo glaseadas en salsa dulce de miel, jugosas y doradas.",
      price: "10.50€",
      image: honeyChickenWingsImg
    },
    {
      name: "Tacos de Pollo (3 uds)",
      description: "Tacos rellenos de pollo jugoso y sazonado, con salsas y hierbas frescas.",
      price: "12.00€",
      image: chickenTacosImg
    }
  ]
};