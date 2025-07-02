import { useEffect, useState } from 'react';
import heroImage from '@/assets/hero-bg.jpg';
const ParallaxSection = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <section className="relative h-80 overflow-hidden flex items-center justify-center" style={{
    backgroundImage: `linear-gradient(rgba(74, 68, 42, 0.8), rgba(74, 68, 42, 0.9)), url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    transform: `translateY(${scrollY * 0.5}px)`
  }}>
      <div className="text-center text-white z-10">
        
        <p className="text-accent text-lg mt-4">
      </p>
      </div>
      
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-tulsi-brown/20 via-transparent to-tulsi-brown/20"></div>
    </section>;
};
export default ParallaxSection;