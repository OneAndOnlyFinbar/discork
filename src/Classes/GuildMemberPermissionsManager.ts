// TODO: Add functionality

import { Base } from './Base';
import { Client } from './Client';

export class GuildMemberPermissionsManager extends Base {
  bitfield: number;
  constructor({ client, permissionsBitField }: { client: Client, permissionsBitField: number }) {
    super(client);
    this.bitfield = permissionsBitField;
  }
}