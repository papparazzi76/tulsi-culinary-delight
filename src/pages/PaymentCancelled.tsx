import React from 'react';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-accent mb-2">
            Pago cancelado
          </h1>
          <p className="text-muted-foreground">
            Has cancelado el proceso de pago. Tu carrito se mantiene guardado y puedes intentarlo de nuevo.
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

export default PaymentCancelled;