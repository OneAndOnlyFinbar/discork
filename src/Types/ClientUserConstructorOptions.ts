export interface ClientUserConstructorOptions {
  verified: boolean;
  username: string;
  mfa_enabled: boolean;
  id: string;
  global_name: string | null;
  flags: number;
  email: null;
  discriminator: string;
  bot: boolean;
  avatar: string | null;
}