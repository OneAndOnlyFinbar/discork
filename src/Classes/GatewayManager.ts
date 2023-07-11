import axios from 'axios';
import { WebSocket } from 'ws';
import { Base } from './Base';
import { Client } from './Client';
import { ClientUser } from './ClientUser';
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

      if (this.client.logRaw) console.log(parsed);

      this.lastSequence = s;

      switch (op) {
        // Dispatch
        case 0: {
          switch (t) {
            case 'READY': {
              this.client.status = ClientStatus.CONNECTED;
              this.sessionID = d.session_id;
              this.resumeURI = d.resume_gateway_url;
              this.client.user = new ClientUser({
                verified: d.user.verified,
                username: d.user.username,
                mfa_enabled: d.user.mfa_enabled,
                id: d.user.id,
                global_name: d.user.global_name,
                flags: d.user.flags,
                email: d.user.email,
                discriminator: d.user.discriminator,
                bot: d.user.bot,
                avatar: d.user.avatar
              });
              this.client.emit('ready', this.client);
              break;
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