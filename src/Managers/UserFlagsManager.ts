import { UserFlags } from '../Types/';

export class UserFlagsManager {
  bitfield: number;

  constructor(flags: number) {
    this.bitfield = flags || 0;
  }

  has(flag: keyof typeof UserFlags) {
    return (this.bitfield & UserFlags[flag]) === UserFlags[flag];
  }
}