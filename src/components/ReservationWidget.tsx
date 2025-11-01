import { useEffect } from 'react';

const ReservationWidget = () => {
  useEffect(() => {
    // Configuración del widget de Dish
    (window as any)._hors = [
      ['eid', 'hydra-ff70f199-a058-4803-a48f-e47b2e341a1d'],
      ['tagid', 'hors-hydra-ff70f199-a058-4803-a48f-e47b2e341a1d'],
      ['width', '100%'],
      ['height', ''],
      ['foregroundColor', ''],
      ['backgroundColor', ''],
      ['linkColor', ''],
      ['errorColor', ''],
      ['primaryButtonForegroundColor', ''],
      ['primaryButtonBackgroundColor', ''],
      ['secondaryButtonForegroundColor', ''],
      ['secondaryButtonBackgroundColor', '']
    ];

    // Cargar el script de Dish
    const script = document.createElement('script');
    script.src = 'https://reservation.dish.co/widget.js';
    script.async = true;
    
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    return () => {
      // Cleanup: remover el script cuando el componente se desmonte
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-accent mb-4 font-playfair">
          Reserva tu Mesa
        </h3>
        <p className="text-muted-foreground">
          Reserva directamente desde aquí o llámanos
        </p>
      </div>
      
      <div className="relative rounded-xl overflow-hidden shadow-tulsi border-2 border-accent/20 min-h-[700px]">
        <div id="hors-hydra-ff70f199-a058-4803-a48f-e47b2e341a1d"></div>
      </div>
    </div>
  );
};

export default ReservationWidget;