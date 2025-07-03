import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(74, 68, 42, 0.7), rgba(74, 68, 42, 0.8)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-accent/20">
          <h1 
            className={`text-5xl md:text-8xl font-playfair font-bold text-white mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            TULSI
          </h1>
          
          <p 
            className={`text-xl md:text-3xl text-accent mb-8 font-medium transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            El Alma de la Cocina India
          </p>
          
          <p 
            className={`text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Descubre los sabores auténticos de la India en cada bocado. 
            Una experiencia culinaria que despierta todos tus sentidos.
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-tulsi flex items-center gap-2 text-lg px-10 py-4"
            >
              Reservar Mesa
            </button>
            
            <button 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-tulsi-outline text-lg px-10 py-4"
            >
              Ver Carta
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-accent rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-accent rounded-full animate-pulse opacity-80 animation-delay-2000"></div>
      </div>
    </section>
  );
};

export default HeroSection;