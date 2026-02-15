import { produce } from 'immer';
import { cloneDeep } from 'lodash';
// import configJson from '../../config/2026/config.json';
// import matchConfigJson from '../../config/2025/config.json'
import matchConfigJson2026 from "../../config/2026/matchConfig.json"
import cycleConfigJson from '../../config/2025/cycleConfig.json'
import pitConfigJson2026 from '../../config/2026/pitConfig.json'
// import pitConfigJson from '../../config/2025/pitConfig.json'
import matchConfigOwo from '../../config/2025/forbiddenConfigs/matchConfigOwO.json'
import pitConfigOwO from "../../config/2025/forbiddenConfigs/pitConfigOwO.json"
import {
  Config,
  configSchema,
  InputBase,
} from '../components/inputs/BaseInputProps';
import { createStore } from './createStore';

type Result<T> = { success: true; data: T } | { success: false; error: Error };

// function getDefaultConfig(): Config {
//   const config = configSchema.safeParse(configJson);
//   if (!config.success) {
//     console.error(config.error);
//     throw new Error('Invalid config schema');
//   }
//   return config.data;
// }

export var resetNum: number = 0

export function getCycleConfig(): Config {
  const config = configSchema.safeParse(cycleConfigJson);
  if (!config.success) {
    console.error(config.error);
    throw new Error('Invalid config schema');
  }
  return config.data;
}
export function getPitConfig(): Config {
  const config = configSchema.safeParse(pitConfigJson2026);
  if (!config.success) {
    console.error(config.error);
    throw new Error('Invalid config schema');
  }
  return config.data;
}
export function getMatchConfig(): Config {
  const config = configSchema.safeParse(matchConfigJson2026);
  if (!config.success) {
    console.error(config.error);
    throw new Error('Invalid config schema');
  }
  return config.data;
}
export function getMatchOwOConfig(): Config {
  const config = configSchema.safeParse(matchConfigOwo);
  if (!config.success) {
    console.error(config.error);
    throw new Error('Invalid config schema');
  }
  return config.data;
}
export function getPitOwOConfig(): Config {
  const config = configSchema.safeParse(pitConfigOwO);
  if (!config.success) {
    console.error(config.error);
    throw new Error('Invalid config schema');
  }
  return config.data;
}
export function getConfig() {
  const configData = cloneDeep(useQRScoutState.getState().formData);
  return configData;
}

export interface QRScoutState {
  formData: Config;
  fieldValues: { code: string; value: any }[];
  showQR: boolean;
}

const initialState: QRScoutState = {
  formData: getMatchConfig(),
  fieldValues: getMatchConfig().sections.flatMap(s =>
    s.fields.map(f => ({ code: f.code, value: f.defaultValue })),
  ),
  showQR: false,
};
const cycleState: QRScoutState = {
  formData: getCycleConfig(),
  fieldValues: getCycleConfig().sections.flatMap(s =>
    s.fields.map(f => ({ code: f.code, value: f.defaultValue })),
  ),
  showQR: false,
};
const matchOwOstate: QRScoutState = {
  formData: getMatchOwOConfig(),
  fieldValues: getMatchOwOConfig().sections.flatMap(s =>
    s.fields.map(f => ({ code: f.code, value: f.defaultValue })),
  ),
  showQR: false,
};
const pitOwOState: QRScoutState = {
  formData: getPitOwOConfig(),
  fieldValues: getPitOwOConfig().sections.flatMap(s =>
    s.fields.map(f => ({ code: f.code, value: f.defaultValue })),
  ),
  showQR: false,
};
const matchState: QRScoutState = {
  formData: getMatchConfig(),
  fieldValues: getMatchConfig().sections.flatMap(s =>
    s.fields.map(f => ({ code: f.code, value: f.defaultValue })),
  ),
  showQR: false,
};
const pitState: QRScoutState = {
  formData: getPitConfig(),
  fieldValues: getPitConfig().sections.flatMap(s =>
    s.fields.map(f => ({ code: f.code, value: f.defaultValue })),
  ),
  showQR: false,
};
export const useQRScoutState = createStore<QRScoutState>(
  initialState,
  'qrScout',
  {
    version: 2,
  },
);

export function resetToDefaultConfig() {
  useQRScoutState.setState(initialState);
}
export function resetToCycleConfig() {
  useQRScoutState.setState(cycleState);
}
export function resetToMatchConfig() {
  useQRScoutState.setState(matchState);
}
export function resetToPitConfig() {
  useQRScoutState.setState(pitState);
}
export function resetToMatchConfigOwO() {
  useQRScoutState.setState(matchOwOstate)
}
export function resetToPitOwOConfig() {
  useQRScoutState.setState(pitOwOState);
}
export async function fetchConfigFromURL(url: string): Promise<Result<void>> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch config from URL: ${response.statusText}`);
    }
    const configText = await response.text();
    return setConfig(configText);
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

export function updateValue(code: string, data: any) {
  useQRScoutState.setState(
    produce((state: QRScoutState) => {
      const field = state.fieldValues.find(f => f.code === code);
      if (field) {
        field.value = data;
      }
    }),
  );
}

export function getFieldValue(code: string) {
  return useQRScoutState.getState().fieldValues.find(f => f.code === code)
    ?.value;
}

export function resetFields() {
  window.dispatchEvent(new CustomEvent('resetFields', { detail: 'reset' }));
}

export function forceResetFields() {
  window.dispatchEvent(new CustomEvent('forceResetFields', { detail: 'forceReset' }));
  resetNum = resetNum + 1
}

export function setFormData(config: Config) {
  const oldState = useQRScoutState.getState();
  forceResetFields();
  const newFieldValues = config.sections.flatMap(s =>
    s.fields.map(f => ({ code: f.code, value: f.defaultValue })),
  );
  useQRScoutState.setState({ ...oldState, fieldValues: newFieldValues, formData: config });
}

export function setConfig(configText: string): Result<void> {
  let jsonData: any;
  try {
    jsonData = JSON.parse(configText);
  } catch (e: any) {
    return { success: false, error: e.message };
  }
  const c = configSchema.safeParse(jsonData);
  if (!c.success) {
    console.error(c.error);
    return { success: false, error: c.error };
  }
  setFormData(c.data);
  return { success: true, data: undefined };
}

export function inputSelector<T extends InputBase>(
  section: string,
  code: string,
): (state: QRScoutState) => T | undefined {
  return (state: QRScoutState) => {
    const formData = state.formData;
    const field = formData.sections
      .find(s => s.name === section)
      ?.fields.find(f => f.code === code);

    if (!field) {
      return undefined;
    }
    return field as T;
  };
}
