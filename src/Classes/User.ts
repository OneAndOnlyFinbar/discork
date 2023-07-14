import { Base } from './Base';
import { Locale, UserConstructorOptions } from '../Types';
import { Routes } from '../API';
import { UserFlagsManager } from '../Managers';
import { UserPremiumTypes } from '../Types';

export class User extends Base {
  id: string;
  username: string;
  discriminator: string;
  globalName: string | null;
  avatar: string | null;
  bot: boolean;
  system: boolean;
  mfaEnabled: boolean;
  banner: string | null;
  accentColor: number | null;
  locale: Locale;
  flags: UserFlagsManager;
  premiumType: UserPremiumTypes;
  publicFlags: number;
  bio: string;
  bannerColor: number | null;
  verified: boolean;

  constructor(options: UserConstructorOptions) {
    super(options.client);
    this.id = options.id;
    this.username = options.username;
    this.discriminator = options.discriminator;
    this.globalName = options.global_name;
    this.avatar = options.avatar;
    this.bot = options.bot;
    this.system = options.system;
    this.mfaEnabled = options.mfa_enabled;
    this.banner = options.banner;
    this.accentColor = options.accent_color;
    this.locale = options.locale;
    this.flags = new UserFlagsManager(options.flags);
    this.premiumType = options.premium_type;
    this.publicFlags = options.public_flags;
    this.bio = options.bio;
    this.bannerColor = options.banner_color;
    this.verified = options.verified;
  }

  async fetch() {
    let data, status;
    if (this.client.user.id === this.id)
      ({ data, status } = await this.client.REST.get(Routes.Users.Me));
    else
      ({ data, status } = await this.client.REST.get(Routes.Users.ById(this.id)));

    if(status === 200) {
      this.id = data.id;
      this.username = data.username;
      this.globalName = data.global_name;
      this.avatar = data.avatar;
      this.discriminator = data.discriminator;
      this.publicFlags = data.public_flags;
      this.flags = new UserFlagsManager(data.flags);
      this.bot = data.bot;
      this.banner = data.banner;
      this.bannerColor = data.banner_color;
      this.accentColor = data.accent_color;
      this.bio = data.bio;
      this.locale = data.locale;
      this.mfaEnabled = data.mfa_enabled;
      this.premiumType = data.premium_type;
      this.verified = data.verified;
    }

    return this;
  }
}