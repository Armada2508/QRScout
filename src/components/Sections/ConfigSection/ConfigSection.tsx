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
import { useState } from 'react';
import { Section } from '../../core/Section';
import { ThemeSelector } from './ThemeSelector';

const cycleConfig = {
  "title": "QRScout Match",
  "page_title": "Reefscape",
  "delimiter": "\t",
  "teamNumber": 2713,
  "theme": {
    "light": {
      "background": "0 0% 3.9%",
      "foreground": "0 0% 98%",
      "card": "0 0% 3.9%",
      "card_foreground": "0 0% 98%",
      "popover": "0 0% 3.9%",
      "popover_foreground": "0 0% 98%",
      "primary": "354.44 71.3% 47.9%",
      "primary_foreground": "0 85.7% 97.3%",
      "secondary": "0 0% 14.9%",
      "secondary_foreground": "0 0% 98%",
      "muted": "0 0% 14.9%",
      "muted_foreground": "0 0% 63.9%",
      "accent": "0 0% 14.9%",
      "accent_foreground": "0 0% 98%",
      "destructive": "0 62.8% 30.6%",
      "destructive_foreground": "0 0% 98%",
      "border": "0 0% 14.9%",
      "input": "0 0% 14.9%",
      "ring": "354.44 71.3% 47.9%",
      "chart_1": "220 70% 50%",
      "chart_2": "160 60% 45%",
      "chart_3": "30 80% 55%",
      "chart_4": "280 65% 60%",
      "chart_5": "340 75% 55%"
    },
    "dark": {
      "background": "0 0% 3.9%",
      "foreground": "0 0% 98%",
      "card": "0 0% 3.9%",
      "card_foreground": "0 0% 98%",
      "popover": "0 0% 3.9%",
      "popover_foreground": "0 0% 98%",
      "primary": "354.44 71.3% 47.9%",
      "primary_foreground": "0 85.7% 97.3%",
      "secondary": "0 0% 14.9%",
      "secondary_foreground": "0 0% 98%",
      "muted": "0 0% 14.9%",
      "muted_foreground": "0 0% 63.9%",
      "accent": "0 0% 14.9%",
      "accent_foreground": "0 0% 98%",
      "destructive": "0 62.8% 30.6%",
      "destructive_foreground": "0 0% 98%",
      "border": "0 0% 14.9%",
      "input": "0 0% 14.9%",
      "ring": "354.44 71.3% 47.9%",
      "chart_1": "220 70% 50%",
      "chart_2": "160 60% 45%",
      "chart_3": "30 80% 55%",
      "chart_4": "280 65% 60%",
      "chart_5": "340 75% 55%"
    }
  },
  "sections": [
    {
      "name": "Prematch",
      "fields": [
        {
          "title": "Scouter Initials",
          "description": "Enter the initials of the scouter.",
          "type": "text",
          "required": true,
          "code": "scouter",
          "defaultValue": "",
          "formResetBehavior": "preserve"
        },
        {
          "title": "Match Number",
          "description": "Enter the match number.",
          "type": "number",
          "required": true,
          "code": "match",
          "defaultValue": 1,
          "formResetBehavior": "increment"
        },
        {
          "title": "Robot",
          "description": "The robot you are scouting this match, based on driver station position.",
          "type": "select",
          "required": true,
          "code": "robot",
          "defaultValue": "R1",
          "choices": {
            "R1": "Red 1",
            "R2": "Red 2",
            "R3": "Red 3",
            "B1": "Blue 1",
            "B2": "Blue 2",
            "B3": "Blue 3"
          },
          "formResetBehavior": "preserve"
        },
        {
          "title": "Team Number",
          "description": "The team number of the robot you're scouting.",
          "type": "number",
          "required": true,
          "code": "team",
          "defaultValue": 0,
          "min": 0,
          "max": 19999
        }
      ]
    },
    {
      "name": "Teleop",
      "fields": [
        {
          "title": "Coral Cycle Time Timer",
          "description": "The time it took for the robot to finish collection cycle.",
          "type": "timer",
          "required": false,
          "code": "timer",
          "defaultValue": 0
        },
        {
          "title": "Algae Cycle Time Timer",
          "description": "The time it took for the robot to finish collection cycle.",
          "type": "timer",
          "required": false,
          "code": "timer",
          "defaultValue": 0
        }
      ]
    },
    {
      "name": "Endgame",
      "fields": [
        {
          "title": "Climb Timer",
          "description": "How long the robot takes to climb thier cage.",
          "type": "timer",
          "required": false,
          "defaultValue": 0,
          "code": "ct"
        },
        {
          "title": "Attempted Climb?",
          "description": "Did they attempt a climb",
          "type": "boolean",
          "required": false,
          "defaultValue": false,
          "code": "ac"
        },
        {
          "title": "Failed Climb?",
          "description": "Did they fail the climb",
          "type": "boolean",
          "required": false,
          "defaultValue": false,
          "code": "fc"
        }
      ]
    },
    {
      "name": "Postmatch",
      "fields": [
        {
          "title": "Comments",
          "type": "text",
          "required": false,
          "code": "co",
          "defaultValue": "",
          "min": 0,
          "max": 50
        }
      ]
    }
  ]
}


export function ConfigSection() {
  const [showEditor, setShowEditor] = useState(false);
  // Could I potentially change the formData variable for this?
  const formData = useQRScoutState(state => state.formData);

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
          variant={"secondary"}
          
          onClick={() =>
            setConfig(String(cycleConfig))
          }
            
        >



        </Button>
        <ThemeSelector />
      </div>
    </Section>
  );
}
