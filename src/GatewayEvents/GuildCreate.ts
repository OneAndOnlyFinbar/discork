import { Guild, GuildMemberPermissionsManager } from '../Classes';

export function GuildCreate(client, data) {
  const cacheExists = client.guilds.cache.has(data.id);

  if (cacheExists) {
    if (data.unavailable)
      client.guilds.cache.set(data.id, {
        id: data.id,
        available: false
      });
    else
      client.guilds.cache._update(data.id, {
        id: data.id,
        available: !data.unavailable,
        name: data.name,
        icon: data.icon,
        iconHash: data.icon_hash,
        splash: data.splash,
        discoverySplash: data.discovery_splash,
        owner: client.user.id === data.owner_id,
        ownerId: data.owner_id,
        permissions: new GuildMemberPermissionsManager({ client: client, permissionsBitField: data.permissions }),
        region: data.region,
        afkChannelId: data.afk_channel_id,
        afkTimeout: data.afk_timeout,
        widgetEnabled: data.widget_enabled,
        widgetChannelId: data.widget_channel_id,
        verificationLevel: data.verification_level,
        defaultMessageNotifications: data.default_message_notifications,
        explicitContentFilter: data.explicit_content_filter,
        roles: data.roles,
        emojis: data.emojis,
        features: data.features,
        mfaLevel: data.mfa_level,
        applicationId: data.application_id,
        systemChannelId: data.system_channel_id,
        systemChannelFlags: data.system_channel_flags,
        rulesChannelId: data.rules_channel_id,
        maxPresences: data.max_presences,
        maxMembers: data.max_members,
        vanityUrlCode: data.vanity_url_code,
        description: data.description,
        banner: data.banner,
        premiumTier: data.premium_tier,
        premiumSubscriptionCount: data.premium_subscription_count,
        preferredLocale: data.preferred_locale,
        publicUpdatesChannelId: data.public_updates_channel_id,
        maxVideoChannelUsers: data.max_video_channel_users,
        approximateMemberCount: data.approximate_member_count,
        approximatePresenceCount: data.approximate_presence_count,
        NSFWLevel: data.nsfw_level,
        stickers: data.stickers,
        premiumProgressBarEnabled: data.premium_progress_bar_enabled,
        safetyAlertsChannelId: data.safety_alerts_channel_id,
        maxStageVideoChannelUsers: data.max_stage_video_channel_users,
        joinedAt: new Date(data.joined_at),
        large: data.large,
        memberCount: data.member_count,
        voiceStates: data.voice_states,
        members: data.members,
        channels: data.channels,
        threads: data.threads,
        presences: data.presences,
        stageInstances: data.stage_instances,
        events: data.guild_scheduled_events
      });
  } else {
    if (data.unavailable)
      client.guilds.cache._update(data.id, {
        available: false
      });
    else
      client.guilds.cache.set(data.id, new Guild(client, {
        id: data.id,
        available: !data.unavailable,
        name: data.name,
        icon: data.icon,
        iconHash: data.icon_hash,
        splash: data.splash,
        discoverySplash: data.discovery_splash,
        owner: client.user.id === data.owner_id,
        ownerId: data.owner_id,
        permissions: new GuildMemberPermissionsManager({ client: client, permissionsBitField: data.permissions }),
        region: data.region,
        afkChannelId: data.afk_channel_id,
        afkTimeout: data.afk_timeout,
        widgetEnabled: data.widget_enabled,
        widgetChannelId: data.widget_channel_id,
        verificationLevel: data.verification_level,
        defaultMessageNotifications: data.default_message_notifications,
        explicitContentFilter: data.explicit_content_filter,
        roles: data.roles,
        emojis: data.emojis,
        features: data.features,
        mfaLevel: data.mfa_level,
        applicationId: data.application_id,
        systemChannelId: data.system_channel_id,
        systemChannelFlags: data.system_channel_flags,
        rulesChannelId: data.rules_channel_id,
        maxPresences: data.max_presences,
        maxMembers: data.max_members,
        vanityUrlCode: data.vanity_url_code,
        description: data.description,
        banner: data.banner,
        premiumTier: data.premium_tier,
        premiumSubscriptionCount: data.premium_subscription_count,
        preferredLocale: data.preferred_locale,
        publicUpdatesChannelId: data.public_updates_channel_id,
        maxVideoChannelUsers: data.max_video_channel_users,
        approximateMemberCount: data.approximate_member_count,
        approximatePresenceCount: data.approximate_presence_count,
        NSFWLevel: data.nsfw_level,
        stickers: data.stickers,
        premiumProgressBarEnabled: data.premium_progress_bar_enabled,
        safetyAlertsChannelId: data.safety_alerts_channel_id,
        maxStageVideoChannelUsers: data.max_stage_video_channel_users,
        joinedAt: new Date(data.joined_at),
        large: data.large,
        memberCount: data.member_count,
        voiceStates: data.voice_states,
        members: data.members,
        channels: data.channels,
        threads: data.threads,
        presences: data.presences,
        stageInstances: data.stage_instances,
        events: data.guild_scheduled_events,
      }));
  }

  client.emit('guildCreate', client.guilds.cache.get(data.id));
}