import React, { useEffect } from 'react';
import { CheckCircle, ArrowLeft, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const PaymentSuccessTPV = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Obtener parámetros de respuesta de Redsys
  const dsResponse = searchParams.get('Ds_Response');
  const dsOrder = searchParams.get('Ds_Order');
  const dsAmount = searchParams.get('Ds_Amount');
  const dsSignature = searchParams.get('Ds_Signature');
  const dsDate = searchParams.get('Ds_Date');
  const dsHour = searchParams.get('Ds_Hour');

  useEffect(() => {
    // Mostrar notificación de éxito
    toast.success('¡Pago realizado con éxito!', {
      description: 'Tu pedido ha sido procesado correctamente.',
      duration: 5000,
    });

    // Limpiar el carrito del localStorage
    localStorage.removeItem('cart-items');
    
    // Opcional: Enviar confirmación al servidor
    // confirmOrder(dsOrder, dsResponse);
  }, [dsOrder, dsResponse]);

  const formatAmount = (amount: string | null) => {
    if (!amount) return '0.00';
    return (parseInt(amount) / 100).toFixed(2);
  };

  const formatOrderNumber = (order: string | null) => {
    if (!order) return 'N/A';
    return order;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            ¡Pago Exitoso!
          </h1>
          <p className="text-green-600 text-lg">
            Tu pedido ha sido procesado correctamente
          </p>
        </div>

        <Card className="bg-white shadow-lg border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Receipt className="w-5 h-5" />
              Detalles del Pago
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Número de Pedido
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {formatOrderNumber(dsOrder)}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Importe Pagado
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  €{formatAmount(dsAmount)}
                </p>
              </div>

              {dsDate && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Fecha
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {dsDate}
                  </p>
                </div>
              )}

              {dsHour && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Hora
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {dsHour}
                  </p>
                </div>
              )}

              {dsResponse && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600">
                    Código de Respuesta
                  </label>
                  <p className="text-lg font-semibold text-green-600">
                    {dsResponse} - Operación Autorizada
                  </p>
                </div>
              )}
            </div>

            <div className="border-t pt-4 mt-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">
                  ¿Qué sigue ahora?
                </h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Recibirás un email de confirmación en breve</li>
                  <li>• Te contactaremos para confirmar tu pedido</li>
                  <li>• El tiempo de preparación es aproximadamente 30-45 minutos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button
            onClick={() => navigate('/')}
            className="btn-tulsi"
            size="lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Button>
          
          <Button
            onClick={() => window.print()}
            variant="outline"
            size="lg"
          >
            <Receipt className="w-4 h-4 mr-2" />
            Imprimir Recibo
          </Button>
        </div>

        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos:
          </p>
          <p className="text-sm font-semibold">
            📞 983 35 97 18 | 📧 tulsirestaurant@email.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessTPV;