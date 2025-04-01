import { Button } from '@/components/ui/button';
import { resetToCycleConfig, resetToMatchConfig, resetToMatchConfigOwO, resetToPitConfig } from '@/store/store';
import { Clock } from 'lucide-react';
import { Section } from '../../core/Section';
import { ThemeSelector } from './ThemeSelector';
import { LandPlot, Tv } from 'lucide-react';
// import { useState } from 'react';
// import { Modal } from '@/components/core/Modal';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
// import { getCycleConfig, getMatchConfig, getPitConfig } from "@/store/store"

export interface ForiddenConfigsProps {
  disabled?: boolean;
}

export function ConfigSection(props: ForiddenConfigsProps) {
  // const formData = useQRScoutState(state => state.formData);
  // const [showModal, setShowModal] = useState(false);

  // const onCancel = () => {
  //   setShowModal(false);
  // };
  // const OwoMatchReset = () => {
  //   onConfirm();
  //   resetToMatchConfigOwO();
  // }
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
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={props.disabled} variant={"ghost"}>

            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-3xl text-primary text-center font-rhr-ns tracking-wider ">
              Forbidden Configs
            </DialogTitle>
            <Button onClick={() => resetToMatchConfigOwO()} variant={"secondary"} size={'icon'}>
              MatchOwO
            </Button>
            <DialogFooter>

            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* <Button
        variant={"ghost"}
        onClick={() => setShowModal(true)}
        >
        <Modal show={showModal} onDismiss={onCancel}>
          <div className='p-4'>
            <h2 className='font-semibold text-3xl text-primary text-center font-rhr-ns tracking-wider color: black'></h2>
            <p>Forbidden Configs</p>
            <div className='flex justify-end gap-2 mt-4'>
              <Button variant={"destructive"} onClick={() => resetToMatchConfigOwO()} className="w-full sm:w-auto">
                Match OwO 
              </Button>
              <Button variant={"outline"} onClick={() => onCancel} className="w-full sm:w-auto">
                Close
              </Button>
            </div>
          </div>
        </Modal>
        </Button> */}
        
        <ThemeSelector />
      </div>
    </Section>
  );
}
