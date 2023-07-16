import axios from 'axios';
import { Base } from '../Classes/Base';
import { Client } from '../Classes';

export class REST extends Base {
  client: Client;

  constructor(client: Client) {
    super(client);
    this.client = client;
  }

  async get(url: string): Promise<any> {
    return new Promise((resolve) => {
      axios.get(url, {
        headers: {
          Authorization: `Bot ${this.client.token}`
        }
      })
        .then(res => resolve(res.data))
        .catch(err => this._handleError(err.response.status, err.response.data.code, err.response.data.message));
    })
  }

  async patch(url: string): Promise<any> {
    return new Promise((resolve) => {
      axios.patch(url, null, {
        headers: {
          Authorization: `Bot ${this.client.token}`
        }
      })
        .then(res => resolve(res.data))
        .catch(err => this._handleError(err.response.status, err.response.data.code, err.response.data.message));
    })
  }

  private _handleError(HTTPStatus: number, APIStatus: number, message: string) {
    if ([400, 401, 405].includes(HTTPStatus))
      throw new Error(`DiscordAPI Error ${APIStatus}: ${message}`);
    if ([401, 403].includes(APIStatus))
      throw new Error('DiscordAPI Error: Client unauthorized.');
    if (HTTPStatus >= 500)
      throw new Error('DiscordAPI Error: Server error.');
    // Other HTTP status codes are ignored.
  }
}