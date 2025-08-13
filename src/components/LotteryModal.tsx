import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Contest from '@/components/Contest';

interface LotteryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LotteryModal = ({ isOpen, onClose }: LotteryModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-6xl bg-background rounded-lg shadow-xl">
            {/* Close button */}
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10"
            >
              <X className="h-6 w-6" />
            </Button>
            
            {/* Contest content */}
            <div className="p-8">
              <Contest />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotteryModal;