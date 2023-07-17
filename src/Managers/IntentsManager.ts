import { IntentsFlags } from '../Types';

export class IntentsManager {
  value: number = 0;

  constructor(intents?: Array<keyof typeof IntentsFlags> | number) {
    if (typeof intents === 'number')
      this.value = intents;
    else if (intents) {
      intents.forEach((intent) => {
        this.value |= typeof intent === 'number' ? intent : IntentsFlags[intent];
      });
    }
  }
}