import { Base } from './Base';
import { Client } from './Client';
import { Locale } from '../Types';

export class Guild extends Base {
  id: string;
  name: string;
  icon: string;
  iconHash: string;
  splash: string;
  discovery_splash: string;
  owner: boolean;
  ownerId: string;
  permissions: string;
  region: string = 'deprecated';
  afkChannelId: string;
  afkTimeout: number;
  widgetEnabled: boolean;
  widgetChannelId: string;
  verificationLevel: number;
  defaultMessageNotifications: number;
  explicitContentFilter: number;
  // TODO: RolesManager
  roles: any[];
  // TODO: EmojisManager
  emojis: any[];
  // TODO: Guild features type https://discord.com/developers/docs/resources/guild#guild-object-guild-features
  features: string[];
  // TODO MFA enum https://discord.com/developers/docs/resources/guild#guild-object-mfa-level
  mfaLevel: number;
  applicationId: string;
  systemChannelId: string;
  maxPresences: number;
  maxMembers: number;
  vanityUrlCode: string;
  description: string;
  banner: string;
  // TODO: guild premium tiers https://discord.com/developers/docs/resources/guild#guild-object-premium-tier
  premiumTier: number;
  premiumSubscriptionCont: number;
  preferredLocale: Locale;
  publicUpdatesChannelId: string;
  maxVideoChannelUsers: number;
  maxStageVideoChannelUsers: number;
  approximateMemberCount: number;
  approximatePresenceCount: number;
  // TODO: https://discord.com/developers/docs/resources/guild#welcome-screen-object
  welcomeScreen: any;
  // TODO: https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level
  NSFWLevel: number;
  // TODO: StickersManager https://discord.com/developers/docs/resources/sticker#sticker-object
  stickers: any[];
  premiumProgressBarEnabled: boolean;
  safetyAlertsChannelId: string;
  constructor({ client }: { client: Client }) {
    super(client);
  }
}