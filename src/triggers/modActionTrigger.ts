import { Devvit } from "@devvit/public-api";
import { sendWebhook } from './sendWebhook.js';

Devvit.addTrigger({
  event: 'ModAction',
  onEvent: async (event) => {
    await sendWebhook(event, "modAction");
  },
});
