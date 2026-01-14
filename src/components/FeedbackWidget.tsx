import { useState, useEffect } from 'react';
import { Star, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { supabase } from '@/integrations/supabase/client';

interface ReviewData {
  rating: number;
  totalReviews: number;
  name: string;
}

const FeedbackWidget = () => {
  const googleReviewsUrl = 'https://share.google/9pl5cA89i5CuajW8Y';
  
  const [reviewData, setReviewData] = useState<ReviewData>({
    rating: 4.7,
    totalReviews: 312,
    name: 'Tulsi Indian Restaurant'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-google-reviews');
        
        if (error) {
          console.error('Error fetching reviews:', error);
          return;
        }
        
        if (data) {
          setReviewData({
            rating: data.rating,
            totalReviews: data.totalReviews,
            name: data.name
          });
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);
  
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => {
      const starValue = i + 1;
      const isHovered = hoveredStar !== null && starValue <= hoveredStar;
      const isFilled = starValue <= Math.floor(rating);
      const isPartial = starValue === Math.ceil(rating) && rating % 1 !== 0;
      const partialWidth = isPartial ? `${(rating % 1) * 100}%` : '0%';
      
      return (
        <div 
          key={i} 
          className="relative cursor-pointer transition-transform hover:scale-110"
          onMouseEnter={() => setHoveredStar(starValue)}
          onMouseLeave={() => setHoveredStar(null)}
          onClick={() => window.open(googleReviewsUrl, '_blank')}
        >
          {/* Background star (empty) */}
          <Star 
            className={`w-8 h-8 transition-colors ${
              isHovered ? 'text-yellow-300' : 'text-muted-foreground/30'
            }`}
          />
          {/* Foreground star (filled) */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ width: isFilled ? '100%' : partialWidth }}
          >
            <Star 
              className={`w-8 h-8 fill-yellow-400 text-yellow-400 transition-colors ${
                isHovered ? 'fill-yellow-300 text-yellow-300' : ''
              }`}
            />
          </div>
        </div>
      );
    });
  };
  
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
            {/* Interactive Star Rating */}
            <div className="mb-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-4">
                  <Loader2 className="w-8 h-8 animate-spin text-accent" />
                </div>
              ) : (
                <>
                  <div className="flex justify-center items-center gap-1 mb-3">
                    {renderStars(reviewData.rating)}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-foreground">{reviewData.rating}</span>
                    <span className="text-muted-foreground">/ 5</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Basado en {reviewData.totalReviews.toLocaleString()} reseñas
                  </p>
                </>
              )}
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
              ¿Has visitado nuestro restaurante? ¡Haz clic en las estrellas para dejarnos tu opinión!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackWidget;
