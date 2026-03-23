import { useEvent } from '@/hooks';
import { inputSelector, updateValue, useQRScoutState } from '@/store/store';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { NumberInputData } from './BaseInputProps';
import { ConfigurableInputProps } from './ConfigurableInput';

export default function NumberInput(props: ConfigurableInputProps) {
  const data = useQRScoutState(
    inputSelector<NumberInputData>(props.section, props.code),
  );

  if (!data) {
    return <div>Invalid input</div>;
  }

  const [value, setValue] = React.useState<number | ''>(data.defaultValue);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter autofill options based on current input
  const suggestions =
    Array.isArray(data.autofill) && value !== ''
      ? data.autofill.filter((opt: number) =>
          `${opt}`.startsWith(`${value}`)
        )
      : [];

  const resetState = useCallback(
    ({ force }: { force: boolean }) => {
      if (force) {
        setValue(data.defaultValue);
        return;
      }
      switch (data.formResetBehavior) {
        case 'reset':
          setValue(data.defaultValue);
          return;
        case 'increment':
          setValue(prev => (typeof prev === 'number' ? prev + 1 : 1));
          return;
        case 'preserve':
          return;
        default:
          return;
      }
    },
    [data.defaultValue, value],
  );

  useEvent('resetFields', resetState);

  useEffect(() => {
    updateValue(props.code, value);
  }, [value]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = Number(e.currentTarget.value);
      if (e.currentTarget.value === '') {
        setValue('');
        setShowSuggestions(true);
        return;
      }
      if (isNaN(parsed)) return;
      if (data?.min && parsed < data.min) return;
      if (data?.max && parsed > data.max) return;
      setValue(parsed);
      setShowSuggestions(true);
      e.preventDefault();
    },
    [data],
  );

  const handleSuggestionClick = useCallback((suggestion: number) => {
    setValue(suggestion);
    setShowSuggestions(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') setShowSuggestions(false);
      if (e.key === 'Enter' && suggestions.length === 1) {
        setValue(suggestions[0]);
        setShowSuggestions(false);
      }
    },
    [suggestions],
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        type="number"
        value={value}
        id={data.title}
        min={data.min}
        max={data.max}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-md max-h-48 overflow-y-auto">
          {suggestions.map((suggestion: number) => (
            <li
              key={suggestion}
              onMouseDown={() => handleSuggestionClick(suggestion)}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}