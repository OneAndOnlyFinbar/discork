import { Cache, Guild } from '../Classes';

export class GuildManager {
  cache: Cache<Guild>;
  constructor(client) {
    this.cache = new Cache(client);
  }
}