import { EventEmitter } from 'events';
import { GatewayManager, IntentsManager } from './';
import { ClientOptions, ClientStatus } from '../Types';

type EventTypes = 'ready';

export class Client extends EventEmitter {
  status: ClientStatus = ClientStatus.DISCONNECTED;
  gateway: GatewayManager = new GatewayManager(this);
  intents: IntentsManager;
  token: string;

  constructor(options: ClientOptions) {
    super();
    this.intents = new IntentsManager(options.intents);
  }

  async login(token: string) {
    this.token = token;
    this.status = ClientStatus.CONNECTING;
    await this.gateway.login();
  }

  on(event: EventTypes, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }
}