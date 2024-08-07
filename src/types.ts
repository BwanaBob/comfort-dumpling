// Exporting interfaces for Discord Webhook messages and components

export interface DiscordWebhookMessage {
    username: string;
    avatar_url: string;
    content?: string;
    embeds?: Embed[];
  }
  
  export interface Embed {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: Date;
    color?: number;
    footer?: Footer;
    image?: Image;
    thumbnail?: Thumbnail;
    video?: Video;
    provider?: Provider;
    author?: Author;
    fields?: Field[];
  }
  
  export interface Footer {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
  }
  
  export interface Image {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  }
  
  export interface Thumbnail {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  }
  
  export interface Video {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  }
  
  export interface Provider {
    name?: string;
    url?: string;
  }
  
  export interface Author {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
  }
  
  export interface Field {
    name: string;
    value: string;
    inline?: boolean;
  }
  