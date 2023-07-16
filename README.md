# discork

A work in progress library for interacting with the discord API.

![logo](https://raw.githubusercontent.com/OneAndonlyFinbar/discork/master/.github/assets/logo.png)

```js
import { Client } from 'discork';

const client = new Client({
  intents: ["GUILDS"]
});

client.on('ready', (client) => {
  console.log(`Logged in as ${client.user.tag}`);
})

client.login('TOKEN');
```

Coverage:

- [x] Gateway
- [ ] Everything else