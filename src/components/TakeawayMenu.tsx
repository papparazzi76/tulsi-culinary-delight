import { useState, useEffect } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCart, MenuItemType } from '@/hooks/useCart';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

interface TakeawayMenuProps {
  onOpenCart: () => void;
}

const TakeawayMenu = ({ onOpenCart }: TakeawayMenuProps) => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openCategory, setOpenCategory] = useState<string | undefined>();
  const { addToCart, updateQuantity, cartItems, getCartCount } = useCart();

  const categories = ['Entrantes', 'Principales', 'Biryani', 'Vegetales', 'Acompañamientos', 'Postres', 'Bebidas'];

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .order('category', { ascending: true });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error) {
      console.error('Error loading menu items:', error);
      toast.error('Error al cargar el menú');
    } finally {
      setIsLoading(false);
    }
  };

  const getItemsForCategory = (category: string) => {
    return menuItems.filter(item => item.category === category);
  };

  const getItemQuantity = (itemId: string) => {
    const item = cartItems.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with cart button */}
