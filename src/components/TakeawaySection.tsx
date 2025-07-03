import { useState, useEffect } from 'react';
import { ShoppingBag, Phone, Clock, MapPin, Store } from 'lucide-react';
import TakeawayMenu from './TakeawayMenu';
import CartModal from './CartModal';
import ContestModal from './ContestModal';

const TakeawaySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showContest, setShowContest] = useState(false);

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

    return () => observer.disconnect();
  }, []);

  const takeawayFeatures = [
    {
      icon: Clock,
      title: 'Horario de Recogida',
      description: 'Lunes a Jueves: 13:00-16:00 y 20:00-23:30\nViernes a Domingo: 13:00-16:30 y 20:00-00:00'
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
    <section id="takeaway" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            className={`text-5xl md:text-6xl font-bold text-accent mb-6 font-playfair transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Comida para Llevar
          </h2>
          <p 
            className={`text-xl mt-4 max-w-3xl mx-auto text-foreground leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Disfruta de nuestra auténtica cocina india en la comodidad de tu hogar. 
            Prepáramos cada plato con el mismo cuidado y dedicación para que puedas 
            disfrutar de los sabores de la India donde quieras.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {takeawayFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`text-center p-8 bg-secondary rounded-xl border border-border transition-all duration-500 hover:shadow-lg hover:scale-105 ${
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

        {/* Call to Action */}
        <div 
          className={`text-center bg-secondary p-12 rounded-xl border border-border transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-accent-foreground" />
            </div>
            <h3 className="text-3xl font-bold text-accent mb-4 font-playfair">
              ¡Haz tu Pedido Ahora!
            </h3>
            <p className="text-lg text-foreground mb-8 leading-relaxed">
              Llámanos y te preparamos tu pedido con los mejores ingredientes y especias 
              auténticas de la India. Tiempo de preparación: 15-25 minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowMenu(true)}
                className="btn-tulsi inline-flex items-center justify-center gap-3"
              >
                <Store className="w-5 h-5" />
                Pedir Online
              </button>
              <a 
                href="tel:+34645946202" 
                className="btn-tulsi-outline inline-flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                645 946 202
              </a>
              <a 
                href="tel:+34983844607" 
                className="btn-tulsi-outline inline-flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                983 844 607
              </a>
            </div>
          </div>
        </div>

        {/* Menu Modal */}
        {showMenu && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="min-h-screen py-8">
              <div className="container mx-auto px-6">
                <div className="bg-background rounded-xl p-8 max-w-6xl mx-auto relative">
                  <button
                    onClick={() => setShowMenu(false)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-accent transition-colors z-10"
                    aria-label="Cerrar menú"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                  
                  <TakeawayMenu onOpenCart={() => setShowCart(true)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cart Modal */}
        <CartModal
          isOpen={showCart}
          onClose={() => setShowCart(false)}
          onShowContest={() => setShowContest(true)}
        />

        {/* Contest Modal */}
        <ContestModal
          isOpen={showContest}
          onClose={() => setShowContest(false)}
          onProceedToPayment={() => {
            setShowContest(false);
            setShowCart(true);
          }}
        />
      </div>
    </section>
  );
};

export default TakeawaySection;