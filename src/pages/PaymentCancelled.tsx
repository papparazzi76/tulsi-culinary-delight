import React from 'react';
import { XCircle, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-destructive/5 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <XCircle className="w-24 h-24 text-destructive mx-auto mb-6" />
            <h1 className="text-4xl font-playfair font-bold text-accent mb-4">
              Pago Cancelado
            </h1>
            <p className="text-xl text-muted-foreground">
              El proceso de pago ha sido cancelado
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-accent">¿Qué ha pasado?</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p className="text-muted-foreground">
                El pago no se ha completado. Esto puede haber ocurrido por varios motivos:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Cancelaste el proceso de pago</li>
                <li>Hubo un problema con los datos de la tarjeta</li>
                <li>La sesión de pago expiró</li>
                <li>Hubo un error técnico temporal</li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              No te preocupes, no se ha realizado ningún cargo. 
              Puedes intentar hacer el pedido nuevamente.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/')}
                className="btn-tulsi"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Hacer pedido nuevamente
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
              </Button>
            </div>
          </div>

          <div className="mt-12 p-6 bg-accent/10 rounded-lg">
            <h3 className="text-lg font-semibold text-accent mb-2">
              ¿Necesitas ayuda?
            </h3>
            <p className="text-muted-foreground">
              Si tienes problemas para completar tu pedido, no dudes en contactarnos:<br />
              Teléfono: +34 983 XXX XXX<br />
              Email: info@restaurantetulsi.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;