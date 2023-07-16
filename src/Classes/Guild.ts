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
  available: boolean;
  id: string;
  name: string;
  icon: string;
  iconHash: string;
  splash: string;
  discoverySplash: string;
  owner: boolean;
  ownerId: string;
  permissions: GuildMemberPermissionsManager;
  region: string;
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
  rulesChannelId: string;
  maxPresences: number;
  maxMembers: number;
  vanityUrlCode: string;
  description: string;
  banner: string;
  premiumTier: GuildPremiumTier;
  premiumSubscriptionCount: number;
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
  joinedAt: Date;
  large: boolean;
  memberCount: number;
  // TODO: VoiceStateManager
  voiceStates: any[];
  // TODO: GuildMemberManager
  members: any[];
  // TODO: GuildChannelManager
  channels: any[];
  // TODO: GuildThreadsManager
  threads: any[];
  // TODO: GuildPresencesManager
  presences: any[];
  // TODO: GuildStageInstancesManager
  stageInstances: any[];
  // TODO: GuildEventsManager
  events: any[];

  constructor(client: Client, data: Partial<Guild>) {
    super(client);

    for(const [key, value] of Object.entries(data))
      this[key] = value;
  }
}