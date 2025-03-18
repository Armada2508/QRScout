import { ConfigEditor } from '@/components/ConfigEditor';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { setConfig, useQRScoutState } from '@/store/store';
import { Copy, Edit2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Section } from '../../core/Section';
import { ThemeSelector } from './ThemeSelector';
import cycleConfigJson from '../../../../config/2025/cycleConfig.json';



export function ConfigSection() {
  const [showEditor, setShowEditor] = useState(false);
  // Could I potentially change the formData variable for this?
  const formData = useQRScoutState(state => state.formData);
function ConfigComponent() {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const loadConfig = async () => {
      const { default: config } = await import('../../../../config/2025/cycleConfig.json');
      setText(String(config));
    };

    loadConfig();
  }, []);

  return <h1>{text}</h1>;
}
  return (
    <Section>
      <div className="flex flex-col justify-center items-center gap-4">
        <Button
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
        </Button>
        <Sheet open={showEditor} onOpenChange={setShowEditor}>
          <SheetTrigger asChild>
            <Button variant="secondary">
              <Edit2 className="h-5 w-5" />
              Edit Config
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="w-full h-full">
            <SheetHeader>
              <SheetTitle>Edit Config</SheetTitle>
            </SheetHeader>
            <ConfigEditor
              onCancel={() => setShowEditor(false)}
              onSave={configString => {
                setConfig(configString);
                setShowEditor(false);
              }}
            />
          </SheetContent>
        </Sheet>
        <Button
          variant="destructive"
          onClick={() =>
            ConfigComponent()
            
          }
        >
          Cycle
        </Button>
        <ThemeSelector />
      </div>
    </Section>
  );
}
