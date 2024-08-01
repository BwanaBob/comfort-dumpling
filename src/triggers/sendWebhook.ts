import { DiscordWebhookMessage } from '../types.js';

export async function sendWebhook(item: any, type: "comment" | "post"): Promise<void> {
  const webhookURL = "https://discord.com/api/webhooks/1267696789880967218/7RZEyR0a1fc2wTcvg6KGRrlcWjU7o3FMKhWFDgxK5ULua2jZehbMzXBPKkBG1M46IX-R?thread_id=1255054276804476929&wait=true";

  const title = item.title || item.link_title || "No Title";
  const description = item.comment?.body || item.selftext || "No Content";
  const permalink = item.permalink || item.comment?.permalink;
  const url = `https://reddit.com${permalink}`;
  const authorIcon = item.author?.iconImage || item.author?.snoovatarImage || "https://i.imgur.com/oLMLxTY.png";
  const authorName = item.author?.name || "Unknown";
  const subreddit = item.subreddit_name_prefixed || item.subreddit?.name || "Unknown";

  const message: DiscordWebhookMessage = {
    username: "Jake",
    avatar_url: "https://i.imgur.com/L5Mw6fU.png",
    embeds: [
      {
        title: title,
        description: description,
        url: url,
        color: 15258703,
        author: { name: authorName, icon_url: authorIcon },
        footer: { text: subreddit },
      },
    ],
  };

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error("Error sending to Discord:", response.statusText);
      const errorDetails = await response.json();
      console.error("Response Details:", errorDetails);
    }
  } catch (error) {
    console.error("Error sending to Discord:", error);
  }
}
