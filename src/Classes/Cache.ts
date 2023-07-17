import { Base } from './Base';

export class Cache<T> extends Base {
  cache: { [key: string]: Partial<T> };

  constructor(client) {
    super(client);
    this.cache = {};
  }

  get(key: string): Partial<T> {
    return this.cache[key];
  }

  set(key: string, value: Partial<T>): void {
    this.cache[key] = value;
  }

  has(key: string): boolean {
    return this.cache[key] !== undefined;
  }

  _update<K extends keyof T>(key: string, data: Partial<Pick<T, K>>): void {
    const cache = this.cache[key];
    if (!cache)
      this.cache[key] = data as Partial<T>;
    else
      for (const [k, v] of Object.entries(data))
        cache[k] = v ? v : cache[k];
  }
}