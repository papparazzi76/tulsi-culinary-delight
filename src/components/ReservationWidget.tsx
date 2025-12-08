import React, { useState } from 'react';
import { Mic, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VoiceReservationAssistant from './VoiceReservationAssistant';
import ReservationForm from './ReservationForm';

type ReservationMode = 'select' | 'voice' | 'form';

const ReservationWidget: React.FC = () => {
  const [mode, setMode] = useState<ReservationMode>('select');

  return (
    <section id="reservar" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4 font-playfair">
            Reserva tu Mesa
          </h2>
          <p className="text-xl text-foreground max-w-2xl mx-auto">
            Elige cómo prefieres hacer tu reserva
          </p>
        </div>

        {mode === 'select' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Voice Assistant Option */}
              <div 
                className="bg-card rounded-xl p-8 border-2 border-border hover:border-accent/50 transition-all duration-300 cursor-pointer group"
                onClick={() => setMode('voice')}
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mic className="w-10 h-10 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-accent mb-4 font-playfair">
                    Asistente por Voz
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Habla con nuestro asistente virtual inteligente. 
                    Te guiará paso a paso para completar tu reserva de forma natural.
                  </p>
                  <Button className="btn-tulsi" size="lg">
                    <Mic className="w-5 h-5 mr-2" />
                    Reservar por Voz
                  </Button>
                </div>
              </div>

              {/* Traditional Form Option */}
              <div 
                className="bg-card rounded-xl p-8 border-2 border-border hover:border-accent/50 transition-all duration-300 cursor-pointer group"
                onClick={() => setMode('form')}
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ClipboardList className="w-10 h-10 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-accent mb-4 font-playfair">
                    Formulario Tradicional
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Rellena el formulario clásico con tus datos. 
                    Rápido y sencillo si prefieres escribir.
                  </p>
                  <Button className="btn-tulsi" size="lg">
                    <ClipboardList className="w-5 h-5 mr-2" />
                    Rellenar Formulario
                  </Button>
                </div>
              </div>
            </div>

            <p className="text-center text-muted-foreground mt-8">
              ¿Prefieres llamar? Contacta con nosotros al{' '}
              <a href="tel:+34645946202" className="text-accent hover:underline font-semibold">
                +34 645 94 62 02
              </a>
            </p>
          </div>
        )}

        {mode === 'voice' && (
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setMode('select')}
              className="mb-6 text-muted-foreground hover:text-accent"
            >
              ← Volver a opciones
            </Button>
            <VoiceReservationAssistant />
          </div>
        )}

        {mode === 'form' && (
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setMode('select')}
              className="mb-6 text-muted-foreground hover:text-accent"
            >
              ← Volver a opciones
            </Button>
            
            <div className="bg-card rounded-xl p-8 border-2 border-accent/20 shadow-tulsi">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-accent font-playfair">
                  Formulario de Reserva
                </h3>
                <p className="text-muted-foreground mt-2">
                  Completa los datos para confirmar tu mesa
                </p>
              </div>
              
              <ReservationForm onSuccess={() => setMode('select')} />
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              También puedes llamarnos al{' '}
              <a href="tel:+34645946202" className="text-accent hover:underline">
                +34 645 94 62 02
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReservationWidget;
