# Sunmi V2S Printer App

App Android nativa para recibir pedidos via HTTP e imprimirlos automáticamente en la impresora térmica del Sunmi V2S.

## Estructura del Proyecto

```
app/
├── src/main/
│   ├── java/com/tulsi/sunmiprinter/
│   │   ├── MainActivity.kt
│   │   ├── PrinterService.kt
│   │   ├── SunmiPrinterHelper.kt
│   │   ├── HttpServer.kt
│   │   ├── BootReceiver.kt
│   │   └── model/
│   │       └── OrderData.kt
│   ├── res/
│   │   ├── layout/
│   │   │   └── activity_main.xml
│   │   └── values/
│   │       └── strings.xml
│   └── AndroidManifest.xml
├── build.gradle.kts
└── libs/
    └── woyou-aidlservice-v5.aar (Sunmi SDK)
```

## Instrucciones de Compilación

1. Abrir Android Studio
2. Crear nuevo proyecto "Empty Activity" con Kotlin
3. Package name: `com.tulsi.sunmiprinter`
4. Min SDK: API 21
5. Copiar los archivos de este directorio
6. Descargar el SDK de Sunmi desde: https://github.com/user-attachments/files/10000000/woyou-aidlservice-v5.zip
7. Build > Build APK
8. Instalar en el Sunmi V2S

## Endpoint

```
POST http://<IP_SUNMI>:8080/pedido
Content-Type: application/json

{
  "pedido_id": 1034,
  "nombre": "Carlos Rodríguez",
  "telefono": "600000000",
  "direccion": "Calle Ejemplo 123",
  "items": [
    {"producto": "Pollo tikka masala", "cantidad": 1},
    {"producto": "Pan naan", "cantidad": 2}
  ],
  "importe": 21.50,
  "metodo_pago": "Pago en local"
}
```

## Respuesta

```json
{"status": "ok"}
```
