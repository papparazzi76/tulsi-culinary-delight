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

      <div className="mt-8 p-6 border-dashed border-2 border-accent/50 rounded-lg">
        {isSpinning && <div className="text-2xl animate-pulse">Eligiendo un ganador...</div>}
        
        {winner && (
          <div>
            <div className="text-xl mb-2">¡Felicidades!</div>
            <div className="text-4xl font-bold text-accent">{winner.name}</div>
            <div className="text-muted-foreground">{winner.email}</div>
          </div>
        )}

        {!isSpinning && !winner && (
          <div className="text-muted-foreground">El ganador aparecerá aquí.</div>
        )}
      </div>
    </div>
  );
};

export default Contest;
