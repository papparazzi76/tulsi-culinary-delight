import { useState, useEffect } from 'react';
import { ShoppingBag, Phone, Clock, MapPin } from 'lucide-react';
import TakeawayMenu from './TakeawayMenu';
import CartSheet from './CartSheet'; // Asegúrate de que este componente exista y funcione

const TakeawaySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('takeaway');
    if (element) observer.observe(element);

    return () => {
      if(element) observer.unobserve(element);
    };
  }, []);

  const takeawayFeatures = [
    {
      icon: Clock,
      title: 'Horario de Recogida',
      description: 'Lunes a Domingo: 13:00-16:00 y 20:00-23:30'
    },
    {
      icon: Phone,
      title: 'Pedidos por Teléfono',
      description: '+34 645 946 202\n+34 983 844 607'
    },
    {
      icon: MapPin,
      title: 'Recogida en Local',
      description: 'Calle Marina Escobar, 1\n47001 Valladolid'
    }
  ];

  return (
    <>
      <section id="takeaway" className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 
              className={`text-4xl md:text-6xl font-bold text-accent mb-6 font-playfair transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Comida para Llevar
            </h2>
            <p 
              className={`text-lg md:text-xl mt-4 max-w-3xl mx-auto text-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Disfruta de nuestra auténtica cocina india en la comodidad de tu hogar. 
              Preparamos cada plato con el mismo cuidado para que goces de los sabores de la India donde quieras.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {takeawayFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`text-center p-6 bg-secondary rounded-xl border border-border transition-all duration-500 hover:shadow-lg hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200 + 400}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-accent mb-4 font-playfair">
                  {feature.title}
                </h3>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div 
            className={`text-center bg-secondary p-8 sm:p-12 rounded-xl border border-border transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-accent-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-accent mb-4 font-playfair">
                ¡Haz tu Pedido Online!
              </h3>
              <p className="text-lg text-foreground mb-8 leading-relaxed">
                Explora nuestra carta, elige tus platos favoritos y haz tu pedido directamente desde nuestra web.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowMenu(true)}
                  className="btn-tulsi"
                >
                  Ver Menú y Pedir Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Menu Modal --- */}
      {showMenu && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-background rounded-xl max-w-4xl w-[95%] max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-2xl font-playfair text-accent">Realizar Pedido</h2>
                <button
                  onClick={() => setShowMenu(false)}
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label="Cerrar"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <div className="p-1 sm:p-6 overflow-y-auto">
                <TakeawayMenu onOpenCart={() => {
                  setShowMenu(false);
                  setIsCartOpen(true);
                }} />
              </div>
            </div>
        </div>
      )}

      {/* --- Cart Sheet --- */}
      <CartSheet isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
};

export default TakeawaySection;
