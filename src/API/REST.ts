import axios from 'axios';
import { Base } from '../Classes/Base';
import { Client } from '../Classes/Client';

export class REST extends Base {
  client: Client;

  constructor(client: Client) {
    super(client);
    this.client = client;
  }

  async get(url: string) {
    return axios.get(url, {
      headers: {
        Authorization: `Bot ${this.client.token}`
      }
    });
  }

  async patch(url: string,) {
    return axios.patch(url, null, {
      headers: {
        Authorization: `Bot ${this.client.token}`
      }
    });
  }
}