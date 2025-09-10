import CryptoJS from 'crypto-js';

export interface RedsysPaymentData {
  merchantCode: string;
  terminal: string;
  order: string;
  amount: number; // in cents
  currency: string;
  transactionType: string;
  merchantName: string;
  titular: string;
  urlOk: string;
  urlKo: string;
  merchantUrl?: string;
}

export interface RedsysFormData {
  Ds_SignatureVersion: string;
  Ds_MerchantParameters: string;
  Ds_Signature: string;
}

// Configuración para Cajaviva Caja Rural
export const REDSYS_CONFIG = {
  // URLs de Redsys
  URL_TEST: 'https://sis-t.redsys.es:25443/sis/realizarPago',
  URL_PRODUCTION: 'https://sis.redsys.es/sis/realizarPago',
  
  // Datos de Cajaviva Caja Rural
  MERCHANT_CODE: '181048489', // FUC proporcionado
  TERMINAL: '001',
  CURRENCY: '978', // EUR
  TRANSACTION_TYPE: '0', // Autorización
  MERCHANT_NAME: 'Tulsi Indian Restaurant',
  TITULAR: 'Razia Bibi',
  NIE: 'Y4154636E',
  SIGNATURE_VERSION: 'HMAC_SHA256_V1',
  
  // Clave secreta - IMPORTANTE: EN PRODUCCIÓN DEBES OBTENER LA CLAVE REAL DE CAJAVIVA
  SECRET_KEY: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7' // ⚠️ CAMBIAR POR LA CLAVE REAL DE CAJAVIVA CAJA RURAL
};

/**
 * Genera un número de pedido único
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `TUL${timestamp.slice(-6)}${random}`;
}

/**
 * Codifica los parámetros del comerciante en Base64
 */
export function encodeParameters(data: RedsysPaymentData): string {
  const parameters = {
    DS_MERCHANT_AMOUNT: data.amount.toString(),
    DS_MERCHANT_ORDER: data.order,
    DS_MERCHANT_MERCHANTCODE: data.merchantCode,
    DS_MERCHANT_CURRENCY: data.currency,
    DS_MERCHANT_TRANSACTIONTYPE: data.transactionType,
    DS_MERCHANT_TERMINAL: data.terminal,
    DS_MERCHANT_MERCHANTNAME: data.merchantName,
    DS_MERCHANT_TITULAR: data.titular,
    DS_MERCHANT_MERCHANTURL: data.merchantUrl || '',
    DS_MERCHANT_URLOK: data.urlOk,
    DS_MERCHANT_URLKO: data.urlKo
  };

  return btoa(JSON.stringify(parameters));
}

/**
 * Genera la firma HMAC-SHA256
 */
export function generateSignature(encodedParameters: string, order: string, secretKey: string): string {
  // Crear clave derivada usando 3DES
  const key = CryptoJS.enc.Base64.parse(secretKey);
  const cipher = CryptoJS.TripleDES.encrypt(order, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.ZeroPadding
  });
  
  const derivedKey = CryptoJS.enc.Base64.parse(cipher.toString());
  
  // Generar HMAC-SHA256
  const hmac = CryptoJS.HmacSHA256(encodedParameters, derivedKey);
  return CryptoJS.enc.Base64.stringify(hmac);
}

/**
 * Genera todos los datos necesarios para el formulario de Redsys
 */
export function generateRedsysFormData(
  amount: number,
  customerData: { name: string; email: string; phone?: string },
  deliveryType: 'pickup' | 'delivery'
): RedsysFormData {
  const order = generateOrderNumber();
  const baseUrl = window.location.origin;
  
  const paymentData: RedsysPaymentData = {
    merchantCode: REDSYS_CONFIG.MERCHANT_CODE,
    terminal: REDSYS_CONFIG.TERMINAL,
    order: order,
    amount: Math.round(amount * 100), // Convertir a céntimos
    currency: REDSYS_CONFIG.CURRENCY,
    transactionType: REDSYS_CONFIG.TRANSACTION_TYPE,
    merchantName: REDSYS_CONFIG.MERCHANT_NAME,
    titular: REDSYS_CONFIG.TITULAR,
    urlOk: `${baseUrl}/#/pago-exitoso`,
    urlKo: `${baseUrl}/#/pago-cancelado`,
    merchantUrl: `${baseUrl}/#/procesar-pago`
  };

  const encodedParameters = encodeParameters(paymentData);
  const signature = generateSignature(encodedParameters, order, REDSYS_CONFIG.SECRET_KEY);

  return {
    Ds_SignatureVersion: REDSYS_CONFIG.SIGNATURE_VERSION,
    Ds_MerchantParameters: encodedParameters,
    Ds_Signature: signature
  };
}

/**
 * Crea y envía el formulario de pago a Redsys
 */
export function submitPaymentForm(formData: RedsysFormData, isProduction = false) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = isProduction ? REDSYS_CONFIG.URL_PRODUCTION : REDSYS_CONFIG.URL_TEST;
  form.style.display = 'none';

  // Agregar campos del formulario
  Object.entries(formData).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
