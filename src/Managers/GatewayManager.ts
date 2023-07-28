import axios from 'axios';
import { WebSocket } from 'ws';
import { Base, Client } from '../Classes';
import { Ready, GuildCreate } from '../GatewayEvents';
import { ClientStatus } from '../Types';
import { Errors } from '../Utils';

export class GatewayManager extends Base {
  ws: WebSocket;
  gatewayURI: string;
  resumeURI: string;
  sessionID: string;
  lastSequence: number;

  constructor(client: Client) {
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

      if (this.client.logReceivedWebsocketEvents) console.log(parsed);

      this.lastSequence = s;

      switch (op) {
        // Dispatch
        case 0: {
          switch (t) {
            case 'READY': {
              Ready(this.client, d);
              break;
            }
            case 'GUILD_CREATE': {
              GuildCreate(this.client, d);
            }
          }
          break;
        }

        // Heartbeat
        case 1: {
          this.ws.send(JSON.stringify({
            op: 1,
            d: this.lastSequence
          }));
          break;
        }

        // Requested Reconnect (Resume)
        case 7: {
          this.resume();
          break;
        }

        // Invalid Session
        case 9: {
          if (d) {
            this.resume();
          } else
            throw new Error(Errors.GATEWAY.INVALID_SESSION);
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
      }
    });
  }

  sendHeartbeat() {
    this.ws.send(JSON.stringify({
      op: 1,
      d: this.lastSequence
    }));
  }

  authenticate() {
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

  resume() {
    this.ws.send(JSON.stringify({
      op: 6,
      d: {
        token: this.client.token,
        session_id: this.sessionID,
        seq: this.lastSequence
      }
    }));
  }
}