import { WelcomeScreenChannel } from '../Types';

const BASE_URI = 'https://discord.com/api/v10';

export const Routes = {
  Users: {
    Me: `${BASE_URI}/users/@me`,
    ById: (id: string) => `${BASE_URI}/users/${id}`
  },
  Guilds: {
    FetchById: (id: string, withCounts: boolean) => `${BASE_URI}/guilds/${id}${withCounts ? '?with_counts=true' : ''}`,
    GetWelcomeScreen: (id: string) => `${BASE_URI}/guilds/${id}/welcome-screen`,
    SetWelcomeScreen: (id: string, enabled: boolean, description: string, channels: Array<WelcomeScreenChannel>) => {
      const params = new URLSearchParams();
      params.append('enabled', enabled.toString());
      params.append('description', description);
      params.append('channels', JSON.stringify(channels));

      return `${BASE_URI}/guilds/${id}/welcome-screen?${params.toString()}`;
    }
  }
};