import { useState } from 'react';

const ReservationWidget = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

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
      
      <div className="relative rounded-xl overflow-hidden shadow-tulsi border-2 border-accent/20">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando sistema de reservas...</p>
            </div>
          </div>
        )}
        
        <iframe 
          src="https://app.tableo.com/r/wyijJGK" 
          width="100%" 
          height="100%" 
          style={{ border: 'none', minHeight: '700px' }} 
          referrerPolicy="unsafe-url"
          onLoad={handleLoad}
          title="Sistema de Reservas Tableo"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ReservationWidget;