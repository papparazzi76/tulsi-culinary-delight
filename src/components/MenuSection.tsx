import { useState, useEffect } from 'react';
import { menuData } from '@/data/menuData';

interface MenuItem {
  name: string;
  description: string;
  price: string;
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
  const [activeTab, setActiveTab] = useState('especiales');
  const [isVisible, setIsVisible] = useState(false);

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

    return () => observer.disconnect();
  }, []);

  const tabs = [
    { id: 'especiales', label: 'Especial de Tulsi' },
    { id: 'entrantes', label: 'Entrantes' },
    { id: 'principales', label: 'Platos Principales' },
    { id: 'biryani', label: 'Biryani' },
    { id: 'vegetales', label: 'Vegetales' },
    { id: 'panes', label: 'Acompañamientos' }
  ];

  const renderMenuItems = (items: MenuItem[]) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`menu-card transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="flex justify-between items-start mb-3">
            <h4 className="text-xl font-semibold text-foreground font-playfair">
              {item.name}
            </h4>
            <span className="text-lg font-bold text-accent ml-4 flex-shrink-0">
              {item.price}
            </span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );

  const renderMenuCategory = (category: MenuCategory) => {
    if (category.subcategories) {
      return (
        <div className="space-y-12">
          {category.subcategories.map((subcategory, index) => (
            <div key={index}>
              <h3 className="text-3xl font-bold text-accent mb-8 border-b-2 border-accent/30 pb-3 font-playfair">
                {subcategory.title}
              </h3>
              {renderMenuItems(subcategory.items)}
            </div>
          ))}
        </div>
      );
    }
    
    return category.items ? renderMenuItems(category.items) : null;
  };

  return (
    <section id="menu" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            className={`text-5xl md:text-6xl font-bold text-accent mb-6 font-playfair transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Nuestra Carta
          </h2>
          <p 
            className={`text-xl mt-4 max-w-3xl mx-auto text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Un viaje de sabores auténticos, preparados con pasión y las mejores especias 
            traídas directamente desde la India.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div 
          className={`mb-16 flex flex-wrap justify-center gap-x-2 gap-y-4 border-b border-accent/30 pb-6 transition-all duration-1000 delay-300 ${
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

        {/* Menu Content */}
        <div 
          className={`transition-all duration-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {renderMenuCategory(menuData[activeTab as keyof typeof menuData])}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;