const BASE_URI = 'https://discord.com/api/v10'

export const Routes = {
  Users: {
    Me: `${BASE_URI}/users/@me`,
    ById: (id: string) => `${BASE_URI}/users/${id}`
  },
  Guilds: {
    FetchById: (id: string, withCounts: boolean) => `${BASE_URI}/guilds/${id}${withCounts ? '?with_counts=true' : ''}`
  }
}