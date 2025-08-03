import { useState, useEffect } from 'react';
import { menuData } from '@/data/menuData';
import { degustacion } from '@/data/degustacion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category: string;
}

interface MenuCategory {
  title: string;
  items?: MenuItem[];
  subcategories?: {
    title: string;
    items: MenuItem[];
  }[];
}

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState('degustacion');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('menu');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .order('category', { ascending: true });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error) {
      console.error('Error loading menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'degustacion', label: 'Menús Degustación' },
    { id: 'entrantes', label: 'Entrantes' },
    { id: 'principales', label: 'Platos Principales' },
    { id: 'biryani', label: 'Biryani' },
    { id: 'vegetales', label: 'Vegetales' },
    { id: 'panes', label: 'Acompañamientos y Panes' }
  ];

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const getItemsForCategory = (categoryDisplayName: string, subcategoryTitle?: string) => {
    if (!subcategoryTitle) {
      return menuItems.filter(item => item.category === categoryDisplayName);
    }
    
    // For subcategories, we need to match the item name with the subcategory items
    const categoryKey = tabs.find(tab => tab.label === categoryDisplayName)?.id;
    if (!categoryKey || !menuData[categoryKey as keyof typeof menuData]) return [];
    
    const categoryData = menuData[categoryKey as keyof typeof menuData];
    if (!categoryData?.subcategories) return [];
    
    const subcategory = categoryData.subcategories.find(sub => sub.title === subcategoryTitle);
    if (!subcategory) return [];
    
    const subcategoryItemNames = subcategory.items.map(item => item.name);
    return menuItems.filter(item => 
      item.category === categoryDisplayName && subcategoryItemNames.includes(item.name)
    );
  };

  const renderMenuItems = (items: MenuItem[]) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div 
          key={item.id} 
          className={`menu-card-interactive group cursor-pointer transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
          onClick={() => handleItemClick(item)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleItemClick(item);
            }
          }}
          aria-label={`Ver detalles de ${item.name}`}
        >
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center z-10">
            <div className="w-4/5 aspect-video bg-muted/80 rounded-lg border-2 border-accent/50 flex items-center justify-center overflow-hidden">
              {item.image_url ? (
                <img 
                  src={item.image_url} 
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-accent text-sm font-medium text-center px-4">
                  Imagen del plato
                  <br />
                  <span className="text-xs text-muted-foreground">Próximamente</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="relative z-0 group-hover:opacity-60 transition-opacity duration-300">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-xl font-semibold text-foreground font-playfair">
                {item.name}
              </h4>
              <span className="text-lg font-bold text-accent ml-4 flex-shrink-0">
                €{item.price.toFixed(2)}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
  
  const renderTastingMenus = () => (
    <div className="space-y-12">
      <p className="text-center text-lg text-muted-foreground">{degustacion.note}</p>
      {degustacion.menus.map((menu, index) => (
        <div key={index} className="bg-card border border-border rounded-xl p-6 transition-all duration-300">
          <h3 className="text-2xl md:text-3xl font-bold text-accent mb-2 font-playfair">{menu.name}</h3>
          <p className="text-sm md:text-md text-muted-foreground mb-6">{menu.price}</p>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(menu.sections).map(([sectionTitle, items]) => (
              <div key={sectionTitle} className="bg-secondary p-4 rounded-lg">
                <h4 className="text-xl font-semibold text-foreground font-playfair mb-4 border-b pb-2">{sectionTitle}</h4>
                <ul className="space-y-2">
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-muted-foreground">{item.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const getCategoryDisplayName = (categoryKey: string): string => {
    const categoryMap: { [key: string]: string } = {
      'entrantes': 'Entrantes',
      'principales': 'Principales', 
      'biryani': 'Biryani',
      'vegetales': 'Vegetales',
      'panes': 'Acompañamientos y Panes',
      'postres': 'Postres'
    };
    return categoryMap[categoryKey] || categoryKey;
  };

  const renderMenuCategory = (categoryKey: string) => {
    if (categoryKey === 'degustacion') return renderTastingMenus();
    
    const categoryDisplayName = getCategoryDisplayName(categoryKey);
    const categoryData = menuData[categoryKey as keyof typeof menuData];
    
    if (!categoryData) return null;
    
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      );
    }
    
    if (categoryData.subcategories) {
      return (
        <div className="space-y-12">
          {categoryData.subcategories.map((subcategory, index) => (
            <div key={index}>
              <h3 className="text-3xl font-bold text-accent mb-8 border-b-2 border-accent/30 pb-3 font-playfair">
                {subcategory.title}
              </h3>
              {renderMenuItems(getItemsForCategory(categoryDisplayName, subcategory.title))}
            </div>
          ))}
        </div>
      );
    }
    
    return renderMenuItems(getItemsForCategory(categoryDisplayName));
  };

  return (
    <>
      <section id="menu" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 
              className={`text-4xl md:text-6xl font-bold text-accent mb-6 font-playfair transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Nuestra Carta
            </h2>
            <p 
              className={`text-lg md:text-xl mt-4 max-w-3xl mx-auto text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              La mejor carta de cocina india en Valladolid. Un viaje de sabores auténticos, 
              preparados con pasión y las mejores especias traídas directamente desde la India.
            </p>
          </div>

          <div 
            className={`mb-12 flex flex-wrap justify-center gap-x-2 gap-y-4 border-b border-accent/30 pb-6 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div 
            className={`transition-all duration-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {activeTab === 'degustacion' 
              ? renderTastingMenus()
              : renderMenuCategory(activeTab)}
          </div>
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent 
          className="max-w-md max-h-[90vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle id="menu-item-title" className="text-2xl font-playfair text-accent">
              {selectedItem?.name}
            </DialogTitle>
            <DialogClose 
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Cerrar modal"
            >
              <X className="h-4 w-4" />
            </DialogClose>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-6 pt-4">
              <div className="aspect-video w-full bg-muted/50 rounded-lg border-2 border-dashed border-accent/30 flex items-center justify-center overflow-hidden">
                {selectedItem.image_url ? (
                  <img 
                    src={selectedItem.image_url} 
                    alt={selectedItem.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <div className="text-lg font-medium">Imagen próximamente</div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center border-b border-accent/20 pb-4">
                <span className="text-sm text-muted-foreground">Precio</span>
                <span className="text-2xl font-bold text-accent">€{selectedItem.price.toFixed(2)}</span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-playfair">Descripción</h3>
                <DialogDescription className="text-muted-foreground leading-relaxed">
                  {selectedItem.description}
                </DialogDescription>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuSection;
