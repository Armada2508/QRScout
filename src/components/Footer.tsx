import { useQRScoutState } from '@/store/store';
import { Heart } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Footer() {
  const teamNumber = useQRScoutState(state => state.formData.teamNumber);
  return (
    <footer>
      <div className="mt-8 flex flex-col items-center justify-center p-2 gap-2">
        <div className="h-24 w-96">
        </div>
        {teamNumber !== 2713 && (
          <>
            <Heart className="text-primary size-8 fill-primary" />
            <span className="text-2xl text-primary font-rhr-ns">
              {teamNumber}
            </span>
          </>
        )}
        <Button className='h-4 w-4'>
              variant="secondary"
              size="icon"
              
              owo
          </Button>
      </div>
    </footer>
  );
}
