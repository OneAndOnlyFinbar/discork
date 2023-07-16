import { Base, Cache, Guild } from '../Classes';
import { Routes } from '../API';

export class GuildManager extends Base {
  cache: Cache<Guild>;

  constructor(client) {
    super(client);
    this.cache = new Cache(client);
  }

  async fetch(id: string, options?: { withCounts: boolean, skipCacheCheck: boolean }): Promise<Partial<Guild>> {
    const cacheExists = this.cache.has(id);

    if (cacheExists && options?.skipCacheCheck)
      return this.cache.get(id);

    const data = await this.client.REST.get(Routes.Guilds.FetchById(id, options?.withCounts ?? false));

    this.cache._update(id, {
      id: data.id,
      name: data.name,
      icon: data.icon,
      description: data.description,
      splash: data.splash,
      discoverySplash: data.discovery_splash,
      features: data.features,
      banner: data.banner,
      ownerId: data.owner_id,
      owner: this.client.user.id === data.owner_id,
      applicationId: data.application_id,
      region: data.region,
      afkChannelId: data.afk_channel_id,
      afkTimeout: data.afk_timeout,
      systemChannelId: data.system_channel_id,
      systemChannelFlags: data.system_channel_flags,
      widgetEnabled: data.widget_enabled,
      widgetChannelId: data.widget_channel_id,
      verificationLevel: data.verification_level,
      roles: data.roles,
      defaultMessageNotifications: data.default_message_notifications,
      mfaLevel: data.mfa_level,
      explicitContentFilter: data.explicit_content_filter,
      maxPresences: data.max_presences,
      maxMembers: data.max_members,
      maxStageVideoChannelUsers: data.max_stage_video_channel_users,
      maxVideoChannelUsers: data.max_video_channel_users,
      vanityUrlCode: data.vanity_url_code,
      premiumTier: data.premium_tier,
      premiumSubscriptionCount: data.premium_subscription_count,
      preferredLocale: data.preferred_locale,
      rulesChannelId: data.rules_channel_id,
      safetyAlertsChannelId: data.safety_alerts_channel_id,
      publicUpdatesChannelId: data.public_updates_channel_id,
      premiumProgressBarEnabled: data.premium_progress_bar_enabled,
      NSFWLevel: data.nsfw_level,
      emojis: data.emojis,
      stickers: data.stickers,
      approximateMemberCount: data.approximate_member_count,
      approximatePresenceCount: data.approximate_presence_count,
    });

    return this.cache.get(id);
  }
}