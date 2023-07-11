import axios from 'axios';
import { WebSocket } from 'ws';
import { Base } from './Base';
import { Client } from './Client';

export class GatewayManager extends Base {
  ws: WebSocket;
  gatewayURI: string;
  lastSequence: number;

  constructor(client: Client){
    super(client);
  }

  async login() {
    const { data } = await axios.get<{ url: string }>('https://discord.com/api/v10/gateway');
    this.gatewayURI = data.url;

    this.ws = new WebSocket(`${this.gatewayURI}?v=10&encoding=json`);

    this.ws.on('open', () => {
      console.log('Connected to gateway');
    });

    this.ws.on('message', async (data) => {
      const parsed = JSON.parse(data.toString());
      const { op, d, t, s } = parsed;

      console.log(parsed);

      this.lastSequence = s;

      switch (op) {
        // Heartbeat
        case 1: {
          this.ws.send(JSON.stringify({
            op: 1,
            d: this.lastSequence
          }));
          break;
        }

        // Hello
        case 10: {
          const { heartbeat_interval } = d;

          setInterval(() => {
            this.sendHeartbeat();
          }, heartbeat_interval);

          await this.authenticate();
          break;
        }

        case 9: {

        }
      }
    });
  }

  sendHeartbeat(){
    this.ws.send(JSON.stringify({
      op: 1,
      d: this.lastSequence
    }));
  }

  authenticate(){
    this.ws.send(JSON.stringify({
      op: 2,
      d: {
        token: this.client.token,
        intents: this.client.intents.value,
        properties: {
          os: process.platform,
          browser: 'discork',
          device: 'discork'
        }
      }
    }));
  }
}