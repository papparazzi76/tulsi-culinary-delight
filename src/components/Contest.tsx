// src/components/Contest.tsx
import { useState, useRef } from 'react';
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
  const [winner, setWinner] = useState<Participant | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSpin = () => {
    if (participants.length === 0) {
      toast.error('Carga una lista de participantes primero.');
      return;
    }

    setIsSpinning(true);
    setWinner(null);

    const spinDuration = Math.random() * 3000 + 3000;
    const winnerIndex = Math.floor(Math.random() * participants.length);
    
    setTimeout(() => {
      setWinner(participants[winnerIndex]);
      setIsSpinning(false);
      toast.success(`¡El ganador es ${participants[winnerIndex].name}!`);
    }, spinDuration);
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

      <Button onClick={handleSpin} disabled={isSpinning || participants.length === 0} className="btn-tulsi">
        {isSpinning ? 'Girando...' : '¡Girar la Ruleta!'}
      </Button>

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
              className={`relative w-80 h-80 rounded-full border-4 border-accent shadow-tulsi-glow transition-transform duration-[3000ms] ease-out ${
                isSpinning ? 'animate-spin' : ''
              }`}
              style={{
                transform: isSpinning ? `rotate(${Math.random() * 360 + 1800}deg)` : 'rotate(0deg)'
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
                      <text
                        x={textX}
                        y={textY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xs font-medium fill-white"
                        transform={`rotate(${textAngle > 90 && textAngle < 270 ? textAngle + 180 : textAngle} ${textX} ${textY})`}
                      >
                        {segment.name.length > 12 ? segment.name.substring(0, 12) + '...' : segment.name}
                      </text>
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
            <div className="text-muted-foreground">{winner.email}</div>
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
