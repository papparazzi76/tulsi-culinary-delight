package com.tulsi.sunmiprinter

import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.os.IBinder
import android.util.Log
import woyou.aidlservice.jiuiv5.IWoyouService

class SunmiPrinterHelper(private val context: Context) {

    companion object {
        private const val TAG = "SunmiPrinterHelper"
    }

    private var printerService: IWoyouService? = null
    private var isConnected = false

    private val serviceConnection = object : ServiceConnection {
        override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
            printerService = IWoyouService.Stub.asInterface(service)
            isConnected = true
            Log.d(TAG, "Conectado al servicio de impresión Sunmi")
        }

        override fun onServiceDisconnected(name: ComponentName?) {
            printerService = null
            isConnected = false
            Log.d(TAG, "Desconectado del servicio de impresión Sunmi")
        }
    }

    fun initPrinter() {
        try {
            val intent = Intent().apply {
                setPackage("woyou.aidlservice.jiuiv5")
                action = "woyou.aidlservice.jiuiv5.IWoyouService"
            }
            context.bindService(intent, serviceConnection, Context.BIND_AUTO_CREATE)
            Log.d(TAG, "Iniciando conexión con impresora")
        } catch (e: Exception) {
            Log.e(TAG, "Error iniciando impresora: ${e.message}")
        }
    }

    fun disconnect() {
        try {
            context.unbindService(serviceConnection)
            isConnected = false
        } catch (e: Exception) {
            Log.e(TAG, "Error desconectando: ${e.message}")
        }
    }

    fun printOrder(order: OrderData): Boolean {
        if (!isConnected || printerService == null) {
            Log.e(TAG, "Impresora no conectada")
            return false
        }

        try {
            printerService?.apply {
                // Iniciar transacción de impresión
                enterPrinterBuffer(true)

                // Título centrado y en negrita
                setAlignment(1, null) // Centro
                printTextWithFont("NUEVO PEDIDO\n", null, 28f, null)
                
                setAlignment(0, null) // Izquierda
                printText("-------------------------\n", null)
                
                // Datos del cliente
                printTextWithFont("ID: ${order.pedidoId}\n", null, 24f, null)
                printTextWithFont("Cliente: ${order.nombre}\n", null, 24f, null)
                printTextWithFont("Tel: ${order.telefono}\n", null, 24f, null)
                
                if (order.direccion.isNotEmpty()) {
                    printTextWithFont("Dirección: ${order.direccion}\n", null, 24f, null)
                }
                
                printText("-------------------------\n", null)
                printTextWithFont("ARTÍCULOS:\n", null, 24f, null)
                
                // Items del pedido
                order.items.forEach { item ->
                    printTextWithFont("${item.cantidad}x ${item.producto}\n", null, 24f, null)
                }
                
                printText("-------------------------\n", null)
                
                // Total y método de pago
                printTextWithFont("TOTAL: ${String.format("%.2f", order.importe)} €\n", null, 28f, null)
                printTextWithFont("Método de pago: ${order.metodoPago}\n", null, 24f, null)
                
                // Salto de líneas final
                lineWrap(3, null)
                
                // Cortar papel si la impresora lo soporta
                cutPaper(null)
                
                // Ejecutar buffer
                exitPrinterBuffer(true)
            }
            
            Log.d(TAG, "Pedido impreso: ${order.pedidoId}")
            return true
        } catch (e: Exception) {
            Log.e(TAG, "Error imprimiendo: ${e.message}")
            return false
        }
    }
}
