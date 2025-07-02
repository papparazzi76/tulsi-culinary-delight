import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-tulsi' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex-1"></div>
          <button 
            onClick={() => scrollToSection('hero')}
            className="hover:scale-105 transition-transform duration-300"
          >
            <img 
              src="/lovable-uploads/5aa953a7-6eb1-4763-9cbb-6075a6ebac8e.png" 
              alt="Tulsi Logo" 
              className="h-20 w-auto"
            />
          </button>
          <div className="flex-1 flex justify-end">
          
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('menu')} className="nav-link">
              Carta
            </button>
            <button onClick={() => scrollToSection('gallery')} className="nav-link">
              Galería
            </button>
            <button onClick={() => scrollToSection('about')} className="nav-link">
              Nosotros
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">
              Contacto
            </button>
          </nav>
          
          <a 
            href="https://www.thefork.es/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 btn-tulsi"
          >
            Reservar
            <ExternalLink className="w-4 h-4" />
          </a>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-accent text-3xl hover:scale-110 transition-transform duration-300"
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center space-y-8">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-accent text-4xl hover:scale-110 transition-transform duration-300"
          >
            <X />
          </button>
          
          <button 
            onClick={() => scrollToSection('menu')} 
            className="text-2xl text-accent hover:scale-110 transition-transform duration-300"
          >
            Carta
          </button>
          <button 
            onClick={() => scrollToSection('gallery')} 
            className="text-2xl text-accent hover:scale-110 transition-transform duration-300"
          >
            Galería
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-2xl text-accent hover:scale-110 transition-transform duration-300"
          >
            Nosotros
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="text-2xl text-accent hover:scale-110 transition-transform duration-300"
          >
            Contacto
          </button>
          
          <a 
            href="https://www.thefork.es/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-tulsi mt-4 flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Reservar Mesa
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </>
  );
};

export default Navigation;