import { Base } from './Base';

export class Cache<T> extends Base {
  cache: { [key: string]: T };

  constructor(client) {
    super(client);
    this.cache = {};
  }

  get(key: string): T {
    return this.cache[key];
  }

  set(key: string, value: T): void {
    this.cache[key] = value;
  }
}