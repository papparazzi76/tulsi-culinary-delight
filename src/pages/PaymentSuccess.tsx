import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (!sessionId) return;

    const sendToAgora = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('verify-and-push-order', {
          body: { stripeSessionId: sessionId },
        });
        if (error) throw error;
        toast({ title: 'Pedido confirmado', description: 'Enviado a Ágora correctamente.' });
      } catch (e) {
        console.error('Error enviando a Ágora', e);
        toast({
          title: 'Aviso',
          description: 'Pago correcto, pero hubo un problema enviando a Ágora. Lo revisamos.',
          variant: 'destructive',
        });
      }
    };

    sendToAgora();
  }, [toast]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-accent mb-2">
            ¡Pago realizado con éxito!
          </h1>
          <p className="text-muted-foreground">
            Tu pedido ha sido procesado correctamente. Recibirás un email de confirmación en breve.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/')}
            className="w-full btn-tulsi"
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;