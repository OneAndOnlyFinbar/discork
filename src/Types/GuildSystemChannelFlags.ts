export enum GuildSystemChannelFlags {
  SUPPRESS_JOIN_NOTIFICATIONS = 1 << 0, // Suppress member join notifications
  SUPPRESS_PREMIUM_SUBSCRIPTIONS = 1 << 1, // Suppress server boost notifications
  SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 1 << 2, // Suppress server setup tips
  SUPPRESS_JOIN_NOTIFICATION_REPLIES = 1 << 3, //	Hide member join sticker reply buttons
  SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS = 1 << 4, // Suppress role subscription purchase and renewal notifications
  SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES = 1 << 5, // 	Hide role subscription sticker reply buttons
}