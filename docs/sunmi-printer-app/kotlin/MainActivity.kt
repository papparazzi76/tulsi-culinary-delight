package com.tulsi.sunmiprinter

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import java.net.NetworkInterface

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Mostrar IP del dispositivo
        val ipAddress = getLocalIpAddress()
        findViewById<TextView>(R.id.tvStatus).text = "Servicio de impresión de pedidos activo"
        findViewById<TextView>(R.id.tvPort).text = "Escuchando en puerto 8080"
        findViewById<TextView>(R.id.tvIp).text = "IP: $ipAddress"

        // Iniciar servicio en primer plano
        startPrinterService()
    }

    private fun startPrinterService() {
        val intent = Intent(this, PrinterService::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            startForegroundService(intent)
        } else {
            startService(intent)
        }
    }

    private fun getLocalIpAddress(): String {
        try {
            val interfaces = NetworkInterface.getNetworkInterfaces()
            while (interfaces.hasMoreElements()) {
                val networkInterface = interfaces.nextElement()
                val addresses = networkInterface.inetAddresses
                while (addresses.hasMoreElements()) {
                    val address = addresses.nextElement()
                    if (!address.isLoopbackAddress && address.hostAddress?.contains(".") == true) {
                        return address.hostAddress ?: "No disponible"
                    }
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return "No disponible"
    }
}
