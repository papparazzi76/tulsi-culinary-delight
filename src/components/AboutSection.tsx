import { useState, useEffect } from 'react';
import { MapPin, Clock, Users, Award } from 'lucide-react';
import interiorImg from '@/assets/restaurant-interior.jpg';
const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    const element = document.getElementById('about');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const features = [{
    icon: <Award className="w-8 h-8" />,
    title: "Cocina Auténtica",
    description: "Recetas tradicionales transmitidas de generación en generación"
  }, {
    icon: <Users className="w-8 h-8" />,
    title: "Chefs Expertos",
    description: "Nuestros chefs provienen directamente de diferentes regiones de la India"
  }, {
    icon: <MapPin className="w-8 h-8" />,
    title: "Ingredientes Premium",
    description: "Especias importadas y ingredientes frescos de la más alta calidad"
  }, {
    icon: <Clock className="w-8 h-8" />,
    title: "Tradición Centenaria",
    description: "Técnicas culinarias ancestrales adaptadas al paladar moderno"
  }];
  return <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image */}
          <div className={`lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative">
              <img src={interiorImg} alt="Interior elegante del restaurante Tulsi" className="rounded-2xl shadow-tulsi w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent rounded-2xl"></div>
              
              {/* Floating element */}
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-tulsi-glow">
                <div className="text-center">
                  <p className="text-2xl font-bold font-playfair">5+</p>
                  <p className="text-sm font-semibold">Años de Excelencia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`lg:w-1/2 text-center lg:text-left transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h2 className="text-5xl md:text-6xl font-bold text-accent mb-8 font-playfair">Nuestra Esencia</h2>
            
            <div className="space-y-6 mb-10">
              <p className="text-lg text-foreground leading-relaxed">
                En <span className="text-accent font-semibold">Tulsi</span>, cada plato cuenta una historia. 
                Nacimos de la pasión por la auténtica cocina india, combinando recetas tradicionales 
                con un toque de innovación.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nuestro compromiso es ofrecer una experiencia culinaria inolvidable, utilizando solo 
                los ingredientes más frescos y las especias más aromáticas, todo en un ambiente que 
                te transportará al corazón de la India.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Desde nuestros tandoors tradicionales hasta nuestras salsas preparadas con amor, 
                cada elemento de Tulsi está diseñado para despertar tus sentidos y crear memorias duraderas.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {features.map((feature, index) => <div key={index} className={`bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-tulsi-card ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{
              transitionDelay: `${(index + 2) * 200}ms`
            }}>
                  <div className="text-accent mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-playfair">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>)}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth'
            })} className="btn-tulsi">
                Visítanos
              </button>
              <button onClick={() => document.getElementById('menu')?.scrollIntoView({
              behavior: 'smooth'
            })} className="btn-tulsi-outline">
                Ver Carta
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;