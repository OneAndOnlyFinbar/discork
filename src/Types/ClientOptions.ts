import { IntentsFlags } from './IntentsFlags';

export type ClientOptions = {
  intents: Array<keyof typeof IntentsFlags> | number;
  logRaw: boolean;
}