import { Base } from './Base';
import { Client } from './Client';
import { GuildMemberPermissionsManager } from './GuildMemberPermissionsManager';
import {
  GuildExplicitContentFilterLevel,
  GuildFeature,
  GuildMessageNotificationLevel,
  GuildMFALevel,
  GuildNSFWLevel,
  GuildPremiumTier,
  GuildSystemChannelFlags,
  GuildVerificationLevel,
  Locale
} from '../Types';

export class Guild extends Base {
  id: string;
  name: string;
  icon: string;
  iconHash: string;
  splash: string;
  discovery_splash: string;
  owner: boolean;
  ownerId: string;
  permissions: GuildMemberPermissionsManager;
  region: string = 'deprecated';
  afkChannelId: string;
  afkTimeout: number;
  widgetEnabled: boolean;
  widgetChannelId: string;
  verificationLevel: GuildVerificationLevel;
  defaultMessageNotifications: GuildMessageNotificationLevel;
  explicitContentFilter: GuildExplicitContentFilterLevel;
  // TODO: RolesManager
  roles: any[];
  // TODO: EmojisManager
  emojis: any[];
  features: Array<GuildFeature>;
  mfaLevel: GuildMFALevel;
  applicationId: string;
  systemChannelId: string;
  systemChannelFlags: GuildSystemChannelFlags;
  maxPresences: number;
  maxMembers: number;
  vanityUrlCode: string;
  description: string;
  banner: string;
  premiumTier: GuildPremiumTier;
  premiumSubscriptionCont: number;
  preferredLocale: Locale;
  publicUpdatesChannelId: string;
  maxVideoChannelUsers: number;
  maxStageVideoChannelUsers: number;
  approximateMemberCount: number;
  approximatePresenceCount: number;
  // TODO: https://discord.com/developers/docs/resources/guild#welcome-screen-object
  welcomeScreen: any;
  NSFWLevel: GuildNSFWLevel;
  // TODO: StickersManager https://discord.com/developers/docs/resources/sticker#sticker-object
  stickers: any[];
  premiumProgressBarEnabled: boolean;
  safetyAlertsChannelId: string;

  constructor({ client }: { client: Client }) {
    super(client);
  }
}