import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

const ContactSection = () => {
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

    const element = document.getElementById('contact');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Dirección",
      content: "Calle Marina Escobar 1, Valladolid",
      link: "https://maps.google.com/?q=Calle+Marina+Escobar+1+Valladolid"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Teléfono Móvil",
      content: "+34 645 94 62 02",
      link: "tel:+34645946202"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Teléfono Fijo",
      content: "+34 983 84 46 07",
      link: "tel:+34983844607"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "tulsindian@gmail.com",
      link: "mailto:tulsindian@gmail.com"
    }
  ];

  const schedule = [
    { days: "Lunes a Domingo", hours: "13:00-16:00 y 20:00-23:30" }
  ];

  return (
    <section id="contact" className="py-20 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            className={`text-5xl md:text-6xl font-bold text-accent mb-6 font-playfair transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Encuéntranos
          </h2>
          <p 
            className={`text-xl mt-4 max-w-3xl mx-auto text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Estamos deseando darte la bienvenida a nuestra mesa. 
            Ven y descubre el auténtico sabor de la India en el corazón de Valladolid.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div 
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Contact Details */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-accent mb-6 font-playfair">
                Información de Contacto
              </h3>
              
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300 hover:shadow-tulsi-card group"
                >
                  <div className="text-accent group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">
                      {info.title}
                    </h4>
                    <p className="text-muted-foreground group-hover:text-accent transition-colors duration-300">
                      {info.content}
                    </p>
                  </div>
                  {info.link.startsWith('http') && (
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-300 ml-auto" />
                  )}
                </a>
              ))}
            </div>

            {/* Schedule */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-accent mb-6 font-playfair flex items-center gap-3">
                <Clock className="w-8 h-8" />
                Horario
              </h3>
              
              <div className="space-y-4">
                {schedule.map((item, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center p-4 bg-card border border-border rounded-xl"
                  >
                    <span className="text-lg font-medium text-foreground">
                      {item.days}
                    </span>
                    <span className="text-accent font-semibold">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Map */}
          <div 
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div id="mapa" className="min-h-96 lg:min-h-[600px] rounded-2xl shadow-tulsi border-2 border-accent/20 bg-card p-8 flex flex-col items-center justify-center text-center gap-5">
              <MapPin className="w-12 h-12 text-accent" aria-hidden="true" />
              <div>
                <h3 className="text-2xl font-semibold text-accent">Tulsi Indian Restaurant</h3>
                <p className="mt-2 text-muted-foreground">C/ Marina Escobar, 1, 47001 Valladolid</p>
              </div>
              <a href="https://maps.google.com/?q=Calle+Marina+Escobar+1+Valladolid" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-accent px-5 py-3 text-accent hover:bg-accent/10">
                Abrir ubicación en Google Maps <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
