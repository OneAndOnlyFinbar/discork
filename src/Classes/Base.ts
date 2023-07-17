import { Client } from './Client';

export class Base {
  /**
   * The client that instantiated this class.
   */
  client: Client;

  constructor(client: Client){
    this.client = client;
  }
}