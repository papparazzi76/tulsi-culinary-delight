import AboutSection from '@/components/AboutSection';
import AnnouncementPopup from '@/components/AnnouncementPopup';
import ContactSection from '@/components/ContactSection';
import Contest from '@/components/Contest';
import Footer from '@/components/Footer';
import GallerySection from '@/components/GallerySection';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import Navigation from '@/components/Navigation';
import ParallaxSection from '@/components/ParallaxSection';
import TakeawaySection from '@/components/TakeawaySection';
import { Toaster } from '@/components/ui/sonner';

const Index = () => {
  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <ParallaxSection />
        <TakeawaySection />
        <section id="contest" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <Contest />
        </section>
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <AnnouncementPopup />
      <Toaster />
    </div>
  );
};

export default Index;
