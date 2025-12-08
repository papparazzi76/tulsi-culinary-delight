import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Users, Phone, Mail, User, MessageSquare, Mic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ReservationFormProps {
  onSuccess?: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create reservation in database
      const reservationTime = new Date(`${formData.date}T${formData.time}`);
      
      const { error } = await supabase.from('reservations').insert({
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        reservation_time: reservationTime.toISOString(),
        number_of_guests: parseInt(formData.guests),
        notes: formData.notes || null,
        status: 'confirmed'
      });

      if (error) throw error;

      toast({
        title: "¡Reserva Confirmada!",
        description: `Tu reserva para ${formData.guests} personas el ${formData.date} a las ${formData.time} ha sido confirmada.`,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        notes: ''
      });

      onSuccess?.();
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast({
        title: "Error",
        description: "No se pudo procesar la reserva. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Nombre completo *
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Teléfono *
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+34 600 000 000"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Email *
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          required
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Fecha *
          </Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Hora *
          </Label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Selecciona hora</option>
            <optgroup label="Comida">
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="15:00">15:00</option>
              <option value="15:30">15:30</option>
            </optgroup>
            <optgroup label="Cena">
              <option value="20:00">20:00</option>
              <option value="20:30">20:30</option>
              <option value="21:00">21:00</option>
              <option value="21:30">21:30</option>
              <option value="22:00">22:00</option>
              <option value="22:30">22:30</option>
              <option value="23:00">23:00</option>
            </optgroup>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Comensales *
          </Label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>
            ))}
            <option value="13">Más de 12 (consultar)</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Notas o peticiones especiales
        </Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Alergias, celebraciones especiales, preferencias de mesa..."
          rows={3}
        />
      </div>

      <Button
        type="submit"
        className="w-full btn-tulsi"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            Procesando...
          </>
        ) : (
          'Confirmar Reserva'
        )}
      </Button>
    </form>
  );
};

export default ReservationForm;
