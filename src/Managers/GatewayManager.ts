import axios from 'axios';
import { WebSocket } from 'ws';
import { Base, Client, ClientUser, Guild, GuildMemberPermissionsManager } from '../Classes';
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
                client: this.client,
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
            case 'GUILD_CREATE': {
              const cacheExists = this.client.guilds.cache.has(d.id);

              if (cacheExists) {
                if (d.unavailable)
                  this.client.guilds.cache.set(d.id, {
                    id: d.id,
                    available: false
                  });
                else
                  this.client.guilds.cache._update(d.id, {
                    id: d.id,
                    available: !d.unavailable,
                    name: d.name,
                    icon: d.icon,
                    iconHash: d.icon_hash,
                    splash: d.splash,
                    discoverySplash: d.discovery_splash,
                    owner: this.client.user.id === d.owner_id,
                    ownerId: d.owner_id,
                    permissions: new GuildMemberPermissionsManager({ client: this.client, permissionsBitField: d.permissions }),
                    region: d.region,
                    afkChannelId: d.afk_channel_id,
                    afkTimeout: d.afk_timeout,
                    widgetEnabled: d.widget_enabled,
                    widgetChannelId: d.widget_channel_id,
                    verificationLevel: d.verification_level,
                    defaultMessageNotifications: d.default_message_notifications,
                    explicitContentFilter: d.explicit_content_filter,
                    roles: d.roles,
                    emojis: d.emojis,
                    features: d.features,
                    mfaLevel: d.mfa_level,
                    applicationId: d.application_id,
                    systemChannelId: d.system_channel_id,
                    systemChannelFlags: d.system_channel_flags,
                    rulesChannelId: d.rules_channel_id,
                    maxPresences: d.max_presences,
                    maxMembers: d.max_members,
                    vanityUrlCode: d.vanity_url_code,
                    description: d.description,
                    banner: d.banner,
                    premiumTier: d.premium_tier,
                    premiumSubscriptionCount: d.premium_subscription_count,
                    preferredLocale: d.preferred_locale,
                    publicUpdatesChannelId: d.public_updates_channel_id,
                    maxVideoChannelUsers: d.max_video_channel_users,
                    approximateMemberCount: d.approximate_member_count,
                    approximatePresenceCount: d.approximate_presence_count,
                    welcomeScreen: {
                      description: d.welcome_screen?.description,
                      welcomeChannels: d.welcome_screen?.welcome_channels.map((c: any) => ({
                        channelId: c.channel_id,
                        description: c.description,
                        emojiId: c.emoji_id,
                        emojiName: c.emoji_name
                      }))
                    },
                    NSFWLevel: d.nsfw_level,
                    stickers: d.stickers,
                    premiumProgressBarEnabled: d.premium_progress_bar_enabled,
                    safetyAlertsChannelId: d.safety_alerts_channel_id,
                    maxStageVideoChannelUsers: d.max_stage_video_channel_users,
                    joinedAt: new Date(d.joined_at),
                    large: d.large,
                    memberCount: d.member_count,
                    voiceStates: d.voice_states,
                    members: d.members,
                    channels: d.channels,
                    threads: d.threads,
                    presences: d.presences,
                    stageInstances: d.stage_instances,
                    events: d.guild_scheduled_events
                  });
              } else {
                if (d.unavailable)
                  this.client.guilds.cache._update(d.id, {
                    available: false
                  });
                else
                  this.client.guilds.cache.set(d.id, new Guild(this.client, {
                    id: d.id,
                    available: !d.unavailable,
                    name: d.name,
                    icon: d.icon,
                    iconHash: d.icon_hash,
                    splash: d.splash,
                    discoverySplash: d.discovery_splash,
                    owner: this.client.user.id === d.owner_id,
                    ownerId: d.owner_id,
                    permissions: new GuildMemberPermissionsManager({ client: this.client, permissionsBitField: d.permissions }),
                    region: d.region,
                    afkChannelId: d.afk_channel_id,
                    afkTimeout: d.afk_timeout,
                    widgetEnabled: d.widget_enabled,
                    widgetChannelId: d.widget_channel_id,
                    verificationLevel: d.verification_level,
                    defaultMessageNotifications: d.default_message_notifications,
                    explicitContentFilter: d.explicit_content_filter,
                    roles: d.roles,
                    emojis: d.emojis,
                    features: d.features,
                    mfaLevel: d.mfa_level,
                    applicationId: d.application_id,
                    systemChannelId: d.system_channel_id,
                    systemChannelFlags: d.system_channel_flags,
                    rulesChannelId: d.rules_channel_id,
                    maxPresences: d.max_presences,
                    maxMembers: d.max_members,
                    vanityUrlCode: d.vanity_url_code,
                    description: d.description,
                    banner: d.banner,
                    premiumTier: d.premium_tier,
                    premiumSubscriptionCount: d.premium_subscription_count,
                    preferredLocale: d.preferred_locale,
                    publicUpdatesChannelId: d.public_updates_channel_id,
                    maxVideoChannelUsers: d.max_video_channel_users,
                    approximateMemberCount: d.approximate_member_count,
                    approximatePresenceCount: d.approximate_presence_count,
                    welcomeScreen: d.welcome_screen,
                    NSFWLevel: d.nsfw_level,
                    stickers: d.stickers,
                    premiumProgressBarEnabled: d.premium_progress_bar_enabled,
                    safetyAlertsChannelId: d.safety_alerts_channel_id,
                    maxStageVideoChannelUsers: d.max_stage_video_channel_users,
                    joinedAt: new Date(d.joined_at),
                    large: d.large,
                    memberCount: d.member_count,
                    voiceStates: d.voice_states,
                    members: d.members,
                    channels: d.channels,
                    threads: d.threads,
                    presences: d.presences,
                    stageInstances: d.stage_instances,
                    events: d.guild_scheduled_events,
                  }));
              }

              this.client.emit('guildCreate', this.client.guilds.cache.get(d.id));
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