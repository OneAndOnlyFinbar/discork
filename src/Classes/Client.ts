import { EventEmitter } from 'events';
import { GatewayManager, IntentsManager } from './';
import { ClientOptions } from '../Types';

export class Client {
  gateway: GatewayManager = new GatewayManager(this);
  intents: IntentsManager;
  token: string;

  constructor(options: ClientOptions) {
    this.intents = new IntentsManager(options.intents);
  }

  async login(token: string) {
    this.token = token;
    await this.gateway.login();
  }
}