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
      setIsLoading(true);
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .order('category', { ascending: true });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error) {
      console.error('Error loading menu items:', error);
      toast.error('Error al cargar el menú.');
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
        <h3 className="text-2xl md:text-3xl font-playfair font-bold text-accent">
          Menú para Llevar
        </h3>
        <button
          onClick={onOpenCart}
          className="btn-tulsi relative"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:inline ml-2">Carrito</span>
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-6 h-6 text-sm flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </button>
      </div>

      {/* Category Cards with Accordion */}
      <Accordion 
        type="single" 
        collapsible 
        className="w-full space-y-4"
        value={openCategory}
        onValueChange={setOpenCategory}
      >
        {categories.map((category) => (
          <AccordionItem value={category} key={category} className="border-none">
            <AccordionTrigger className="hover:no-underline p-0 text-left">
                <div className="flex w-full items-center gap-4 p-3 border rounded-lg hover:bg-accent/10 transition-colors data-[state=open]:bg-accent/10">
                    <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl opacity-50">🍛</span>
                    </div>
                    <h4 className="text-xl font-playfair font-bold text-accent">{category}</h4>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="space-y-2">
                {getItemsForCategory(category).map((item) => {
                  const quantity = getItemQuantity(item.id);
                  return (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-secondary rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-xl opacity-50">🍽️</span>
                        </div>
                        <div className="flex-grow">
                          <h5 className="font-semibold text-sm">{item.name}</h5>
                          <p className="text-xs text-muted-foreground">€{item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8"
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                          disabled={quantity === 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-base w-8 text-center">{quantity}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8"
                          onClick={() => addToCart(item, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default TakeawayMenu;
