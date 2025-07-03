import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AnnouncementPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={closePopup}
    >
      <div 
        className="bg-card border border-accent/30 rounded-xl p-8 mx-4 max-w-md w-full text-center shadow-tulsi"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="announcement-title"
        aria-describedby="announcement-description"
      >
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-muted-foreground hover:text-accent transition-colors"
          aria-label="Cerrar anuncio"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="mb-4">
          <div className="w-16 h-16 bg-gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-accent-foreground">🍛</span>
          </div>
          
          <h2 
            id="announcement-title"
            className="text-2xl font-playfair font-bold text-accent mb-2"
          >
            Próxima Apertura
          </h2>
          
          <p 
            id="announcement-description"
            className="text-xl text-foreground font-semibold mb-4"
          >
            Agosto 2025
          </p>
          
          <p className="text-muted-foreground text-sm">
            ¡Prepárate para vivir una experiencia culinaria única!
          </p>
        </div>
        
        <button
          onClick={closePopup}
          className="btn-tulsi w-full"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default AnnouncementPopup;