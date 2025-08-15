import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
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
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
