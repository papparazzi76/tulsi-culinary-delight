package com.tulsi.sunmiprinter

data class OrderItem(
    val producto: String,
    val cantidad: Int
)

data class OrderData(
    val pedidoId: Int,
    val nombre: String,
    val telefono: String,
    val direccion: String,
    val items: List<OrderItem>,
    val importe: Double,
    val metodoPago: String
)
