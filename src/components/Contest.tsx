// src/components/Contest.tsx
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Participant {
  name: string;
  email: string;
}

const Contest = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isCountdown, setIsCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [winner, setWinner] = useState<Participant | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const spinSoundRef = useRef<OscillatorNode | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const headers = lines[0].split(',').map(h => h.trim());
        
        if (!headers.includes('name') || !headers.includes('email')) {
          toast.error('El archivo CSV debe contener las columnas "name" y "email".');
          return;
        }

        const newParticipants = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          const participant: Participant = { name: '', email: '' };
          headers.forEach((header, index) => {
            if (header === 'name' || header === 'email') {
              participant[header] = values[index];
            }
          });
          return participant;
        });
        setParticipants(newParticipants);
        toast.success(`${newParticipants.length} participantes cargados.`);
      };
      reader.readAsText(file);
    }
  };

  // Initialize audio context
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Play beep sound
  const playBeep = useCallback(() => {
    const audioContext = initAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  }, [initAudioContext]);

  // Play spinning sound
  const startSpinSound = useCallback(() => {
    const audioContext = initAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(50, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    // Create the "clac clac clac" effect with rapid frequency changes
    const now = audioContext.currentTime;
    for (let i = 0; i < 15; i++) {
      const time = now + (i * 1);
      oscillator.frequency.setValueAtTime(50 + Math.random() * 30, time);
      oscillator.frequency.setValueAtTime(80 + Math.random() * 40, time + 0.1);
      oscillator.frequency.setValueAtTime(30 + Math.random() * 20, time + 0.2);
    }
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 15);
    spinSoundRef.current = oscillator;
  }, [initAudioContext]);

  const stopSpinSound = useCallback(() => {
    if (spinSoundRef.current) {
      try {
        spinSoundRef.current.stop();
      } catch (e) {
        // Oscillator might already be stopped
      }
      spinSoundRef.current = null;
    }
  }, []);

  const maskEmail = (email: string): string => {
    const [username, domain] = email.split('@');
    if (username.length <= 4) {
      return `${username[0]}***@${domain}`;
    }
    
    const visibleChars = Math.max(1, username.length - 4);
    const maskedPart = '*'.repeat(Math.min(4, username.length - 1));
    return `${username.substring(0, visibleChars)}${maskedPart}@${domain}`;
  };

  const startCountdown = useCallback(() => {
    setIsCountdown(true);
    setCountdown(5);
    setWinner(null);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsCountdown(false);
          
          // Start actual spinning
          setIsSpinning(true);
          startSpinSound();
          
          const winnerIndex = Math.floor(Math.random() * participants.length);
          
          setTimeout(() => {
            stopSpinSound();
            setWinner(participants[winnerIndex]);
            setIsSpinning(false);
            toast.success(`¡El ganador es ${participants[winnerIndex].name}!`);
          }, 15000); // 15 seconds spin
          
          return 0;
        } else {
          playBeep();
          return prev - 1;
        }
      });
    }, 1000);
  }, [participants, playBeep, startSpinSound, stopSpinSound]);

  const handleSpin = () => {
    if (participants.length === 0) {
      toast.error('Carga una lista de participantes primero.');
      return;
    }

    startCountdown();
  };

  const getWheelSegments = () => {
    if (participants.length === 0) return [];
    
    const segmentAngle = 360 / participants.length;
    return participants.map((participant, index) => ({
      ...participant,
      startAngle: index * segmentAngle,
      endAngle: (index + 1) * segmentAngle,
      color: `hsl(${(index * 137.5) % 360}, 60%, 65%)` // Golden ratio for color distribution
    }));
  };

  return (
    <div className="p-6 bg-card rounded-lg text-center">
      <h2 className="text-3xl font-playfair text-accent mb-6">Ruleta de la Fortuna</h2>
      
      <Input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={fileInputRef}
        className="mb-4"
      />

      <Button onClick={handleSpin} disabled={isSpinning || isCountdown || participants.length === 0} className="btn-tulsi">
        {isCountdown ? `Preparando... ${countdown}` : isSpinning ? 'Girando...' : '¡Girar la Ruleta!'}
      </Button>

      {/* Countdown Display */}
      {isCountdown && (
        <div className="mt-6 text-center">
          <div className="text-6xl font-bold text-accent animate-pulse">{countdown}</div>
          <div className="text-lg text-muted-foreground">¡Preparándose para girar!</div>
        </div>
      )}

      {/* Wheel of Fortune Animation */}
      {participants.length > 0 && (
        <div className="mt-8 flex justify-center">
          <div className="relative">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-l-transparent border-r-transparent border-b-accent"></div>
            </div>
            
            {/* Wheel */}
            <div 
              className={`relative w-80 h-80 rounded-full border-4 border-accent shadow-tulsi-glow transition-transform duration-[15000ms] ease-out ${
                isSpinning ? '' : ''
              }`}
              style={{
                transform: isSpinning ? `rotate(${Math.random() * 360 + 3600}deg)` : 'rotate(0deg)',
                transitionDuration: isSpinning ? '15s' : '0s'
              }}
            >
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {getWheelSegments().map((segment, index) => {
                  const radius = 95;
                  const centerX = 100;
                  const centerY = 100;
                  
                  const startAngleRad = (segment.startAngle * Math.PI) / 180;
                  const endAngleRad = (segment.endAngle * Math.PI) / 180;
                  
                  const x1 = centerX + radius * Math.cos(startAngleRad);
                  const y1 = centerY + radius * Math.sin(startAngleRad);
                  const x2 = centerX + radius * Math.cos(endAngleRad);
                  const y2 = centerY + radius * Math.sin(endAngleRad);
                  
                  const largeArcFlag = segment.endAngle - segment.startAngle > 180 ? 1 : 0;
                  
                  const pathData = [
                    `M ${centerX} ${centerY}`,
                    `L ${x1} ${y1}`,
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    'Z'
                  ].join(' ');
                  
                  // Text position
                  const textAngle = (segment.startAngle + segment.endAngle) / 2;
                  const textRadius = radius * 0.7;
                  const textX = centerX + textRadius * Math.cos((textAngle * Math.PI) / 180);
                  const textY = centerY + textRadius * Math.sin((textAngle * Math.PI) / 180);
                  
                  return (
                    <g key={index}>
                      <path
                        d={pathData}
                        fill={segment.color}
                        stroke="white"
                        strokeWidth="2"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-6 border-dashed border-2 border-accent/50 rounded-lg">
        {isSpinning && <div className="text-2xl animate-pulse">Eligiendo un ganador...</div>}
        
        {winner && (
          <div>
            <div className="text-xl mb-2">¡Felicidades!</div>
            <div className="text-4xl font-bold text-accent">{winner.name}</div>
            <div className="text-muted-foreground">{maskEmail(winner.email)}</div>
          </div>
        )}

        {!isSpinning && !winner && participants.length === 0 && (
          <div className="text-muted-foreground">Carga un archivo CSV para ver la ruleta.</div>
        )}

        {!isSpinning && !winner && participants.length > 0 && (
          <div className="text-muted-foreground">¡Presiona el botón para girar la ruleta!</div>
        )}
      </div>
    </div>
  );
};

export default Contest;
