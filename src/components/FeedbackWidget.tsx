import { useEffect } from 'react';

const FeedbackWidget = () => {
  useEffect(() => {
    // Configuración del widget de comentarios de Dish
    (window as any)._horsFeedback = [
      ['eid', 'hydra-ff70f199-a058-4803-a48f-e47b2e341a1d'],
      ['tagid', 'hors-feedbackPreview-hydra-ff70f199-a058-4803-a48f-e47b2e341a1d'],
      ['width', '100%'],
      ['height', '330'],
      ['mainColor', ''],
      ['feedbackBackgroundColor', ''],
      ['fontFamily', '']
    ];

    // Cargar el script de Dish Feedback
    const script = document.createElement('script');
    script.src = 'https://reservation.dish.co/feedbackWidget.js';
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
    <section className="py-20 bg-background" id="reviews">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4 font-playfair">
            Opiniones de Nuestros Clientes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Lee lo que nuestros clientes dicen sobre su experiencia en Tulsi
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div id="hors-feedbackPreview-hydra-ff70f199-a058-4803-a48f-e47b2e341a1d"></div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackWidget;
