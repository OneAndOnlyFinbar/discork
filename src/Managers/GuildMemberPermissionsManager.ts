// TODO: Add functionality

import { Base } from '../Classes/Base';
import { Client } from '../Classes/Client';

export class GuildMemberPermissionsManager extends Base {
  bitfield: number;
  constructor({ client, permissionsBitField }: { client: Client, permissionsBitField: number }) {
    super(client);
    this.bitfield = permissionsBitField;
  }
}