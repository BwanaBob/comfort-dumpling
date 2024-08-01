import { Devvit } from "@devvit/public-api";
import { sendWebhook } from './sendWebhook.js';

Devvit.addTrigger({
  event: "CommentCreate",
  onEvent: async (event) => {
    await sendWebhook(event, "comment");
  },
});
