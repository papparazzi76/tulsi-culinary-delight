import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    _hors: string[][];
  }
}

const RESERVATION_ID = 'hydra-ff70f199-a058-4803-a48f-e47b2e341a1d';

const DishReservationWidget = () => {
  const [loaded, setLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const loadDishReservations = () => {
    if (loaded) return;
    window._hors = [
      ['eid', RESERVATION_ID],
      ['tagid', 'hors-' + RESERVATION_ID],
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
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded || document.querySelector('script[src="https://reservation.dish.co/widget.js"]')) return;
    const script = document.createElement('script');
    script.src = 'https://reservation.dish.co/widget.js';
    script.async = true;
    script.onerror = () => setLoadFailed(true);
    document.body.appendChild(script);
  }, [loaded]);

  return (
    <section id="reservas" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4">Reserva tu Mesa</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Reserva online de forma rápida y sencilla.</p>
        </div>
        <div className="max-w-2xl mx-auto bg-card rounded-xl p-6 border border-border shadow-tulsi text-center space-y-4">
          {!loaded ? (
            <>
              <p className="text-sm text-muted-foreground">El formulario lo presta Dish y solo se cargará cuando pulses el botón. El proveedor puede aplicar sus propias cookies y políticas. Consulta nuestra <Link to="/legal/cookies" className="underline text-accent">política de cookies</Link> y <Link to="/legal/privacidad" className="underline text-accent">política de privacidad</Link>.</p>
              <button type="button" onClick={loadDishReservations} className="btn-tulsi">Aceptar y cargar reservas de Dish</button>
            </>
          ) : (
            <>
              <div id={"hors-" + RESERVATION_ID}></div>
              {loadFailed && <p role="alert" className="text-sm text-destructive">No se pudo cargar el formulario. Puedes reservar llamando al <a className="underline" href="tel:+34983844607">+34 983 84 46 07</a>.</p>}
            </>
          )}
        </div>
        <div className="text-center mt-8">
          <p className="text-muted-foreground">¿Prefieres llamar? <a href="tel:+34983844607" className="text-accent hover:underline font-semibold">+34 983 84 46 07</a></p>
        </div>
      </div>
    </section>
  );
};

export default DishReservationWidget;
