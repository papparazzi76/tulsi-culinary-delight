import { useState, useEffect } from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCart, MenuItemType } from '@/hooks/useCart';
import { toast } from 'sonner';

interface TakeawayMenuProps {
  onOpenCart: () => void;
}

const TakeawayMenu = ({ onOpenCart }: TakeawayMenuProps) => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart, getCartCount } = useCart();

  const categories = ['all', 'Entrantes', 'Principales', 'Acompañamientos', 'Bebidas', 'Postres'];

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

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: MenuItemType) => {
    addToCart(item, 1);
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

      {/* Category filters */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-accent text-accent-foreground'
                : 'bg-secondary text-foreground hover:bg-accent/20'
            }`}
          >
            {category === 'all' ? 'Todos' : category}
          </button>
        ))}
      </div>

      {/* Menu items grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="menu-card group"
          >
            {/* Image placeholder */}
            <div className="w-full h-48 bg-secondary rounded-lg mb-4 flex items-center justify-center">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-4xl opacity-50">🍛</span>
              )}
            </div>

            {/* Item details */}
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="text-xl font-playfair font-bold text-accent">
                  {item.name}
                </h4>
                <span className="text-lg font-bold text-accent">
                  €{item.price.toFixed(2)}
                </span>
              </div>

              <p className="text-muted-foreground text-sm line-clamp-2">
                {item.description}
              </p>

              <button
                onClick={() => handleAddToCart(item)}
                className="btn-tulsi w-full flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            No hay platos disponibles en esta categoría
          </p>
        </div>
      )}
    </div>
  );
};

export default TakeawayMenu;