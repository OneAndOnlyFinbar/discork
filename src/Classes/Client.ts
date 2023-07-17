import { EventEmitter } from 'events';
import { GatewayManager, IntentsManager, GuildManager } from '../Managers';
import { ClientOptions, ClientStatus } from '../Types';
import { REST } from '../API';
import { ClientUser } from './ClientUser';

type EventTypes = 'ready' | 'guildCreate';

export class Client extends EventEmitter {
  /**
   * The gateway manager for this client.
   */
  gateway: GatewayManager = new GatewayManager(this);
  /**
   * The REST API manager for this client.
   */
  REST: REST = new REST(this);
  /**
   * The current status of the client.
   */
  status: ClientStatus = ClientStatus.DISCONNECTED;
  /**
   * The intents manager for this client.
   */
  intents: IntentsManager;
  /**
   * The client user for this client.
   */
  user: ClientUser;
  /**
   * The guild manager for this client.
   */
  guilds: GuildManager = new GuildManager(this);
  /**
   * The token for this client.
   */
  token: string;
  /**
   * Whether to log raw packets from the gateway.
   */
  logRaw: boolean = false;

  constructor(options: ClientOptions) {
    super();
    this.intents = new IntentsManager(options.intents);
    this.logRaw = options.logRaw ?? false;
  }

  /**
   * Register an event listener.
   */
  on(event: EventTypes, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }

  /**
   * Login to the Discord API with a token.
   */
  async login(token: string) {
    this.token = token;
    this.status = ClientStatus.CONNECTING;
    await this.gateway.login();
  }
}