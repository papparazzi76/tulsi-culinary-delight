import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Facebook className="w-6 h-6" />,
      href: "#",
      label: "Facebook"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      href: "#",
      label: "Instagram"
    },
    {
      icon: <Youtube className="w-6 h-6" />,
      href: "#",
      label: "YouTube"
    }
  ];

  const quickLinks = [
    { label: "Carta", href: "#menu" },
    { label: "Galería", href: "#gallery" },
    { label: "Nosotros", href: "#about" },
    { label: "Contacto", href: "#contact" }
  ];

  const contactInfo = [
    {
      icon: <MapPin className="w-4 h-4" />,
      text: "Calle Marina Escobar 1, Valladolid"
    },
    {
      icon: <Phone className="w-4 h-4" />,
      text: "+34 645 94 62 02"
    },
    {
      icon: <Phone className="w-4 h-4" />,
      text: "+34 983 84 46 07"
    },
    {
      icon: <Mail className="w-4 h-4" />,
      text: "reservas@tulsiindianvalladolid.com"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-tulsi-brown-darker text-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img 
              src="/lovable-uploads/5aa953a7-6eb1-4763-9cbb-6075a6ebac8e.png" 
              alt="Tulsi Logo" 
              className="h-16 w-auto mb-6"
            />
            <p className="text-muted-foreground leading-relaxed mb-6">
              El alma de la cocina india en el corazón de Valladolid. 
              Sabores auténticos que despiertan todos tus sentidos.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold text-accent mb-6 font-playfair">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-accent transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="https://www.thefork.es/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  Reservar Mesa
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold text-accent mb-6 font-playfair">
              Contacto
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="text-accent mt-1">
                    {info.icon}
                  </div>
                  <span className="text-muted-foreground">
                    {info.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xl font-semibold text-accent mb-6 font-playfair">
              Horarios
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium">Lunes a Domingo</p>
                <p className="text-muted-foreground text-sm">13:00 - 16:00</p>
                <p className="text-muted-foreground text-sm">20:00 - 23:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-accent/20 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-center md:text-left">
              &copy; {currentYear} Tulsi Indian Restaurant. Todos los derechos reservados.
            </p>
            <p className="text-muted-foreground text-sm text-center md:text-right">
              Diseñado con ♥ en Valladolid
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;