import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      fetchOrderDetails();
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  const fetchOrderDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('stripe_session_id', sessionId)
        .single();

      if (error) throw error;
      setOrderDetails(data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Verificando tu pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-playfair font-bold text-accent mb-4">
              ¡Pago Exitoso!
            </h1>
            <p className="text-xl text-muted-foreground">
              Tu pedido ha sido procesado correctamente
            </p>
          </div>

          {orderDetails && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-accent">Detalles del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="flex justify-between">
                  <span className="font-medium">Número de pedido:</span>
                  <span className="text-accent font-bold">{orderDetails.order_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Cliente:</span>
                  <span>{orderDetails.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{orderDetails.customer_email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tipo de entrega:</span>
                  <span>{orderDetails.delivery_type === 'pickup' ? 'Recogida en restaurante' : 'Entrega a domicilio'}</span>
                </div>
                {orderDetails.delivery_address && (
                  <div className="flex justify-between">
                    <span className="font-medium">Dirección:</span>
                    <span className="text-right max-w-[200px]">{orderDetails.delivery_address}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-4">
                  <span>Total pagado:</span>
                  <span className="text-accent">€{orderDetails.total_amount?.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <p className="text-muted-foreground">
              {orderDetails?.delivery_type === 'pickup' 
                ? 'Recibirás una notificación cuando tu pedido esté listo para recoger en nuestro restaurante.'
                : 'Recibirás una confirmación por email y te notificaremos cuando tu pedido esté en camino.'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/')}
                className="btn-tulsi"
              >
                <Home className="w-4 h-4 mr-2" />
                Volver al inicio
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/menu')}
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                Ver menú
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="mt-12 p-6 bg-accent/10 rounded-lg">
            <h3 className="text-lg font-semibold text-accent mb-2">
              Información de contacto
            </h3>
            <p className="text-muted-foreground">
              Restaurante Tulsi<br />
              Calle Marina Escobar, 1<br />
              47001 Valladolid<br />
              Teléfono: +34 983 XXX XXX
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;