import React, { useState } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowContest: () => void;
}

const CartModal = ({ isOpen, onClose, onShowContest }: CartModalProps) => {
  const { cartItems, updateQuantity, removeFromCart, calculateTotals, sessionId, clearCart } = useCart();
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const totals = calculateTotals(deliveryType);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleCheckout = async () => {
    if (!customerInfo.name || !customerInfo.email) {
      toast.error('Por favor, completa tu información personal');
      return;
    }

    if (deliveryType === 'delivery' && !deliveryAddress) {
      toast.error('Por favor, introduce la dirección de entrega');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Tu carrito está vacío');
      return;
    }

    // Show contest modal first
    onShowContest();
  };

  const processPayment = async () => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          sessionId,
          customerInfo,
          deliveryType,
          deliveryAddress: deliveryType === 'delivery' ? deliveryAddress : null,
          cartItems,
        },
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
      
      // Clear cart and close modal
      clearCart();
      onClose();
      toast.success('Redirigiendo a la pasarela de pago...');
      
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Error al procesar el pago');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle direct payment processing
  const handleDirectPayment = () => {
    if (!customerInfo.name || !customerInfo.email || cartItems.length === 0) return;
    processPayment();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-accent">
            Tu Carrito
          </DialogTitle>
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
                      disabled={item.quantity <= 1}
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
                    onClick={() => setDeliveryType('delivery')}
                    className={`h-auto p-6 flex-col gap-2 ${
                      deliveryType === 'delivery' 
                        ? 'bg-accent text-accent-foreground' 
                        : 'hover:bg-accent/10'
                    }`}
                  >
                    <div className="text-lg font-bold">Enviar a Domicilio</div>
                    <div className="text-sm opacity-80">Envío Gratuito</div>
                    <div className="text-xs text-center">
                      Entrega en tu casa<br />
                      sin coste adicional
                    </div>
                  </Button>
                </div>
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
                  <div className="flex justify-between">
                    <span>IVA (21%):</span>
                    <span>€{totals.taxAmount.toFixed(2)}</span>
                  </div>
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
              </div>

              {/* Checkout button */}
              <Button
                onClick={handleCheckout}
                disabled={isProcessing || !customerInfo.name || !customerInfo.email}
                className="w-full btn-tulsi"
              >
                {isProcessing ? 'Procesando...' : 'Proceder al pago'}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;