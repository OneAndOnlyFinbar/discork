import axios from 'axios';
import { Base, Client } from '../Classes';

export class REST extends Base {
  token: string;
  constructor(client: Client) {
    super(client);
    this.token = client.token;
  }

  async get(url: string) {
    return await axios.get(url, {
      headers: {
        Authorization: `Bot ${this.token}`
      }
    }).then(res => res.data);
  }
}