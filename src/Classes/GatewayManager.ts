import axios from 'axios';
import { WebSocket } from 'ws';
import { Base } from './Base';
import { Client } from './Client';
import { ClientStatus } from '../Types';

export class GatewayManager extends Base {
  ws: WebSocket;
  gatewayURI: string;
  resumeURI: string;
  lastSequence: number;

  constructor(client: Client){
    super(client);
  }

  async login() {
    const { data } = await axios.get<{ url: string }>('https://discord.com/api/v10/gateway');
    this.gatewayURI = data.url;

    this.ws = new WebSocket(`${this.gatewayURI}?v=10&encoding=json`);

    this.ws.on('open', () => {
      this.client.status = ClientStatus.IDLE;
    });

    this.ws.on('message', async (data) => {
      const parsed = JSON.parse(data.toString());
      const { op, d, t, s } = parsed;

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

        // Dispatch
        case 0: {
          switch (t) {
            case 'READY': {
              this.client.status = ClientStatus.CONNECTED;
              this.client.emit('ready', d);
            }
          }
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