import { Star, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const FeedbackWidget = () => {
  const googleReviewsUrl = 'https://share.google/LDP1jI3I3Tt2hrzRE';
  
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
        
        <div className="max-w-4xl mx-auto">
          {/* Google Reviews Card */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <div className="flex justify-center items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-8 h-8 fill-yellow-400 text-yellow-400" 
                />
              ))}
            </div>
            
            <div className="mb-6">
              <img 
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" 
                alt="Google" 
                className="h-10 mx-auto mb-4"
              />
              <p className="text-2xl font-semibold text-foreground mb-2">
                Tulsi Indian Restaurant
              </p>
              <p className="text-muted-foreground">
                Valoraciones y reseñas verificadas en Google
              </p>
            </div>
            
            <Button 
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8"
            >
              <a 
                href={googleReviewsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Ver Reseñas en Google
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            
            <p className="text-sm text-muted-foreground mt-6">
              ¿Has visitado nuestro restaurante? ¡Déjanos tu opinión!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackWidget;
