import { Locale } from './Locale';
import { Client } from '../Classes/Client';

export interface UserConstructorOptions {
  client: Client;
  id: string;
  username?: string;
  discriminator?: string;
  global_name?: string | null;
  avatar?: string | null;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string | null;
  accent_color?: number | null;
  locale?: Locale | null;
  flags?: number;
  premium_type?: number | null;
  public_flags?: number | null;
  bio?: string | null;
  banner_color?: number | null;
  verified?: boolean;
}