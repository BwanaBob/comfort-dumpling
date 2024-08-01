import { Devvit } from "@devvit/public-api";
import { sendWebhook } from './sendWebhook.js';

Devvit.addTrigger({
  event: "PostSubmit",
  onEvent: async (event) => {
    console.log(`Received post trigger event:\n${JSON.stringify(event)}`);
    await sendWebhook(event, "post");
  },
});
