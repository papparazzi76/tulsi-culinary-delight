import { useState, useEffect } from 'react';

const DiningRoomGallery = () => {
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

    const element = document.getElementById('dining-room-gallery');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const diningRoomImages = [
    {
      src: '/lovable-uploads/4031f706-7a57-4fb2-bad3-77d8235cc899.png',
      alt: "Mesa elegante del restaurante Tulsi Valladolid con montaje refinado y ambiente acogedor para cenas especiales",
      title: "Mesa Principal"
    },
    {
      src: '/lovable-uploads/f059701f-311d-4c20-ad85-423fb000098b.png',
      alt: "Comedor principal del restaurante indio Tulsi con jardines verticales y diseño moderno en Valladolid",
      title: "Zona Principal del Comedor"
    },
    {
      src: '/lovable-uploads/6f86abc6-651e-4fe9-9e8c-1088b42b44ad.png',
      alt: "Área VIP del restaurante Tulsi con arte indio auténtico y ambiente íntimo para ocasiones especiales",
      title: "Área VIP"
    },
    {
      src: '/lovable-uploads/7cbe94bb-2238-45c8-ab94-04d7b0e693d4.png',
      alt: "Mesa junto a ventana del restaurante Tulsi con vista a la calle y ambiente luminoso en Valladolid",
      title: "Mesa con Vista"
    },
    {
      src: '/lovable-uploads/517efe56-de11-4018-9361-4b7385f5eea0.png',
      alt: "Mesa íntima del restaurante Tulsi con jardín vertical y decoración moderna para citas románticas",
      title: "Mesa Íntima"
    },
    {
      src: '/lovable-uploads/c6dba2ca-1c6c-4aef-a322-0cfb66c4b1de.png',
      alt: "Zona central del comedor Tulsi con mesas preparadas y ambiente cálido para grupos familiares",
      title: "Zona Central"
    },
    {
      src: '/lovable-uploads/c2c06334-1344-4841-a2ae-2eb65d32d19c.png',
      alt: "Comedor con jardines verticales del restaurante Tulsi - diseño sostenible y elegante en Valladolid",
      title: "Jardines Verticales"
    },
    {
      src: '/lovable-uploads/a721253e-8373-4e30-8a58-99cd43769080.png',
      alt: "Bar y bodega del restaurante Tulsi con selección premium de vinos y licores para maridajes perfectos",
      title: "Bar y Bodega"
    },
    {
      src: '/lovable-uploads/1f6fbc0d-a76c-43b0-b856-770377d793fc.png',
      alt: "Vista panorámica del comedor Tulsi con todas las mesas preparadas para servicio de alta calidad",
      title: "Vista General"
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
    setSelectedImage((prev) => (prev + 1) % diningRoomImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + diningRoomImages.length) % diningRoomImages.length);
  };

  return (
    <>
      <section id="dining-room-gallery" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 
              className={`text-5xl md:text-6xl font-bold text-accent mb-6 font-playfair transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Nuestro Comedor
            </h2>
            <p 
              className={`text-xl mt-4 max-w-3xl mx-auto text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Un espacio diseñado para crear experiencias memorables. 
              Cada rincón de nuestro restaurante ha sido pensado para tu comodidad y disfrute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diningRoomImages.map((image, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-2xl shadow-tulsi-card cursor-pointer transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-[4/3] overflow-hidden">
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
                src={diningRoomImages[selectedImage].src} 
                alt={diningRoomImages[selectedImage].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white font-playfair text-2xl font-semibold mb-2">
                  {diningRoomImages[selectedImage].title}
                </h3>
                <p className="text-gray-200">
                  {diningRoomImages[selectedImage].alt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DiningRoomGallery;