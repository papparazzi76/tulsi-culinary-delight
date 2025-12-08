import { useState } from 'react';
import { ShoppingBag, Phone, Clock, MapPin, Truck, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import TakeawayMenu from '@/components/TakeawayMenu';
import CartModal from '@/components/CartModal';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import logoJustEat from '@/assets/logo-just-eat.png';
import logoGlovo from '@/assets/logo-glovo.png';

const JUST_EAT_URL = 'https://www.just-eat.es/restaurants-tulsi-indian-restaurant-valladolid/menu?serviceType=collection&utm_source=google&utm_medium=organic&utm_campaign=foodorder';
const GLOVO_URL = 'https://glovoapp.com/es/es/valladolid/stores/tulsi-indian-restaurant-valladolid?utm_source=google&utm_medium=organic&utm_campaign=google_reserve_place_order_action';

const PedidosOnline = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

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
      description: 'C/ Marina Escobar, 1\n47001 Valladolid'
    },
    {
      icon: Truck,
      title: 'Entrega a Domicilio',
      description: 'Disponible a través de\nGlovo y Just Eat'
    }
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-primary">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Volver a la página principal
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-accent mb-6 font-playfair">
              Pedidos Online
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-foreground leading-relaxed">
              Disfruta de nuestra auténtica cocina india en la comodidad de tu hogar. 
              Prepáramos cada plato con el mismo cuidado y dedicación para que puedas 
              disfrutar de los sabores de la India donde quieras.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {takeawayFeatures.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-secondary rounded-xl border border-border transition-all duration-300 hover:shadow-lg hover:scale-105"
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
          <div className="text-center bg-secondary p-12 rounded-xl border border-border">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-accent-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-accent mb-4 font-playfair">
                ¡Haz tu Pedido Ahora!
              </h2>
              <p className="text-lg text-foreground mb-8 leading-relaxed">
                Llámanos y te preparamos tu pedido con los mejores ingredientes y especias 
                auténticas de la India. Tiempo de preparación: 15-25 minutos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setShowMenu(true)}
                  className="btn-tulsi inline-flex items-center justify-center gap-3"
                  size="lg"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Ver Menú y Pedir
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="btn-tulsi-outline"
                >
                  <a href="tel:+34645946202" className="inline-flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    645 946 202
                  </a>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="btn-tulsi-outline"
                >
                  <a href="tel:+34983844607" className="inline-flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    983 844 607
                  </a>
                </Button>
              </div>
              </div>
              
              {/* Delivery Options */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-xl font-bold text-accent mb-4 font-playfair text-center">
                  ¿Prefieres entrega a domicilio?
                </h3>
                <p className="text-muted-foreground mb-6 text-center">
                  Pide a través de nuestros partners de delivery
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={GLOVO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-[#FFC244] hover:bg-[#FFD060] text-[#00A082] font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <img src={logoGlovo} alt="Glovo" className="h-8 w-auto" />
                    <span>Pedir en Glovo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={JUST_EAT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-[#FF8000] hover:bg-[#FF9020] text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <img src={logoJustEat} alt="Just Eat" className="h-8 w-auto" />
                    <span>Pedir en Just Eat</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

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
        onShowContest={(paymentCallback) => paymentCallback()}
      />

      <Footer />
      <Toaster />
    </div>
  );
};

export default PedidosOnline;
