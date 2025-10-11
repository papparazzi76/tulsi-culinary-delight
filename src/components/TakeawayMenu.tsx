import { useState, useEffect } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCart, MenuItemType } from '@/hooks/useCart';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { menuData } from '@/data/menuData';
import AllergenIcons from '@/components/AllergenIcons';
import { Allergen } from '@/data/types';

interface TakeawayMenuProps {
  onOpenCart: () => void;
}

const TakeawayMenu = ({ onOpenCart }: TakeawayMenuProps) => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openCategory, setOpenCategory] = useState<string | undefined>();
  const [openSubcategory, setOpenSubcategory] = useState<string | undefined>();
  const { addToCart, updateQuantity, cartItems, getCartCount } = useCart();

  // Get categories that exist in menuData
  const availableCategories = Object.keys(menuData);

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

  const getCategoryDisplayName = (categoryKey: string): string => {
    const categoryMap: { [key: string]: string } = {
      'entrantes': 'Entrantes',
      'principales': 'Principales', 
      'biryani': 'Biryani',
      'vegetales': 'Vegetales',
      'panes': 'Acompañamientos y Panes',
      'postres': 'Postres',
      'bebidas': 'Bebidas'
    };
    return categoryMap[categoryKey] || categoryKey;
  };

  const getItemsForSubcategory = (categoryKey: string, subcategoryTitle?: string) => {
    const categoryDisplayName = getCategoryDisplayName(categoryKey);
    
    if (!subcategoryTitle) {
      // For categories without subcategories, get all items for that category
      const categoryData = menuData[categoryKey];
      const items = menuItems.filter(item => item.category === categoryDisplayName);
      
      // Enhance with allergens from menuData
      return items.map(item => {
        const menuDataItem = categoryData?.items?.find(mdi => mdi.name === item.name);
        return {
          ...item,
          allergens: menuDataItem?.allergens || []
        };
      });
    }
    
    // For subcategories, we need to match the item name with the subcategory items
    const categoryData = menuData[categoryKey];
    if (!categoryData?.subcategories) return [];
    
    const subcategory = categoryData.subcategories.find(sub => sub.title === subcategoryTitle);
    if (!subcategory) return [];
    
    const subcategoryItemNames = subcategory.items.map(item => item.name);
    const items = menuItems.filter(item => 
      item.category === categoryDisplayName && subcategoryItemNames.includes(item.name)
    );
    
    // Enhance with allergens from menuData
    return items.map(item => {
      const menuDataItem = subcategory.items.find(mdi => mdi.name === item.name);
      return {
        ...item,
        allergens: menuDataItem?.allergens || []
      };
    });
  };

  const getItemQuantity = (itemId: string) => {
    const item = cartItems.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const renderMenuItems = (items: MenuItemType[]) => {
    return items.map((item) => {
      const quantity = getItemQuantity(item.id);
      return (
        <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-secondary rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              {item.image_url ? (
                <img 
                  src={item.image_url} 
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    // Fallback to emoji if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <span className={`text-xl opacity-50 ${item.image_url ? 'hidden' : ''}`}>🍽️</span>
            </div>
            <div className="flex-grow">
              <h5 className="font-semibold text-sm">{item.name}</h5>
              <p className="text-xs text-muted-foreground">€{item.price.toFixed(2)}</p>
              <AllergenIcons allergens={item.allergens} size="sm" />
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
    });
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
        {availableCategories.map((categoryKey) => {
          const categoryData = menuData[categoryKey];
          const categoryDisplayName = getCategoryDisplayName(categoryKey);
          
          return (
            <AccordionItem value={categoryKey} key={categoryKey} className="border-none">
              <AccordionTrigger className="hover:no-underline p-0 text-left">
                <div className="flex w-full items-center gap-4 p-3 border rounded-lg hover:bg-accent/10 transition-colors data-[state=open]:bg-accent/10">
                  <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl opacity-50">
                      {categoryKey === 'bebidas' ? '🍹' : '🍛'}
                    </span>
                  </div>
                  <h4 className="text-xl font-playfair font-bold text-accent">{categoryDisplayName}</h4>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                {categoryData.subcategories ? (
                  // Render subcategories
                  <Accordion 
                    type="single" 
                    collapsible 
                    className="w-full space-y-2"
                    value={openSubcategory}
                    onValueChange={setOpenSubcategory}
                  >
                    {categoryData.subcategories.map((subcategory) => (
                      <AccordionItem value={`${categoryKey}-${subcategory.title}`} key={subcategory.title} className="border border-muted rounded-lg">
                        <AccordionTrigger className="hover:no-underline px-4 py-2 text-left">
                          <h5 className="text-lg font-semibold text-accent">{subcategory.title}</h5>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-2">
                            {renderMenuItems(getItemsForSubcategory(categoryKey, subcategory.title))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  // Render items directly for categories without subcategories
                  <div className="space-y-2">
                    {renderMenuItems(getItemsForSubcategory(categoryKey))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default TakeawayMenu;
