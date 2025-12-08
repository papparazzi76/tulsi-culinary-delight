import React, { useState } from 'react';
import { Mic, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VoiceReservationAssistant from './VoiceReservationAssistant';
import ReservationForm from './ReservationForm';

type ReservationMode = 'select' | 'voice' | 'form';

const ReservationWidget: React.FC = () => {
  const [mode, setMode] = useState<ReservationMode>('select');

  return (
    <section id="reservar" className="py-12 md:py-20 bg-primary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-3 md:mb-4 font-playfair">
            Reserva tu Mesa
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground max-w-2xl mx-auto px-2">
            Elige cómo prefieres hacer tu reserva
          </p>
        </div>

        {mode === 'select' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {/* Voice Assistant Option */}
              <div 
                className="bg-card rounded-xl p-5 sm:p-6 md:p-8 border-2 border-border hover:border-accent/50 transition-all duration-300 cursor-pointer group"
                onClick={() => setMode('voice')}
              >
                <div className="text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mic className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-accent mb-2 md:mb-4 font-playfair">
                    Asistente por Voz
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 md:mb-6">
                    Habla con nuestro asistente virtual inteligente. 
                    Te guiará paso a paso para completar tu reserva.
                  </p>
                  <Button className="btn-tulsi w-full sm:w-auto" size="lg">
                    <Mic className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Reservar por Voz
                  </Button>
                </div>
              </div>

              {/* Traditional Form Option */}
              <div 
                className="bg-card rounded-xl p-5 sm:p-6 md:p-8 border-2 border-border hover:border-accent/50 transition-all duration-300 cursor-pointer group"
                onClick={() => setMode('form')}
              >
                <div className="text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ClipboardList className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-accent mb-2 md:mb-4 font-playfair">
                    Formulario Tradicional
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 md:mb-6">
                    Rellena el formulario clásico con tus datos. 
                    Rápido y sencillo si prefieres escribir.
                  </p>
                  <Button className="btn-tulsi w-full sm:w-auto" size="lg">
                    <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Rellenar Formulario
                  </Button>
                </div>
              </div>
            </div>

            <p className="text-center text-sm sm:text-base text-muted-foreground mt-6 md:mt-8 px-2">
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
              className="mb-4 md:mb-6 text-muted-foreground hover:text-accent"
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
              className="mb-4 md:mb-6 text-muted-foreground hover:text-accent"
            >
              ← Volver a opciones
            </Button>
            
            <div className="bg-card rounded-xl p-5 sm:p-6 md:p-8 border-2 border-accent/20 shadow-tulsi">
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-accent font-playfair">
                  Formulario de Reserva
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mt-2">
                  Completa los datos para confirmar tu mesa
                </p>
              </div>
              
              <ReservationForm onSuccess={() => setMode('select')} />
            </div>

            <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 md:mt-6">
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
