import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
const AnnouncementPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subscribedToNewsletter: false,
    followsInstagram: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const closePopup = () => {
    setIsOpen(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Por favor, completa todos los campos obligatorios');
      return;
    }
    if (!formData.subscribedToNewsletter || !formData.followsInstagram) {
      toast.error('Debes aceptar ambas condiciones para participar en el sorteo');
      return;
    }
    setIsSubmitting(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('register-contest', {
        body: {
          name: formData.name,
          email: formData.email,
          subscribedToNewsletter: formData.subscribedToNewsletter,
          followsInstagram: formData.followsInstagram
        }
      });
      if (error) throw error;
      toast.success(data.message);
      setIsOpen(false);
    } catch (error) {
      console.error('Error registering for contest:', error);
      toast.error('Error al registrarse en el sorteo');
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={closePopup}>
      <div className="bg-card border border-accent/30 rounded-xl p-8 mx-4 max-w-md w-full text-center shadow-tulsi" onClick={e => e.stopPropagation()} role="dialog" aria-labelledby="announcement-title" aria-describedby="announcement-description">
        <button onClick={closePopup} className="absolute top-4 right-4 text-muted-foreground hover:text-accent transition-colors" aria-label="Cerrar anuncio">
          <X className="w-5 h-5" />
        </button>
        
        {!showForm ? <div className="mb-4">
            <div className="w-16 h-16 bg-gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-accent-foreground">Tulsi</span>
            </div>
            
            <h2 id="announcement-title" className="text-2xl font-playfair font-bold text-accent mb-2">
              Próxima Apertura
            </h2>
            
            <p id="announcement-description" className="text-xl text-foreground font-semibold mb-4">
              Agosto 2025
            </p>
            
            <p className="text-muted-foreground text-sm mb-6">
              ¡Prepárate para vivir una experiencia culinaria única!
            </p>

            <div className="space-y-3">
              <Button onClick={() => setShowForm(true)} className="btn-tulsi w-full">
                🎁 Participar en el Sorteo
              </Button>
              <Button onClick={closePopup} variant="outline" className="w-full">
                Cerrar
              </Button>
            </div>
          </div> : <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎁</span>
              </div>
              <h2 className="text-2xl font-playfair font-bold text-accent mb-2">
                ¡Sorteo Especial!
              </h2>
              <p className="text-muted-foreground">
                Participa en el sorteo de un menú degustación para 4 personas antes de nuestra inauguración
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contest-name" className="text-accent">
                  Nombre completo *
                </Label>
                <Input id="contest-name" value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} placeholder="Tu nombre completo" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contest-email" className="text-accent">
                  Email *
                </Label>
                <Input id="contest-email" type="email" value={formData.email} onChange={e => setFormData({
              ...formData,
              email: e.target.value
            })} placeholder="tu@email.com" required />
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox id="newsletter" checked={formData.subscribedToNewsletter} onCheckedChange={checked => setFormData({
                ...formData,
                subscribedToNewsletter: !!checked
              })} required />
                  <Label htmlFor="newsletter" className="text-sm leading-5 cursor-pointer">
                    Quiero suscribirme a la newsletter para recibir noticias y promociones *
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox id="instagram" checked={formData.followsInstagram} onCheckedChange={checked => setFormData({
                ...formData,
                followsInstagram: !!checked
              })} required />
                  <Label htmlFor="instagram" className="text-sm leading-5 cursor-pointer">
                    Ya sigo{' '}
                    <a href="https://instagram.com/tulsi_valladolid/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      @tulsi_valladolid
                    </a>
                    {' '}en Instagram *
                  </Label>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                  Volver
                </Button>
                <Button type="submit" disabled={isSubmitting || !formData.subscribedToNewsletter || !formData.followsInstagram} className="flex-1 btn-tulsi">
                  {isSubmitting ? 'Registrando...' : 'Participar'}
                </Button>
              </div>
            </form>

            <p className="text-xs text-muted-foreground text-center">
              * Campos obligatorios para participar en el sorteo
            </p>
          </div>}
      </div>
    </div>;
};
export default AnnouncementPopup;
