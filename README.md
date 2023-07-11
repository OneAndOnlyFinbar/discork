# discork

A work in progress library for interacting with the discord API.

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