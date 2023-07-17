export enum GuildExplicitContentFilterLevel {
  DISABLED, // Media will not be scanned
  MEMBERS_WITHOUT_ROLES, // Media sent by members without roles will be scanned
  ALL_MEMBERS // Media sent by all members will be scanned
}