import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, Phone, Mail, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ChristmasReservationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChristmasReservationModal = ({ open, onOpenChange }: ChristmasReservationModalProps) => {
  const [selectedMenu, setSelectedMenu] = useState<'navidad' | 'nochevieja'>('navidad');
  const [selectedDate, setSelectedDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('2');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navidadDates = [
    { value: '2024-12-24T14:00', label: '24 de Diciembre - Comida (14:00h)' },
    { value: '2024-12-24T21:00', label: '24 de Diciembre - Cena (21:00h)' },
  ];

  const nocheviejaDates = [
    { value: '2024-12-31T21:00', label: '31 de Diciembre - Cena (21:00h)' },
    { value: '2025-01-01T14:00', label: '1 de Enero - Comida (14:00h)' },
  ];

  const availableDates = selectedMenu === 'navidad' ? navidadDates : nocheviejaDates;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !customerName || !customerEmail || !customerPhone) {
      toast.error('Por favor, complete todos los campos');
      return;
    }

    if (parseInt(numberOfGuests) < 2 || parseInt(numberOfGuests) > 14) {
      toast.error('El número de personas debe estar entre 2 y 14');
      return;
    }

    setIsSubmitting(true);

    try {
      const menuName = selectedMenu === 'navidad' ? 'Menú Navidad' : 'Menú Nochevieja';
      const notes = `${menuName} - Menú único, no modificable. Reserva especial de Navidad.`;

      const { error } = await supabase.from('reservations').insert({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        number_of_guests: parseInt(numberOfGuests),
        reservation_time: selectedDate,
        notes: notes,
        status: 'pending',
      });

      if (error) throw error;

      // Send notification emails
      try {
        const { error: emailError } = await supabase.functions.invoke(
          'send-christmas-reservation-notification',
          {
            body: {
              customerName,
              customerEmail,
              customerPhone,
              numberOfGuests: parseInt(numberOfGuests),
              reservationTime: selectedDate,
              menuName,
            },
          }
        );

        if (emailError) {
          console.error('Error sending notification emails:', emailError);
          // Don't throw - reservation was created successfully
        }
      } catch (emailError) {
        console.error('Error calling email function:', emailError);
        // Don't throw - reservation was created successfully
      }

      toast.success('¡Reserva realizada con éxito! Te contactaremos pronto para confirmar.');
      
      // Reset form
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setSelectedDate('');
      setNumberOfGuests('2');
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast.error('Error al realizar la reserva. Por favor, inténtelo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-playfair text-accent text-center">
            Menús Especiales Navidad
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Menu Selection */}
          <div className="flex gap-4 justify-center">
            <Button
              type="button"
              variant={selectedMenu === 'navidad' ? 'default' : 'outline'}
              onClick={() => {
                setSelectedMenu('navidad');
                setSelectedDate('');
              }}
              className="flex-1 max-w-xs"
            >
              Menú Navidad (24 Dic)
            </Button>
            <Button
              type="button"
              variant={selectedMenu === 'nochevieja' ? 'default' : 'outline'}
              onClick={() => {
                setSelectedMenu('nochevieja');
                setSelectedDate('');
              }}
              className="flex-1 max-w-xs"
            >
              Menú Nochevieja (31 Dic - 1 Ene)
            </Button>
          </div>

          {/* Menu Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={selectedMenu === 'navidad' ? '/lovable-uploads/menu-navidad.jpg' : '/lovable-uploads/menu-nochevieja.jpg'}
              alt={selectedMenu === 'navidad' ? 'Menú de Navidad' : 'Menú de Nochevieja'}
              className="w-full h-auto"
            />
          </div>

          {/* Important Information */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 space-y-2">
            <p className="text-sm text-foreground font-semibold">Información Importante:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Precio: 32€ por persona</li>
              <li>Mínimo 2 personas - Máximo 14 personas por reserva</li>
              <li>Menú único, no se pueden realizar modificaciones</li>
              <li>Incluye aperitivo, entrantes, platos principales y postres</li>
            </ul>
          </div>

          {/* Reservation Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Fecha y Hora
                </Label>
                <Select value={selectedDate} onValueChange={setSelectedDate} required>
                  <SelectTrigger id="date">
                    <SelectValue placeholder="Selecciona fecha y hora" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDates.map((date) => (
                      <SelectItem key={date.value} value={date.value}>
                        {date.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Número de Personas (2-14)
                </Label>
                <Select value={numberOfGuests} onValueChange={setNumberOfGuests} required>
                  <SelectTrigger id="guests">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 13 }, (_, i) => i + 2).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} personas
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nombre Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                  placeholder="+34 600 000 000"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Confirmar Reserva'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChristmasReservationModal;
