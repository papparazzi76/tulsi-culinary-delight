import React, { useEffect } from 'react';
import { XCircle, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const PaymentCancelledTPV = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Obtener parámetros de respuesta de Redsys
  const dsResponse = searchParams.get('Ds_Response');
  const dsOrder = searchParams.get('Ds_Order');
  const dsAmount = searchParams.get('Ds_Amount');
  const dsErrorCode = searchParams.get('Ds_ErrorCode');

  useEffect(() => {
    // Mostrar notificación de error
    toast.error('Pago cancelado', {
      description: 'El pago no se ha completado. Puedes intentarlo de nuevo.',
      duration: 5000,
    });
  }, []);

  const formatAmount = (amount: string | null) => {
    if (!amount) return '0.00';
    return (parseInt(amount) / 100).toFixed(2);
  };

  const getErrorMessage = (errorCode: string | null, response: string | null) => {
    if (!errorCode && !response) return 'Operación cancelada por el usuario';
    
    // Códigos de error comunes de Redsys
    const errorMessages: { [key: string]: string } = {
      'SIS0001': 'Error de formato en la petición',
      'SIS0002': 'Error en la versión enviada por el comercio',
      'SIS0003': 'Error en el identificador del comercio',
      'SIS0004': 'Error en el identificador del comercio',
      'SIS0007': 'Error en el formato de la fecha',
      'SIS0008': 'Error en el formato de la fecha',
      'SIS0009': 'Error de formato en la petición',
      'SIS0010': 'Error en el formato de la fecha',
      '0180': 'Tarjeta ajena al servicio',
      '0181': 'Operación no permitida para esa tarjeta',
      '0182': 'Tarjeta ajena al servicio',
      '0184': 'Error en la autenticación del titular',
      '0190': 'Denegación sin especificar motivo',
      '0191': 'Fecha de caducidad errónea',
      '0195': 'Requiere SCA autenticación',
      '0201': 'Tarjeta caducada',
      '0202': 'Tarjeta en situación de fraude',
      '0904': 'Comercio no registrado en FUC',
      '0909': 'Error de sistema',
      '0912': 'Emisor no disponible',
      '0913': 'Pedido repetido',
      '0944': 'Sesión Incorrecta',
      '0950': 'Operación de devolución no permitida'
    };

    if (errorCode && errorMessages[errorCode]) {
      return errorMessages[errorCode];
    }
    
    if (response && errorMessages[response]) {
      return errorMessages[response];
    }

    return 'Error desconocido en el procesamiento del pago';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-red-800 mb-2">
            Pago Cancelado
          </h1>
          <p className="text-red-600 text-lg">
            El pago no se ha completado correctamente
          </p>
        </div>

        <Card className="bg-white shadow-lg border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              Detalles del Error
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {dsOrder && (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Número de Pedido
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {dsOrder}
                </p>
              </div>
            )}
            
            {dsAmount && (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Importe
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  €{formatAmount(dsAmount)}
                </p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-600">
                Motivo
              </label>
              <p className="text-lg font-semibold text-red-600">
                {getErrorMessage(dsErrorCode, dsResponse)}
              </p>
            </div>

            {(dsResponse || dsErrorCode) && (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Código de Error
                </label>
                <p className="text-sm text-gray-700">
                  {dsErrorCode || dsResponse || 'N/A'}
                </p>
              </div>
            )}

            <div className="border-t pt-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  ¿Qué puedes hacer?
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Verificar los datos de tu tarjeta</li>
                  <li>• Intentar con otra tarjeta o método de pago</li>
                  <li>• Contactar con tu banco si el problema persiste</li>
                  <li>• Llamarnos para realizar el pedido por teléfono</li>
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
            onClick={() => navigate('/?retry-payment=true')}
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            Intentar de Nuevo
          </Button>
        </div>

        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            Si necesitas ayuda, no dudes en contactarnos:
          </p>
          <p className="text-sm font-semibold">
            📞 983 35 97 18 | 📧 tulsirestaurant@email.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelledTPV;