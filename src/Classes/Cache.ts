export class Cache<T> {
  cache: { [key: string]: T };

  constructor() {
    this.cache = {};
  }

  get(key: string): T {
    return this.cache[key];
  }

  set(key: string, value: T): void {
    this.cache[key] = value;
  }
}