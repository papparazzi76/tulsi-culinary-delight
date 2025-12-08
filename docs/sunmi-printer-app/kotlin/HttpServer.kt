package com.tulsi.sunmiprinter

import android.util.Log
import fi.iki.elonen.NanoHTTPD
import org.json.JSONArray
import org.json.JSONObject

class HttpServer(
    port: Int,
    private val printerHelper: SunmiPrinterHelper
) : NanoHTTPD(port) {

    companion object {
        private const val TAG = "HttpServer"
    }

    override fun serve(session: IHTTPSession): Response {
        Log.d(TAG, "Request: ${session.method} ${session.uri}")

        // Solo aceptar POST en /pedido
        if (session.uri != "/pedido") {
            return newFixedLengthResponse(
                Response.Status.NOT_FOUND,
                "application/json",
                """{"error": "Endpoint no encontrado"}"""
            )
        }

        if (session.method != Method.POST) {
            return newFixedLengthResponse(
                Response.Status.METHOD_NOT_ALLOWED,
                "application/json",
                """{"error": "Solo se acepta POST"}"""
            )
        }

        // Verificar Content-Type
        val contentType = session.headers["content-type"] ?: ""
        if (!contentType.contains("application/json")) {
            return newFixedLengthResponse(
                Response.Status.BAD_REQUEST,
                "application/json",
                """{"error": "Content-Type debe ser application/json"}"""
            )
        }

        try {
            // Leer body
            val contentLength = session.headers["content-length"]?.toIntOrNull() ?: 0
            val buffer = ByteArray(contentLength)
            session.inputStream.read(buffer, 0, contentLength)
            val body = String(buffer)

            Log.d(TAG, "Body recibido: $body")

            // Parsear JSON
            val order = parseOrder(body)
            
            // Imprimir pedido
            val success = printerHelper.printOrder(order)

            return if (success) {
                Log.d(TAG, "Pedido ${order.pedidoId} impreso correctamente")
                newFixedLengthResponse(
                    Response.Status.OK,
                    "application/json",
                    """{"status": "ok"}"""
                )
            } else {
                Log.e(TAG, "Error imprimiendo pedido ${order.pedidoId}")
                newFixedLengthResponse(
                    Response.Status.INTERNAL_ERROR,
                    "application/json",
                    """{"status": "error", "message": "Error al imprimir"}"""
                )
            }

        } catch (e: Exception) {
            Log.e(TAG, "Error procesando request: ${e.message}")
            return newFixedLengthResponse(
                Response.Status.BAD_REQUEST,
                "application/json",
                """{"status": "error", "message": "${e.message}"}"""
            )
        }
    }

    private fun parseOrder(json: String): OrderData {
        val jsonObject = JSONObject(json)
        
        val items = mutableListOf<OrderItem>()
        val itemsArray = jsonObject.getJSONArray("items")
        for (i in 0 until itemsArray.length()) {
            val itemObj = itemsArray.getJSONObject(i)
            items.add(OrderItem(
                producto = itemObj.getString("producto"),
                cantidad = itemObj.getInt("cantidad")
            ))
        }

        return OrderData(
            pedidoId = jsonObject.getInt("pedido_id"),
            nombre = jsonObject.getString("nombre"),
            telefono = jsonObject.getString("telefono"),
            direccion = jsonObject.optString("direccion", ""),
            items = items,
            importe = jsonObject.getDouble("importe"),
            metodoPago = jsonObject.getString("metodo_pago")
        )
    }
}
