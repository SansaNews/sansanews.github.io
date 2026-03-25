import { file, write } from "bun";

export type User = { username: string; category: string };

export class APIConfig {
  url: string;
  accessToken: string;
  timeoutSeconds: number;
  timestampLimit: number;
  maxPostsPerUser: number;

  constructor(timeoutSeconds: number = 15, sinceDays: number = 30, maxPostsPerUser: number = 5) {
    assert(timeoutSeconds > 0, "Timeout must be greater than 0");
    assert(sinceDays > 0, "Since days must be greater than 0");
    assert(maxPostsPerUser > 0, "Max posts per user must be greater than 0");

    const API_VERSION = "v24.0";
    const INSTAGRAM_ID = "17841455210130919";
    this.url = `https://graph.facebook.com/${API_VERSION}/${INSTAGRAM_ID}`;

    const token = process.env.ACCESS_TOKEN;
    assert(token, "ACCESS_TOKEN environment variable is required");

    this.accessToken = token;
    this.timeoutSeconds = timeoutSeconds;
    this.maxPostsPerUser = maxPostsPerUser;

    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - sinceDays);
    this.timestampLimit = Math.floor(dateLimit.getTime() / 1000);
  }
}

if (import.meta.main) {
  main().catch((error) => {
    console.error("Execution failed:", error);
    process.exit(1);
  });
}

async function main() {
  const USERS_PATH = "src/lib/assets/users.json";
  const MEDIA_PATH = "src/lib/assets/media.json";

  const config = new APIConfig();

  const usersFile = file(USERS_PATH);
  const usersData = await usersFile.json();

  const users: User[] = [];
  for (const [catergory, usernames] of Object.entries(usersData)) {
    for (const username of usernames as string[]) {
      users.push({ username, category: catergory });
    }
  }

  const promises = users.map(async (user) => {
    const userData = await getUserData(user.username, config);
    return sanitizeData(user.username, userData, user.category);
  });
  const results = await Promise.all(promises);
  let media = results.flat();

  media.sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();
    return timeB - timeA;
  });

  const outputData = {
    lastUpdate: new Date().toISOString(),
    media: media,
  };

  await write(MEDIA_PATH, JSON.stringify(outputData, null, 2));
  console.log(`Posts saved on ${MEDIA_PATH}`);
}

export async function getUserData(username: string, config: APIConfig): Promise<any> {
  const fields = `
  business_discovery.username(${username}){
    profile_picture_url,
    media.limit(${config.maxPostsPerUser}).since(${config.timestampLimit}) {
      timestamp,caption,media_type,permalink,media_url,children,thumbnail_url
    }
  }`;

  const url = new URL(config.url);
  url.searchParams.append("fields", fields);
  url.searchParams.append("access_token", config.accessToken);

  try {
    const response = await fetch(url.toString(), {
      signal: AbortSignal.timeout(config.timeoutSeconds * 1000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error HTTP ${response.status}: ${errorText}`);

      if (response.status === 403) {
        throw new Error("HTTP 403 Forbidden: Reached API rate limit or insufficient permissions.");
      }

      return {};
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.message.includes("HTTP 403")) {
      throw error;
    }

    console.error(`Could not connect to Instagram API: ${error}`);
    return {};
  }
}

export function sanitizeData(username: string, data: any, category: string = "") {
  if (!data?.business_discovery?.media) {
    return [];
  }

  const profilePictureUrl = data.business_discovery.profile_picture_url;
  return data.business_discovery.media.data.map((m: any) => {
    const media = { ...m };
    delete media.id;
    media.username = username;
    media.category = category;
    media.profile_picture_url = profilePictureUrl;
    media.children = "children" in media;
    return media;
  });
}

export function assert(condition: any, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
