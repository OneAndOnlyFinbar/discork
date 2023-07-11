# discork

A work in progress library for interacting with the discord API.

```js
import { Client } from 'discork';

const client = new Client({
  intents: ["GUILDS"]
});

client.login('TOKEN');
```

Coverage:

- [x] Gateway
- [ ] Everything else