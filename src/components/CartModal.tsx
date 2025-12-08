import React, { useState } from 'react';
import { Minus, Plus, Trash2, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowContest: (paymentCallback: () => void) => void;
}

const CartModal = ({ isOpen, onClose, onShowContest }: CartModalProps) => {
  const { cartItems, updateQuantity, removeFromCart, calculateTotals, sessionId, clearCart, refreshCart } = useCart();
  
  React.useEffect(() => {
    if (isOpen) {
      refreshCart();
      setOrderSuccess(null);
    }
  }, [isOpen, refreshCart]);
  
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ orderNumber: string } | null>(null);

  // Envío a domicilio temporalmente deshabilitado
  const isDeliveryAvailable = () => {
    return false;
  };

  // Forzar pickup si delivery no está disponible
  React.useEffect(() => {
    if (!isDeliveryAvailable() && deliveryType === 'delivery') {
      setDeliveryType('pickup');
    }
  }, [deliveryType]);

  const totals = calculateTotals(deliveryType);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

  const handleSubmitOrder = async () => {
    if (!customerInfo.name || !customerInfo.email) {
      toast.error('Por favor, completa tu nombre y email.');
      return;
    }

    if (deliveryType === 'delivery' && !deliveryAddress) {
      toast.error('Por favor, introduce la dirección de entrega.');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Tu carrito está vacío.');
      return;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-takeaway-order', {
        body: {
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone,
          deliveryType,
          deliveryAddress: deliveryType === 'delivery' ? deliveryAddress : undefined,
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          subtotal: totals.subtotal,
          discountAmount: totals.discountAmount,
          total: totals.total
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Error al enviar el pedido');
      }

      // Show success state
      setOrderSuccess({ orderNumber: data.orderNumber });
      clearCart();
      toast.success('¡Pedido enviado correctamente!');
      
    } catch (error: any) {
      console.error('Error sending order:', error);
      toast.error(`Error al enviar el pedido: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Success view after order is placed
  if (orderSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-playfair font-bold text-accent">
                ¡Pedido Enviado!
              </h2>
              <p className="text-muted-foreground">
                Número de pedido: <strong>{orderSuccess.orderNumber}</strong>
              </p>
            </div>
            
            <div className="bg-secondary p-4 rounded-lg text-left space-y-2">
              <p className="text-sm">
                <strong>📧 Te hemos enviado un email</strong> con los detalles de tu pedido.
              </p>
              <p className="text-sm">
                <strong>💳 Forma de pago:</strong> Abonarás el pedido al recogerlo en el restaurante. Aceptamos efectivo y tarjeta.
              </p>
              <p className="text-sm">
                <strong>⏰ Tiempo estimado:</strong> 15-25 minutos.
              </p>
              <p className="text-sm">
                <strong>📍 Dirección:</strong> Calle Marina Escobar, 1, 47001 Valladolid
              </p>
            </div>
            
            <Button onClick={onClose} className="btn-tulsi">
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-playfair text-accent">
              Tu Carrito
            </DialogTitle>
            {cartItems.length > 0 && !orderSuccess && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  clearCart();
                  toast.success('Carrito vaciado');
                }}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Vaciar carrito
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cart items */}
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-accent">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">€{item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    
                    <span className="w-8 text-center">{item.quantity}</span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <>
              {/* Delivery type */}
              <div className="space-y-4">
                <Label className="text-accent font-semibold text-lg">Selecciona el tipo de entrega</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant={deliveryType === 'pickup' ? 'default' : 'outline'}
                    onClick={() => setDeliveryType('pickup')}
                    className={`h-auto p-6 flex-col gap-2 ${
                      deliveryType === 'pickup' 
                        ? 'bg-accent text-accent-foreground' 
                        : 'hover:bg-accent/10'
                    }`}
                  >
                    <div className="text-lg font-bold">Recoger en Local</div>
                    <div className="text-sm opacity-80">20% de Descuento</div>
                    <div className="text-xs text-center">
                      Calle Marina Escobar, 1<br />
                      47001 Valladolid
                    </div>
                  </Button>
                  
                  <Button
                    variant={deliveryType === 'delivery' ? 'default' : 'outline'}
                    onClick={() => isDeliveryAvailable() ? setDeliveryType('delivery') : null}
                    disabled={!isDeliveryAvailable()}
                    className={`h-auto p-6 flex-col gap-2 relative ${
                      deliveryType === 'delivery' 
                        ? 'bg-accent text-accent-foreground' 
                        : !isDeliveryAvailable()
                          ? 'opacity-50 cursor-not-allowed bg-muted text-muted-foreground'
                          : 'hover:bg-accent/10'
                    }`}
                  >
                    <div className="text-lg font-bold">Enviar a Domicilio</div>
                    {!isDeliveryAvailable() ? (
                      <>
                        <div className="text-sm opacity-80 text-destructive">No Disponible</div>
                        <div className="text-xs text-center">
                          Disponible desde<br />
                          1 de Octubre
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm opacity-80">Envío Gratuito</div>
                        <div className="text-xs text-center">
                          Entrega en tu casa<br />
                          sin coste adicional
                        </div>
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Aviso de delivery no disponible */}
                {!isDeliveryAvailable() && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>¡Pronto disponible!</strong> El servicio de entrega a domicilio estará disponible a partir del <strong>1 de octubre</strong>. Mientras tanto, puedes recoger tu pedido en nuestro restaurante con un 20% de descuento.
                    </p>
                  </div>
                )}
              </div>

              {/* Delivery address */}
              {deliveryType === 'delivery' && (
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-accent font-semibold">
                    Dirección de entrega
                  </Label>
                  <Input
                    id="address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Calle, número, piso, ciudad..."
                    required
                  />
                </div>
              )}

              {/* Customer information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-accent">Información personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-accent">Nombre completo *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-accent">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone" className="text-accent">Teléfono</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="+34 123 456 789"
                    />
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="space-y-3 p-4 bg-secondary rounded-lg">
                <h3 className="text-lg font-semibold text-accent">Resumen del pedido</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>€{totals.subtotal.toFixed(2)}</span>
                  </div>
                  {totals.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento recogida (20%):</span>
                      <span>-€{totals.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg text-accent border-t pt-2">
                    <span>Total:</span>
                    <span>€{totals.total.toFixed(2)}</span>
                  </div>
                </div>
                
                {deliveryType === 'pickup' && (
                  <p className="text-xs text-muted-foreground mt-2">
                    * Se aplica automáticamente 20% de descuento por recogida en restaurante
                  </p>
                )}

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>💳 Pago en restaurante:</strong> Abonarás el importe al recoger tu pedido. Aceptamos efectivo y tarjeta.
                  </p>
                </div>
              </div>

              {/* Submit order button */}
              <Button
                onClick={handleSubmitOrder}
                disabled={isProcessing || !customerInfo.name || !customerInfo.email}
                className="w-full btn-tulsi"
              >
                {isProcessing ? 'Enviando pedido...' : 'Preparar Pedido'}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
