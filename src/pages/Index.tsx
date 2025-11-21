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
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button
          onClick={() => setShowChristmasModal(true)}
          className="btn-tulsi shadow-2xl hover:shadow-glow transition-all duration-300 flex items-center gap-2 text-sm sm:text-lg px-4 py-4 sm:px-6 sm:py-6 animate-pulse hover:animate-none"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">Reservas Navidad</span>
          <span className="xs:hidden">Navidad</span>
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
