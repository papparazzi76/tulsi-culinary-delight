import { Wheat, Fish, Egg, Milk, Nut, Leaf, Droplet } from 'lucide-react';
import { Allergen } from '@/data/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AllergenIconsProps {
  allergens?: Allergen[];
  size?: 'sm' | 'md' | 'lg';
}

const allergenInfo: Record<Allergen, { icon: React.ReactNode; label: string; color: string }> = {
  gluten: { 
    icon: <Wheat className="w-full h-full" />, 
    label: 'Gluten (cereales)', 
    color: 'text-amber-600' 
  },
  crustaceos: { 
    icon: <span className="w-full h-full flex items-center justify-center font-bold">🦐</span>, 
    label: 'Crustáceos', 
    color: 'text-orange-600' 
  },
  huevos: { 
    icon: <Egg className="w-full h-full" />, 
    label: 'Huevos', 
    color: 'text-yellow-600' 
  },
  pescado: { 
    icon: <Fish className="w-full h-full" />, 
    label: 'Pescado', 
    color: 'text-blue-600' 
  },
  cacahuetes: { 
    icon: <span className="w-full h-full flex items-center justify-center font-bold">🥜</span>, 
    label: 'Cacahuetes', 
    color: 'text-amber-700' 
  },
  soja: { 
    icon: <Leaf className="w-full h-full" />, 
    label: 'Soja', 
    color: 'text-green-700' 
  },
  lacteos: { 
    icon: <Milk className="w-full h-full" />, 
    label: 'Lácteos (leche)', 
    color: 'text-blue-400' 
  },
  frutos_cascara: { 
    icon: <Nut className="w-full h-full" />, 
    label: 'Frutos de cáscara', 
    color: 'text-amber-800' 
  },
  apio: { 
    icon: <span className="w-full h-full flex items-center justify-center font-bold">🌿</span>, 
    label: 'Apio', 
    color: 'text-green-600' 
  },
  mostaza: { 
    icon: <Droplet className="w-full h-full" />, 
    label: 'Mostaza', 
    color: 'text-yellow-700' 
  },
  sesamo: { 
    icon: <span className="w-full h-full flex items-center justify-center text-xs font-bold">S</span>, 
    label: 'Sésamo', 
    color: 'text-amber-600' 
  },
  sulfitos: { 
    icon: <span className="w-full h-full flex items-center justify-center text-xs font-bold">SO₂</span>, 
    label: 'Sulfitos', 
    color: 'text-purple-600' 
  },
  altramuces: { 
    icon: <span className="w-full h-full flex items-center justify-center font-bold">🫘</span>, 
    label: 'Altramuces', 
    color: 'text-yellow-800' 
  },
  moluscos: { 
    icon: <span className="w-full h-full flex items-center justify-center font-bold">🐚</span>, 
    label: 'Moluscos', 
    color: 'text-pink-600' 
  }
};

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
};

export default function AllergenIcons({ allergens, size = 'md' }: AllergenIconsProps) {
  if (!allergens || allergens.length === 0) return null;

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {allergens.map((allergen) => {
          const info = allergenInfo[allergen];
          return (
            <Tooltip key={allergen}>
              <TooltipTrigger asChild>
                <div 
                  className={`${sizeClasses[size]} ${info.color} rounded-full border-2 border-current p-0.5 flex items-center justify-center cursor-help`}
                  aria-label={info.label}
                >
                  {info.icon}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">{info.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
