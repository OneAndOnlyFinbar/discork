import { ClientUserConstructorOptions } from '../Types';
import { User } from './User';

export class ClientUser extends User {
  public username: string;
  public mfaEnabled: boolean;
  public id: string;
  public globalName: string | null;
  public flags: number;
  public email: null;
  public discriminator: string;
  public bot: boolean;
  public avatar: string | null;

  constructor(options: ClientUserConstructorOptions) {
    super(options);
    this.username = options.username;
    this.mfaEnabled = options.mfa_enabled;
    this.id = options.id;
    this.globalName = options.global_name;
    this.flags = options.flags;
    this.email = options.email;
    this.discriminator = options.discriminator;
    this.bot = options.bot;
    this.avatar = options.avatar;
  }

  get tag() {
    return this.discriminator === '0' ? this.username : `${this.username}#${this.discriminator}`;
  }
}