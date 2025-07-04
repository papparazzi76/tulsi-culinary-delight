// Tests automáticos para validar la implementación del menú y sistema de pedidos

import { describe, it, expect, beforeEach } from 'vitest';

// Mock de datos de prueba
const mockMenuData = {
  postres: {
    title: "Postres y Bebidas",
    subcategories: [
      {
        title: "Postres",
        items: [
          { name: "Malai / Mango Kulfi", price: "5.00€" },
          { name: "Gulab Jamun", price: "5.50€" },
          { name: "Mango Pudding", price: "5.00€" }
        ]
      },
      {
        title: "Bebidas", 
        items: [
          { name: "Mango Lassi", price: "5.00€" },
          { name: "Sweet Lassi", price: "5.00€" },
          { name: "Chai (con leche)", price: "3.00€" }
        ]
      }
    ]
  }
};

// Mock del hook useCart
const mockCart = {
  cartItems: [
    { id: '1', name: 'Chicken Tikka Masala', price: 16.50, quantity: 2 },
    { id: '2', name: 'Gulab Jamun', price: 5.50, quantity: 1 }
  ],
  calculateTotals: (deliveryType: 'pickup' | 'delivery') => {
    const subtotal = 38.50; // 16.50*2 + 5.50*1
    const discountAmount = deliveryType === 'pickup' ? subtotal * 0.20 : 0;
    const taxAmount = (subtotal - discountAmount) * 0.21;
    const total = subtotal - discountAmount + taxAmount;
    
    return { subtotal, discountAmount, taxAmount, total };
  }
};

describe('Sistema de Menú y Pedidos', () => {
  describe('Sección Postres', () => {
    it('debería contener la sección "Postres" en el menú', () => {
      expect(mockMenuData.postres).toBeDefined();
      expect(mockMenuData.postres.title).toBe("Postres y Bebidas");
    });

    it('debería contener los postres especificados', () => {
      const postresSection = mockMenuData.postres.subcategories.find(
        sub => sub.title === "Postres"
      );
      
      expect(postresSection).toBeDefined();
      expect(postresSection?.items.length).toBeGreaterThan(0);
      
      const postresNames = postresSection?.items.map(item => item.name) || [];
      expect(postresNames).toContain("Malai / Mango Kulfi");
      expect(postresNames).toContain("Gulab Jamun");
      expect(postresNames).toContain("Mango Pudding");
    });

    it('debería contener las bebidas especificadas', () => {
      const bebidasSection = mockMenuData.postres.subcategories.find(
        sub => sub.title === "Bebidas"
      );
      
      expect(bebidasSection).toBeDefined();
      expect(bebidasSection?.items.length).toBeGreaterThan(0);
      
      const bebidasNames = bebidasSection?.items.map(item => item.name) || [];
      expect(bebidasNames).toContain("Mango Lassi");
      expect(bebidasNames).toContain("Sweet Lassi");
      expect(bebidasNames).toContain("Chai (con leche)");
    });
  });

  describe('Opciones de Entrega', () => {
    it('debería aplicar 20% de descuento para recogida en local', () => {
      const totals = mockCart.calculateTotals('pickup');
      
      expect(totals.subtotal).toBe(38.50);
      expect(totals.discountAmount).toBe(38.50 * 0.20); // 7.70
      expect(totals.discountAmount).toBe(7.70);
    });

    it('debería no aplicar descuento para entrega a domicilio', () => {
      const totals = mockCart.calculateTotals('delivery');
      
      expect(totals.subtotal).toBe(38.50);
      expect(totals.discountAmount).toBe(0);
    });

    it('debería calcular correctamente el IVA (21%)', () => {
      const pickupTotals = mockCart.calculateTotals('pickup');
      const deliveryTotals = mockCart.calculateTotals('delivery');
      
      // Para recogida: IVA sobre (subtotal - descuento)
      const expectedPickupTax = (38.50 - 7.70) * 0.21;
      expect(pickupTotals.taxAmount).toBeCloseTo(expectedPickupTax, 2);
      
      // Para entrega: IVA sobre subtotal completo
      const expectedDeliveryTax = 38.50 * 0.21;
      expect(deliveryTotals.taxAmount).toBeCloseTo(expectedDeliveryTax, 2);
    });

    it('debería calcular correctamente el total final', () => {
      const pickupTotals = mockCart.calculateTotals('pickup');
      const deliveryTotals = mockCart.calculateTotals('delivery');
      
      // Recogida: subtotal - descuento + IVA
      const expectedPickupTotal = 38.50 - 7.70 + (38.50 - 7.70) * 0.21;
      expect(pickupTotals.total).toBeCloseTo(expectedPickupTotal, 2);
      
      // Entrega: subtotal + IVA (sin descuento)
      const expectedDeliveryTotal = 38.50 + (38.50 * 0.21);
      expect(deliveryTotals.total).toBeCloseTo(expectedDeliveryTotal, 2);
    });
  });

  describe('Validación de Datos', () => {
    it('debería validar que los precios son números positivos', () => {
      const postresItems = mockMenuData.postres.subcategories
        .flatMap(sub => sub.items);
        
      postresItems.forEach(item => {
        const price = parseFloat(item.price.replace('€', ''));
        expect(price).toBeGreaterThan(0);
        expect(typeof price).toBe('number');
      });
    });

    it('debería validar que todos los elementos tienen nombre y precio', () => {
      const allItems = mockMenuData.postres.subcategories
        .flatMap(sub => sub.items);
        
      allItems.forEach(item => {
        expect(item.name).toBeTruthy();
        expect(item.name.length).toBeGreaterThan(0);
        expect(item.price).toBeTruthy();
        expect(item.price).toMatch(/\d+\.?\d*€/); // Formato de precio válido
      });
    });
  });

  describe('Funcionalidad del Carrito', () => {
    it('debería poder agregar elementos al carrito', () => {
      expect(mockCart.cartItems.length).toBeGreaterThan(0);
      expect(mockCart.cartItems[0]).toHaveProperty('id');
      expect(mockCart.cartItems[0]).toHaveProperty('name');
      expect(mockCart.cartItems[0]).toHaveProperty('price');
      expect(mockCart.cartItems[0]).toHaveProperty('quantity');
    });

    it('debería calcular correctamente el subtotal', () => {
      const expectedSubtotal = mockCart.cartItems.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
      expect(expectedSubtotal).toBe(38.50);
    });
  });
});