import { Button } from '@/components/ui/button';
import { resetToCycleConfig, resetToMatchConfig, resetToPitConfig } from '@/store/store';
import { Clock } from 'lucide-react';
import { Section } from '../../core/Section';
import { ThemeSelector } from './ThemeSelector';
import { LandPlot, Tv } from 'lucide-react';
// import { getCycleConfig, getMatchConfig, getPitConfig } from "@/store/store"



export function ConfigSection() {
  // const formData = useQRScoutState(state => state.formData);
  
  return (
    <Section title='Change Form'>
      <div className="flex flex-col justify-center items-center gap-4">
        {/* <Button
          variant="secondary"
          onClick={() =>
            navigator.clipboard.writeText(
              formData.sections
                .map(s => s.fields)
                .flat()
                .map(f => f.title)
                .join('\t'),
            )
          }
        >
          <Copy className="h-5 w-5" />
          Copy Column Names
        </Button> */}
        <Button
          variant="secondary"
          onClick={() =>
            resetToCycleConfig() 
          }
        >
          <Clock className='h-5, w-5'/>
          Cycle
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            resetToMatchConfig() 
          }
        >
          <Tv className='h-5, w-5'/>
          Match
        </Button>
        <Button
          
          variant="secondary"
          onClick={() =>
            resetToPitConfig() 
          }
        >
          <LandPlot className='h-5, w-5'/>
          Pit
        </Button>
        
        <ThemeSelector />
      </div>
    </Section>
  );
}
