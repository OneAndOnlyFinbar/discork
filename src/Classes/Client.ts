import { EventEmitter } from 'events';
import { GatewayManager, IntentsManager, GuildManager } from '../Managers';
import { ClientOptions, ClientStatus } from '../Types';
import { REST } from '../API';
import { ClientUser } from './ClientUser';

type EventTypes = 'ready' | 'guildCreate';

export class Client extends EventEmitter {
  gateway: GatewayManager = new GatewayManager(this);
  REST: REST = new REST(this);
  status: ClientStatus = ClientStatus.DISCONNECTED;
  intents: IntentsManager;
  user: ClientUser;
  guilds: GuildManager = new GuildManager(this);
  token: string;

  logRaw: boolean = false;

  constructor(options: ClientOptions) {
    super();
    this.intents = new IntentsManager(options.intents);
    this.logRaw = options.logRaw ?? false;
  }

  on(event: EventTypes, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }

  async login(token: string) {
    this.token = token;
    this.status = ClientStatus.CONNECTING;
    await this.gateway.login();
  }
}