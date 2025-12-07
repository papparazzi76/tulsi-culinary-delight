import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff, Send, Phone, Volume2, VolumeX, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const VoiceReservationAssistant: React.FC = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [textInput, setTextInput] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startConversation = async () => {
    setIsConnecting(true);
    
    try {
      // Get ephemeral token
      const { data: tokenData, error: tokenError } = await supabase.functions.invoke('realtime-reservation-token');
      
      if (tokenError || !tokenData?.client_secret?.value) {
        throw new Error('No se pudo obtener el token de sesión');
      }

      const ephemeralKey = tokenData.client_secret.value;

      // Create peer connection
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Set up audio element for playback
      const audioEl = document.createElement('audio');
      audioEl.autoplay = true;
      audioElRef.current = audioEl;

      pc.ontrack = (e) => {
        audioEl.srcObject = e.streams[0];
      };

      // Add local audio track
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      localStreamRef.current = stream;
      pc.addTrack(stream.getTracks()[0]);

      // Set up data channel for events
      const dc = pc.createDataChannel('oai-events');
      dcRef.current = dc;

      dc.addEventListener('message', async (e) => {
        const event = JSON.parse(e.data);
        console.log('Received event:', event.type, event);
        
        handleRealtimeEvent(event);
      });

      dc.addEventListener('open', () => {
        console.log('Data channel open');
        setIsListening(true);
      });

      // Create offer and connect
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpResponse = await fetch(
        'https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17',
        {
          method: 'POST',
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${ephemeralKey}`,
            'Content-Type': 'application/sdp',
          },
        }
      );

      const answerSdp = await sdpResponse.text();
      await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });

      setIsConnected(true);
      setMessages([{ 
        role: 'assistant', 
        content: '¡Hola! Soy el asistente de Tulsi Indian Restaurant. ¿En qué puedo ayudarte con tu reserva?' 
      }]);

      toast({
        title: "Conectado",
        description: "El asistente de voz está listo",
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'No se pudo iniciar la conversación',
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleRealtimeEvent = async (event: any) => {
    switch (event.type) {
      case 'response.audio_transcript.delta':
        // Update assistant message with transcript
        setMessages(prev => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg?.role === 'assistant' && !lastMsg.content.endsWith('...')) {
            return [...prev.slice(0, -1), { ...lastMsg, content: lastMsg.content + event.delta }];
          }
          return prev;
        });
        break;

      case 'response.audio_transcript.done':
        setMessages(prev => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg?.role === 'assistant') {
            return [...prev.slice(0, -1), { ...lastMsg, content: event.transcript }];
          }
          return [...prev, { role: 'assistant', content: event.transcript }];
        });
        break;

      case 'input_audio_buffer.speech_started':
        setIsListening(true);
        break;

      case 'input_audio_buffer.speech_stopped':
        setIsListening(false);
        break;

      case 'conversation.item.input_audio_transcription.completed':
        if (event.transcript) {
          setMessages(prev => [...prev, { role: 'user', content: event.transcript }]);
        }
        break;

      case 'response.audio.delta':
        setIsSpeaking(true);
        break;

      case 'response.audio.done':
        setIsSpeaking(false);
        break;

      case 'response.function_call_arguments.done':
        if (event.name === 'save_reservation') {
          await handleSaveReservation(JSON.parse(event.arguments));
        }
        break;

      case 'response.done':
        // Check for function calls in the response
        const functionCalls = event.response?.output?.filter(
          (item: any) => item.type === 'function_call'
        );
        
        if (functionCalls?.length > 0) {
          for (const fc of functionCalls) {
            if (fc.name === 'save_reservation') {
              const result = await handleSaveReservation(JSON.parse(fc.arguments));
              
              // Send function result back
              if (dcRef.current?.readyState === 'open') {
                dcRef.current.send(JSON.stringify({
                  type: 'conversation.item.create',
                  item: {
                    type: 'function_call_output',
                    call_id: fc.call_id,
                    output: JSON.stringify(result)
                  }
                }));
                dcRef.current.send(JSON.stringify({ type: 'response.create' }));
              }
            }
          }
        }
        break;
    }
  };

  const handleSaveReservation = async (args: any) => {
    console.log('Saving reservation:', args);
    
    try {
      const { data, error } = await supabase.functions.invoke('save-voice-reservation', {
        body: args
      });

      if (error) throw error;

      toast({
        title: "¡Reserva Confirmada!",
        description: `Reserva para ${args.number_of_guests} personas el ${args.reservation_date} a las ${args.reservation_time}`,
      });

      return { success: true, message: 'Reserva guardada correctamente' };
    } catch (error) {
      console.error('Error saving reservation:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar la reserva",
        variant: "destructive",
      });
      return { success: false, error: 'Error al guardar la reserva' };
    }
  };

  const endConversation = () => {
    localStreamRef.current?.getTracks().forEach(track => track.stop());
    dcRef.current?.close();
    pcRef.current?.close();
    
    pcRef.current = null;
    dcRef.current = null;
    localStreamRef.current = null;
    
    setIsConnected(false);
    setIsListening(false);
    setIsSpeaking(false);
    setMessages([]);
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  const sendTextMessage = () => {
    if (!textInput.trim() || !dcRef.current || dcRef.current.readyState !== 'open') return;

    const message = textInput.trim();
    setTextInput('');
    setMessages(prev => [...prev, { role: 'user', content: message }]);

    // Send text message
    dcRef.current.send(JSON.stringify({
      type: 'conversation.item.create',
      item: {
        type: 'message',
        role: 'user',
        content: [{ type: 'input_text', text: message }]
      }
    }));
    dcRef.current.send(JSON.stringify({ type: 'response.create' }));
  };

  return (
    <div className="relative w-full">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-accent mb-4 font-playfair">
          Reserva tu Mesa
        </h3>
        <p className="text-muted-foreground">
          Habla con nuestro asistente virtual para hacer tu reserva
        </p>
      </div>

      <div className="bg-card rounded-xl shadow-tulsi border-2 border-accent/20 overflow-hidden">
        {/* Messages area */}
        <div className="h-80 overflow-y-auto p-4 space-y-3 bg-background/50">
          {messages.length === 0 && !isConnected && (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
              <Phone className="w-12 h-12 mb-4 text-accent/50" />
              <p>Pulsa "Iniciar Conversación" para hablar con nuestro asistente</p>
              <p className="text-sm mt-2">O llámanos al +34 983 116 862</p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.role === 'user'
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Status indicators */}
        {isConnected && (
          <div className="px-4 py-2 bg-muted/30 flex items-center justify-center gap-4 text-sm">
            {isListening && (
              <span className="flex items-center gap-2 text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Escuchando...
              </span>
            )}
            {isSpeaking && (
              <span className="flex items-center gap-2 text-accent">
                <Volume2 className="w-4 h-4 animate-pulse" />
                Hablando...
              </span>
            )}
          </div>
        )}

        {/* Text input */}
        {isConnected && showTextInput && (
          <div className="p-4 border-t border-border flex gap-2">
            <Input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              onKeyPress={(e) => e.key === 'Enter' && sendTextMessage()}
            />
            <Button onClick={sendTextMessage} size="icon" variant="secondary">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Controls */}
        <div className="p-4 border-t border-border bg-card flex flex-wrap justify-center gap-3">
          {!isConnected ? (
            <Button
              onClick={startConversation}
              disabled={isConnecting}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              size="lg"
            >
              {isConnecting ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Conectando...
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 mr-2" />
                  Iniciar Conversación
                </>
              )}
            </Button>
          ) : (
            <>
              <Button
                onClick={toggleMute}
                variant={isMuted ? "destructive" : "secondary"}
                size="icon"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              
              <Button
                onClick={() => setShowTextInput(!showTextInput)}
                variant={showTextInput ? "default" : "secondary"}
                size="icon"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>

              <Button
                onClick={endConversation}
                variant="destructive"
              >
                Finalizar
              </Button>
            </>
          )}
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        También puedes llamarnos al <a href="tel:+34983116862" className="text-accent hover:underline">+34 983 116 862</a>
      </p>
    </div>
  );
};

export default VoiceReservationAssistant;
