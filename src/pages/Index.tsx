import { useState } from 'react';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import DiningRoomGallery from '@/components/DiningRoomGallery';
import FeedbackWidget from '@/components/FeedbackWidget';
import Footer from '@/components/Footer';
import GallerySection from '@/components/GallerySection';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import Navigation from '@/components/Navigation';
import ParallaxSection from '@/components/ParallaxSection';
import TakeawaySection from '@/components/TakeawaySection';
import ChristmasReservationModal from '@/components/ChristmasReservationModal';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [showChristmasModal, setShowChristmasModal] = useState(false);

  return (
    <div className="bg-background text-foreground">
      <Navigation />
      
      {/* Christmas Reservation Button - Fixed position */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowChristmasModal(true)}
          className="btn-tulsi shadow-2xl hover:shadow-glow transition-all duration-300 flex items-center gap-2 text-lg px-6 py-6 animate-pulse hover:animate-none"
        >
          <Sparkles className="w-5 h-5" />
          Reservas Navidad
        </Button>
      </div>

      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <ParallaxSection />
        <TakeawaySection />
        <GallerySection />
        <DiningRoomGallery />
        <FeedbackWidget />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
      
      <ChristmasReservationModal
        open={showChristmasModal}
        onOpenChange={setShowChristmasModal}
      />
    </div>
  );
};

export default Index;
