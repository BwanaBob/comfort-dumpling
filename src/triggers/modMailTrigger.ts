import { Devvit } from "@devvit/public-api";
import { sendWebhook } from './sendWebhook.js'; // Import the sendWebhook function if needed

Devvit.addTrigger({
  event: "ModMail",
  onEvent: async (event, context) => {
    console.log(`Received modmail trigger event:\n${JSON.stringify(event)}`);

    const conversationId = event.conversationId;
    const result = await context.reddit.modMail.getConversation({
      conversationId,
      markRead: false,
    });

    if (result.conversation) {
      console.log(`Received conversation with subject: ${result.conversation.subject}`);
      const messageId = event.messageId.split("_")[1];
      const message = result.conversation.messages[messageId];
      console.log(`Received modmail message: ${JSON.stringify(message)}`);
    }
  },
});
