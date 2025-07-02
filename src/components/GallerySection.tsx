import { useState, useEffect } from 'react';
import appetizersImg from '@/assets/appetizers.jpg';
import butterChickenImg from '@/assets/butter-chicken.jpg';
import biryaniImg from '@/assets/biryani.jpg';
import naanImg from '@/assets/naan-breads.jpg';
import interiorImg from '@/assets/restaurant-interior.jpg';

const GallerySection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('gallery');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const galleryImages = [
    {
      src: appetizersImg,
      alt: "Deliciosos entrantes indios - samosas y pakoras",
      title: "Entrantes Tradicionales"
    },
    {
      src: butterChickenImg,
      alt: "Butter chicken cremoso con arroz basmati",
      title: "Butter Chicken"
    },
    {
      src: biryaniImg,
      alt: "Aromático biryani de cordero con especias",
      title: "Biryani Especial"
    },
    {
      src: naanImg,
      alt: "Variedad de panes naan recién horneados",
      title: "Panes del Tandoor"
    },
    {
      src: interiorImg,
      alt: "Interior elegante del restaurante Tulsi",
      title: "Nuestro Ambiente"
    },
    {
      src: appetizersImg,
      alt: "Platos vegetarianos con especias frescas",
      title: "Opciones Vegetarianas"
    }
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <>
      <section id="gallery" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 
              className={`text-5xl md:text-6xl font-bold text-accent mb-6 font-playfair transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Galería de Sabores
            </h2>
            <p 
              className={`text-xl mt-4 max-w-3xl mx-auto text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Una muestra visual de la pasión que ponemos en cada plato. 
              Cada imagen cuenta la historia de sabores auténticos y tradiciones culinarias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-2xl shadow-tulsi-card cursor-pointer transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-playfair text-xl font-semibold mb-2">
                      {image.title}
                    </h3>
                    <p className="text-gray-200 text-sm">
                      Haz clic para ver en detalle
                    </p>
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 border-2 border-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-3xl hover:text-accent transition-colors z-10"
            >
              ×
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-accent transition-colors z-10"
            >
              ←
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-accent transition-colors z-10"
            >
              →
            </button>

            <div className="relative">
              <img 
                src={galleryImages[selectedImage].src} 
                alt={galleryImages[selectedImage].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white font-playfair text-2xl font-semibold mb-2">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-gray-200">
                  {galleryImages[selectedImage].alt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GallerySection;