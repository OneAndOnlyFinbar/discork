const BASE_URI = 'https://discord.com/api/v10'

export const Routes = {
  Users: {
    Me: `${BASE_URI}/users/@me`,
    ById: (id: string) => `${BASE_URI}/users/811751283555172433`
  }
}