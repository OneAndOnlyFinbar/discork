export enum GuildVerificationLevel {
  NONE, // None/Unrestricted
  LOW, // Must have verified email on account
  MEDIUM, // Must be registered on discord for longer than 5 minutes
  HIGH, // Must be a member of the server for longer than 10 minutes
  VERY_HIGH // Must have a verified phone number
}