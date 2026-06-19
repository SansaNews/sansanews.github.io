import { file, write } from "bun";
import { log, LogLevel } from "./logging.ts";

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
  try {
    await main();
  } catch (error) {
    log(LogLevel.FATAL, `Execution failed: ${error}`);
    process.exit(1);
  }
}

async function main() {
  log(LogLevel.INFO, "Starting data extraction");
  const USERS_PATH = "src/lib/assets/users.json";
  const MEDIA_PATH = "src/lib/assets/media.json";

  const config = new APIConfig();

  const usersFile = file(USERS_PATH);
  const usersData = await usersFile.json();

  const users: User[] = [];
  for (const [category, usernames] of Object.entries(usersData)) {
    for (const username of usernames as string[]) {
      users.push({ username, category });
    }
  }
  log(LogLevel.DEBUG, `Loaded ${users.length} users from ${USERS_PATH}`);

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
  log(LogLevel.INFO, `Posts saved on ${MEDIA_PATH}`);
}

export async function getUserData(username: string, config: APIConfig): Promise<any> {
  log(LogLevel.DEBUG, `Fetching data for user: ${username}`);
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
      log(LogLevel.ERROR, `HTTP ${response.status} for ${username}: ${errorText}`);

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

    log(LogLevel.ERROR, `Could not connect to Instagram API for ${username}: ${error}`);
    return {};
  }
}

export async function sanitizeData(username: string, data: any, category: string = "") {
  if (!data?.business_discovery?.media) {
    log(LogLevel.DEBUG, `No media found for user: ${username}`);
    return [];
  }

  optimizeImage(data.business_discovery.profile_picture_url, username, "./static/pfp", 48);

  const promises = data.business_discovery.media.data.map(async (m: any) => {
    const media = { ...m };
    media.id = `${username}-${media.permalink.split("/")[4]}`;
    media.username = username;
    media.category = category;
    media.dimensions = await optimizeImage(
      media.media_type === "VIDEO" ? media.thumbnail_url : media.media_url,
      media.id,
      "./static/posts",
      376,
    );

    if (media.media_type === "VIDEO") {
      media.video_url = media.media_url;
    }

    delete media.media_url;
    delete media.thumbnail_url;
    delete media.children;
    return media;
  });

  return await Promise.all(promises);
}

const ALLOWED_IMAGE_HOSTS = ["*.cdninstagram.com", "*.fbcdn.net"];

function isAllowedImageHost(urlString: string): boolean {
  try {
    const parsed = new URL(urlString);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;

    const hostname = parsed.hostname.toLowerCase();
    return ALLOWED_IMAGE_HOSTS.some((allowed) => {
      if (allowed.startsWith("*.")) {
        return hostname.endsWith(allowed.slice(1));
      }
      return hostname === allowed;
    });
  } catch {
    return false;
  }
}

export async function optimizeImage(
  url: string,
  file_name: string,
  folder_path: string,
  base_width: number,
): Promise<{ width: number; height: number }> {
  let dimensions = { width: 0, height: 0 };

  if (!isAllowedImageHost(url)) {
    log(LogLevel.ERROR, `Blocked fetch from disallowed host: ${url}`);
    return dimensions;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const blob = await response.blob();
    const img = blob.image().webp({ quality: 80 });
    for (let i = 1; i <= 3; i++) {
      img.resize(base_width * i).write(`${folder_path}/${file_name}-${i}x.webp`);
    }

    dimensions = await img.metadata().then((meta) => ({ width: meta.width, height: meta.height }));
    log(LogLevel.DEBUG, `Image optimized: ${file_name}`);
  } catch (error) {
    log(LogLevel.ERROR, `Couldn't fetch image from ${url}: ${error}`);
  }

  return dimensions;
}

export function assert(condition: any, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
