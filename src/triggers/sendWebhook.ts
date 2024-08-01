import { DiscordWebhookMessage } from "../types.js";

export async function sendWebhook(
  item: any,
  type: "comment" | "post" | "modAction"
): Promise<void> {
  const webhookURL =
    "https://discord.com/api/webhooks/1267696789880967218/7RZEyR0a1fc2wTcvg6KGRrlcWjU7o3FMKhWFDgxK5ULua2jZehbMzXBPKkBG1M46IX-R?thread_id=1255054276804476929&wait=true";

  let message: DiscordWebhookMessage = {
    username: "Jake",
    avatar_url: "https://i.imgur.com/T4qTkQj.jpg",
    embeds: [
      {
        title: "title",
        description: "description",
        color: 0x3498db,
        author: { name: "authorName" },
        footer: { text: "subreddit" },
      },
    ],
  };

  switch (type) {
    case "post":
      let postMessage: DiscordWebhookMessage = {
        username: "Jake",
        avatar_url: "https://i.imgur.com/T4qTkQj.jpg",
        embeds: [
          {
            description: `**${item.title || "No Title"}**\n${
              item.self_text || "No Description"
            }`,
            url: `https://reddit.com${item.permalink || ""}`,
            author: {
              icon_url:
                item.author?.iconImage ||
                item.author?.snoovatarImage ||
                "https://i.imgur.com/oLMLxTY.png",
              name: item.author?.name || "Unknown",
            },
            footer: { text: item.subreddit?.name || "Unknown" },
          },
        ],
      };

      message = postMessage;
      break;
    case "comment":
      // console.log(item);
      let commentMessage: DiscordWebhookMessage = {
        username: "Jake",
        avatar_url: "https://i.imgur.com/T4qTkQj.jpg",
        embeds: [
          {
            description: item.comment?.body || "No Description",
            color: 0x3498db,
            url: `https://reddit.com${item.comment.permalink || ""}`,
            author: {
              icon_url:
                item.author?.iconImage ||
                item.author?.snoovatarImage ||
                "https://i.imgur.com/oLMLxTY.png",
              name: item.author?.name || "Unknown",
            },
            // subreddit: item.subreddit?.name || "Unknown",
            footer: {
              text:
                `📌 ${item.post.title}` || "Unknown Post",
            },
          },
        ],
      };
      message = commentMessage;
      break;
    case "modAction":
      // console.log(item);
      let actionMessage: DiscordWebhookMessage = {
        username: "Jake",
        avatar_url: "https://i.imgur.com/T4qTkQj.jpg",
        embeds: [
          {
            description: item.action || "No Description",
            url: `https://reddit.com`,
            author: {
              icon_url:
                item.moderator?.iconImage ||
                item.moderator?.snoovatarImage ||
                "https://i.imgur.com/oLMLxTY.png",
              name: item.moderator?.name || "Unknown",
            },
            footer: {
              text:
                `${item.subreddit.name}` || "Unknown Subreddit", 
            },
          },
        ],
      };
      message = actionMessage;
      break;
  }

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
