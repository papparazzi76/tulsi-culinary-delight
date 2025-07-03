import { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ContestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToPayment: () => void;
}

const ContestModal = ({ isOpen, onClose, onProceedToPayment }: ContestModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subscribedToNewsletter: false,
    followsInstagram: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const { data, error } = await supabase.functions.invoke('register-contest', {
        body: {
          name: formData.name,
          email: formData.email,
          subscribedToNewsletter: formData.subscribedToNewsletter,
          followsInstagram: formData.followsInstagram,
        },
      });

      if (error) throw error;

      toast.success(data.message);
      onClose();
      setTimeout(() => onProceedToPayment(), 1000);
      
    } catch (error) {
      console.error('Error registering for contest:', error);
      toast.error('Error al registrarse en el sorteo');
    } finally {
      setIsSubmitting(false);
    }
  };

  const skipContest = () => {
    onClose();
    onProceedToPayment();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-accent text-center">
            ¡Regístrate y participa en nuestro sorteo!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎁</span>
            </div>
            <p className="text-muted-foreground">
              Participa en el sorteo de un menú degustación para 4 personas antes de nuestra inauguración
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contest-name" className="text-accent">
                Nombre completo *
              </Label>
              <Input
                id="contest-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tu nombre completo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contest-email" className="text-accent">
                Email *
              </Label>
              <Input
                id="contest-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="newsletter"
                  checked={formData.subscribedToNewsletter}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, subscribedToNewsletter: !!checked })
                  }
                  required
                />
                <Label 
                  htmlFor="newsletter" 
                  className="text-sm leading-5 cursor-pointer"
                >
                  Quiero suscribirme a la newsletter para recibir noticias y promociones *
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="instagram"
                  checked={formData.followsInstagram}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, followsInstagram: !!checked })
                  }
                  required
                />
                <Label 
                  htmlFor="instagram" 
                  className="text-sm leading-5 cursor-pointer"
                >
                  Ya sigo{' '}
                  <a 
                    href="https://instagram.com/tulsirestaurante" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    @TulsiRestaurante
                  </a>
                  {' '}en Instagram *
                </Label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={skipContest}
                className="flex-1"
              >
                Saltar sorteo
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.subscribedToNewsletter || !formData.followsInstagram}
                className="flex-1 btn-tulsi"
              >
                {isSubmitting ? 'Registrando...' : 'Participar y continuar'}
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            * Campos obligatorios para participar en el sorteo
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContestModal;