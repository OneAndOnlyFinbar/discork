import { ClientStatus } from '../Types';
import { ClientUser } from '../Classes';

export function Ready(client, data) {
  client.status = ClientStatus.CONNECTED;
  client.gateway.sessionID = data.session_id;
  client.gateway.resumeURI = data.resume_gateway_url;
  client.user = new ClientUser({
    client,
    username: data.user.username,
    mfa_enabled: data.user.mfa_enabled,
    id: data.user.id,
    global_name: data.user.global_name,
    flags: data.user.flags,
    email: data.user.email,
    discriminator: data.user.discriminator,
    bot: data.user.bot,
    avatar: data.user.avatar
  });
  client.emit('ready', client);
}