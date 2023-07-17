import { Base } from './Base';

export class Cache<T> extends Base {
  cache: { [key: string]: Partial<T> };

  constructor(client) {
    super(client);
    this.cache = {};
  }

  /**
   * Get a value from the cache.
   */
  get(key: string): Partial<T> {
    return this.cache[key];
  }

  /**
   * Set a value in the cache.
   */
  set(key: string, value: Partial<T>): void {
    this.cache[key] = value;
  }

  /**
   * Check if a value exists in the cache.
   */
  has(key: string): boolean {
    return this.cache[key] !== undefined;
  }

  /**
   * Updates a value in the cache, this is separate from set in the sense that it only updates the specified keys as to preserve the most information possible.
   */
  _update<K extends keyof T>(key: string, data: Partial<Pick<T, K>>): void {
    const cache = this.cache[key];
    if (!cache)
      this.cache[key] = data as Partial<T>;
    else
      for (const [k, v] of Object.entries(data))
        cache[k] = v ? v : cache[k];
  }
}