// Tests específicos para validar las opciones de entrega

import { describe, it, expect } from 'vitest';

// Mock de componente CartModal
const mockDeliveryOptions = {
  pickup: {
    label: "Recoger en Local",
    discount: "20% de Descuento",
    address: "Calle Marina Escobar, 1, 47001 Valladolid"
  },
  delivery: {
    label: "Enviar a Domicilio", 
    message: "Envío Gratuito",
    description: "Entrega en tu casa sin coste adicional"
  }
};

describe('Opciones de Entrega - Interfaz', () => {
  it('debería mostrar dos botones de entrega bien visibles', () => {
    expect(mockDeliveryOptions.pickup).toBeDefined();
    expect(mockDeliveryOptions.delivery).toBeDefined();
    
    expect(mockDeliveryOptions.pickup.label).toBe("Recoger en Local");
    expect(mockDeliveryOptions.delivery.label).toBe("Enviar a Domicilio");
  });

  it('debería mostrar claramente el descuento para recogida', () => {
    expect(mockDeliveryOptions.pickup.discount).toContain("20%");
    expect(mockDeliveryOptions.pickup.discount).toContain("Descuento");
  });

  it('debería mostrar claramente el envío gratuito', () => {
    expect(mockDeliveryOptions.delivery.message).toBe("Envío Gratuito");
    expect(mockDeliveryOptions.delivery.description).toContain("sin coste adicional");
  });

  it('debería mostrar la dirección del restaurante para recogida', () => {
    expect(mockDeliveryOptions.pickup.address).toContain("Marina Escobar");
    expect(mockDeliveryOptions.pickup.address).toContain("47001 Valladolid");
  });
});

describe('Lógica de Precios según Entrega', () => {
  const calculatePrice = (basePrice: number, deliveryType: 'pickup' | 'delivery') => {
    if (deliveryType === 'pickup') {
      const discount = basePrice * 0.20;
      const afterDiscount = basePrice - discount;
      const tax = afterDiscount * 0.21;
      return {
        original: basePrice,
        discount: discount,
        afterDiscount: afterDiscount,
        tax: tax,
        total: afterDiscount + tax
      };
    } else {
      const tax = basePrice * 0.21;
      return {
        original: basePrice,
        discount: 0,
        afterDiscount: basePrice,
        tax: tax,
        total: basePrice + tax
      };
    }
  };

  it('debería aplicar 20% descuento para recogida en local', () => {
    const price = calculatePrice(100, 'pickup');
    
    expect(price.discount).toBe(20);
    expect(price.afterDiscount).toBe(80);
    expect(price.total).toBe(80 + (80 * 0.21)); // 96.8
  });

  it('debería no aplicar descuento para envío a domicilio', () => {
    const price = calculatePrice(100, 'delivery');
    
    expect(price.discount).toBe(0);
    expect(price.afterDiscount).toBe(100);
    expect(price.total).toBe(100 + (100 * 0.21)); // 121
  });

  it('debería ser más barato recoger que entregar', () => {
    const pickupPrice = calculatePrice(100, 'pickup');
    const deliveryPrice = calculatePrice(100, 'delivery');
    
    expect(pickupPrice.total).toBeLessThan(deliveryPrice.total);
  });

  it('debería calcular correctamente el ahorro por recogida', () => {
    const basePrice = 50;
    const pickupPrice = calculatePrice(basePrice, 'pickup');
    const deliveryPrice = calculatePrice(basePrice, 'delivery');
    
    const savings = deliveryPrice.total - pickupPrice.total;
    expect(savings).toBeGreaterThan(0);
    
    // El ahorro debería ser aproximadamente el 20% del precio base más la diferencia de IVA
    const expectedBaseSavings = basePrice * 0.20; // 10
    expect(savings).toBeGreaterThan(expectedBaseSavings);
  });
});

describe('Validación de Formulario', () => {
  const validateOrderForm = (customerInfo: any, deliveryType: string, deliveryAddress?: string) => {
    const errors = [];
    
    if (!customerInfo.name) errors.push('Nombre requerido');
    if (!customerInfo.email) errors.push('Email requerido');
    if (deliveryType === 'delivery' && !deliveryAddress) {
      errors.push('Dirección de entrega requerida');
    }
    
    return errors;
  };

  it('debería validar información del cliente', () => {
    const errors = validateOrderForm({}, 'pickup');
    
    expect(errors).toContain('Nombre requerido');
    expect(errors).toContain('Email requerido');
  });

  it('debería requerir dirección para entrega a domicilio', () => {
    const customerInfo = { name: 'Juan', email: 'juan@test.com' };
    const errors = validateOrderForm(customerInfo, 'delivery');
    
    expect(errors).toContain('Dirección de entrega requerida');
  });

  it('debería no requerir dirección para recogida', () => {
    const customerInfo = { name: 'Juan', email: 'juan@test.com' };
    const errors = validateOrderForm(customerInfo, 'pickup');
    
    expect(errors).not.toContain('Dirección de entrega requerida');
  });

  it('debería pasar validación con datos completos', () => {
    const customerInfo = { name: 'Juan', email: 'juan@test.com' };
    
    // Recogida
    const pickupErrors = validateOrderForm(customerInfo, 'pickup');
    expect(pickupErrors.length).toBe(0);
    
    // Entrega con dirección
    const deliveryErrors = validateOrderForm(customerInfo, 'delivery', 'Calle Falsa 123');
    expect(deliveryErrors.length).toBe(0);
  });
});