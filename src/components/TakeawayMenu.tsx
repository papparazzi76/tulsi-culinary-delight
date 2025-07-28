import { useState, useEffect } from 'react';
import { Plus, Minus, ShoppingCart, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCart, MenuItemType } from '@/hooks/useCart';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface TakeawayMenuProps {
  onOpenCart: () => void;
}

const TakeawayMenu = ({ onOpenCart }: TakeawayMenuProps) => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-playfair font-bold text-accent">
          Menú para Llevar
        </h3>
        <button
          onClick={onOpenCart}
          className="btn-tulsi relative"
        >
          <ShoppingCart className="w-5 h-5" />
          Carrito
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-6 h-6 text-sm flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </button>
      </div>

      {/* Category Cards */}
      <Accordion type="single" collapsible className="w-full">
        {categories.map((category) => (
          <AccordionItem value={category} key={category}>
            <AccordionTrigger className="w-full">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-4xl opacity-50">🍛</span>
                </div>
                <h4 className="text-2xl font-playfair font-bold text-accent">{category}</h4>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {getItemsForCategory(category).map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-2xl opacity-50">🍽️</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold">{item.name}</h5>
                      <p className="text-sm text-muted-foreground">€{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" onClick={() => updateQuantity(item.id, getItemQuantity(item.id) - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-bold text-lg">{getItemQuantity(item.id)}</span>
                      <Button size="icon" variant="ghost" onClick={() => addToCart(item, 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button onClick={() => addToCart(item, 1)}>Añadir al pedido</Button>
                    <Button onClick={onOpenCart}>Finalizar Pedido</Button>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default TakeawayMenu;
