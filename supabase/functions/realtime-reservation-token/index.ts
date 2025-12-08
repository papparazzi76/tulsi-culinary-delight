import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `Eres el asistente virtual de Tulsi Indian Restaurant en Valladolid, España. Tu rol es ayudar a los clientes a hacer reservas de mesa.

INFORMACIÓN DEL RESTAURANTE:
- Nombre: Tulsi Indian Restaurant
- Dirección: C/ Marina Escobar 1, 47001 Valladolid
- Teléfono: +34 645 94 62 02
- Horario: Martes a Domingo, 13:00-16:00 y 20:00-23:30. Lunes cerrado.

PROCESO DE RESERVA:
1. Saluda amablemente y pregunta para cuántas personas es la reserva
2. Pregunta la fecha deseada (verifica que no sea lunes)
3. Pregunta la hora preferida (dentro del horario)
4. Solicita el nombre para la reserva
5. Pide un número de teléfono de contacto
6. Pide un email para enviar la confirmación
7. Confirma todos los datos antes de finalizar

REGLAS:
- Habla siempre en español
- Sé amable, cálido y profesional
- Si preguntan sobre el menú, menciona que tienen auténtica cocina india
- Capacidad máxima por reserva: 14 personas
- Para grupos mayores, pide que llamen directamente
- Cuando tengas todos los datos, usa la función save_reservation para guardar la reserva

DATOS A RECOGER:
- number_of_guests: número de comensales (1-14)
- reservation_date: fecha en formato YYYY-MM-DD
- reservation_time: hora en formato HH:MM
- customer_name: nombre del cliente
- customer_phone: teléfono de contacto
- customer_email: email para confirmación`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    // Request ephemeral token from OpenAI
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        voice: "coral",
        instructions: SYSTEM_PROMPT,
        input_audio_format: "pcm16",
        output_audio_format: "pcm16",
        input_audio_transcription: {
          model: "whisper-1"
        },
        turn_detection: {
          type: "server_vad",
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 800
        },
        tools: [
          {
            type: "function",
            name: "save_reservation",
            description: "Guarda la reserva en el sistema cuando el cliente confirma todos los datos",
            parameters: {
              type: "object",
              properties: {
                number_of_guests: { 
                  type: "integer",
                  description: "Número de comensales"
                },
                reservation_date: { 
                  type: "string",
                  description: "Fecha de la reserva en formato YYYY-MM-DD"
                },
                reservation_time: { 
                  type: "string",
                  description: "Hora de la reserva en formato HH:MM"
                },
                customer_name: { 
                  type: "string",
                  description: "Nombre del cliente"
                },
                customer_phone: { 
                  type: "string",
                  description: "Teléfono de contacto"
                },
                customer_email: { 
                  type: "string",
                  description: "Email para la confirmación"
                }
              },
              required: ["number_of_guests", "reservation_date", "reservation_time", "customer_name", "customer_phone", "customer_email"]
            }
          }
        ],
        tool_choice: "auto"
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Session created successfully");

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
