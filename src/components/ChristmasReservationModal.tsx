import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, Phone, Mail, User, Share2, CheckCircle2 } from 'lucide-react';
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
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reservationDetails, setReservationDetails] = useState<{
    menuName: string;
    date: string;
    guests: number;
  } | null>(null);

  const navidadDates = [
    { value: '2025-12-24T21:00', label: '24 de Diciembre - Cena (21:00h)' },
    { value: '2025-12-25T14:00', label: '25 de Diciembre - Comida (14:00h)' },
  ];

  const nocheviejaDates = [
    { value: '2025-12-31T21:00', label: '31 de Diciembre - Cena (21:00h)' },
    { value: '2026-01-01T14:00', label: '1 de Enero - Comida (14:00h)' },
  ];

  const availableDates = selectedMenu === 'navidad' ? navidadDates : nocheviejaDates;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const shareOnWhatsApp = () => {
    if (!reservationDetails) return;
    
    const message = `🎄 *Reserva Confirmada - Tul India Valladolid*\n\n` +
      `📋 ${reservationDetails.menuName}\n` +
      `📅 ${formatDate(reservationDetails.date)}\n` +
      `👥 ${reservationDetails.guests} personas\n` +
      `💶 ${reservationDetails.guests * 32}€ (32€/persona)\n\n` +
      `👤 ${customerName}\n` +
      `📧 ${customerEmail}\n` +
      `📱 ${customerPhone}\n\n` +
      `¡Nos vemos pronto! 🎉`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const resetForm = () => {
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setSelectedDate('');
    setNumberOfGuests('2');
    setReservationSuccess(false);
    setReservationDetails(null);
  };

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
      
      // Set reservation details and show success view
      setReservationDetails({
        menuName,
        date: selectedDate,
        guests: parseInt(numberOfGuests)
      });
      setReservationSuccess(true);
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast.error('Error al realizar la reserva. Por favor, inténtelo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        resetForm();
      }
      onOpenChange(isOpen);
    }}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        {!reservationSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-playfair text-accent text-center">
                Menús Especiales Navidad
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
          {/* Menu Selection */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
            <Button
              type="button"
              variant={selectedMenu === 'navidad' ? 'default' : 'outline'}
              onClick={() => {
                setSelectedMenu('navidad');
                setSelectedDate('');
              }}
              className="flex-1 max-w-xs text-sm sm:text-base"
            >
              Menú Navidad<br className="sm:hidden" /> <span className="hidden sm:inline">(</span>24-25 Dic<span className="hidden sm:inline">)</span>
            </Button>
            <Button
              type="button"
              variant={selectedMenu === 'nochevieja' ? 'default' : 'outline'}
              onClick={() => {
                setSelectedMenu('nochevieja');
                setSelectedDate('');
              }}
              className="flex-1 max-w-xs text-sm sm:text-base"
            >
              Menú Nochevieja<br className="sm:hidden" /> <span className="hidden sm:inline">(</span>31 Dic-1 Ene<span className="hidden sm:inline">)</span>
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
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 sm:p-4 space-y-2">
            <p className="text-xs sm:text-sm text-foreground font-semibold">Información Importante:</p>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Precio: 32€ por persona</li>
              <li>Mínimo 2 - Máximo 14 personas</li>
              <li>Menú único, no modificable</li>
              <li>Incluye aperitivo, entrantes, principales y postres</li>
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

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-4">
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
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-playfair text-accent text-center">
                ¡Reserva Confirmada!
              </DialogTitle>
              <DialogDescription className="text-center">
                Tu reserva ha sido registrada exitosamente
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="flex justify-center">
                <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-green-500" />
              </div>

              {reservationDetails && (
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 sm:p-6 space-y-3">
                  <h3 className="font-semibold text-lg text-center">{reservationDetails.menuName}</h3>
                  <div className="space-y-2 text-sm sm:text-base">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(reservationDetails.date)}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{reservationDetails.guests} personas</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{customerName}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{customerEmail}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{customerPhone}</span>
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p className="font-semibold mb-2">📧 Hemos enviado un email de confirmación</p>
                <p>Te contactaremos pronto para confirmar tu reserva definitivamente.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={shareOnWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Share2 className="w-4 h-4" />
                  Compartir en WhatsApp
                </Button>
                <Button
                  onClick={() => {
                    resetForm();
                    onOpenChange(false);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChristmasReservationModal;
