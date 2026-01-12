import { useEffect } from 'react';

declare global {
  interface Window {
    _hors: string[][];
  }
}

const DishReservationWidget = () => {
  useEffect(() => {
    // Colores adaptados a la paleta de Tulsi
    // Background: #4A442A (hsl 41 31% 16%)
    // Foreground: #D9C99A (hsl 52 43% 73%) - accent/gold
    // Link: #D9C99A
    // Error: #ef4444
    // Primary button: bg #D9C99A, fg #4A442A
    // Secondary button: bg transparent, fg #D9C99A
    
    window._hors = [
      ['eid', 'hydra-ff70f199-a058-4803-a48f-e47b2e341a1d'],
      ['tagid', 'hors-hydra-ff70f199-a058-4803-a48f-e47b2e341a1d'],
      ['width', '100%'],
      ['height', ''],
      ['foregroundColor', '#D9C99A'],
      ['backgroundColor', '#4A442A'],
      ['linkColor', '#D9C99A'],
      ['errorColor', '#ef4444'],
      ['primaryButtonForegroundColor', '#4A442A'],
      ['primaryButtonBackgroundColor', '#D9C99A'],
      ['secondaryButtonForegroundColor', '#D9C99A'],
      ['secondaryButtonBackgroundColor', 'transparent']
    ];

    // Cargar el script de Dish
    const existingScript = document.querySelector('script[src="https://reservation.dish.co/widget.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://reservation.dish.co/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup si es necesario
    };
  }, []);

  return (
    <section id="reservas" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4">
            Reserva tu Mesa
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reserva online de forma rápida y sencilla
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-card rounded-xl p-6 border border-border shadow-tulsi">
          <div id="hors-hydra-ff70f199-a058-4803-a48f-e47b2e341a1d"></div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            ¿Prefieres llamar? <a href="tel:+34983070117" className="text-accent hover:underline font-semibold">983 070 117</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DishReservationWidget;
