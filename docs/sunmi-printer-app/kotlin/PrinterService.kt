package com.tulsi.sunmiprinter

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat

class PrinterService : Service() {

    companion object {
        private const val TAG = "PrinterService"
        private const val NOTIFICATION_ID = 1001
        private const val CHANNEL_ID = "printer_service_channel"
    }

    private var httpServer: HttpServer? = null
    private lateinit var printerHelper: SunmiPrinterHelper

    override fun onCreate() {
        super.onCreate()
        Log.d(TAG, "Servicio creado")
        
        // Inicializar helper de impresora
        printerHelper = SunmiPrinterHelper(this)
        printerHelper.initPrinter()
        
        // Iniciar servidor HTTP
        startHttpServer()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d(TAG, "Servicio iniciado")
        createNotificationChannel()
        startForeground(NOTIFICATION_ID, createNotification())
        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "Servicio destruido")
        httpServer?.stop()
        printerHelper.disconnect()
    }

    private fun startHttpServer() {
        try {
            httpServer = HttpServer(8080, printerHelper)
            httpServer?.start()
            Log.d(TAG, "Servidor HTTP iniciado en puerto 8080")
        } catch (e: Exception) {
            Log.e(TAG, "Error iniciando servidor HTTP: ${e.message}")
        }
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Servicio de Impresión",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Servicio de impresión de pedidos Tulsi"
                setShowBadge(false)
            }
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)
        }
    }

    private fun createNotification(): Notification {
        val pendingIntent = PendingIntent.getActivity(
            this,
            0,
            Intent(this, MainActivity::class.java),
            PendingIntent.FLAG_IMMUTABLE
        )

        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Tulsi Printer")
            .setContentText("Escuchando pedidos en puerto 8080")
            .setSmallIcon(android.R.drawable.ic_menu_send)
            .setContentIntent(pendingIntent)
            .setOngoing(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()
    }
}
