import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import TakeawaySection from '@/components/TakeawaySection';
import ParallaxSection from '@/components/ParallaxSection';
import GallerySection from '@/components/GallerySection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AnnouncementPopup from '@/components/AnnouncementPopup';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <MenuSection />
      <TakeawaySection />
      <ParallaxSection />
      <GallerySection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <AnnouncementPopup />
    </div>
  );
};

export default Index;
