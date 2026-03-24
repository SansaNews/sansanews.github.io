import { file, write } from "bun";

type User = { username: string; category: string };
type Media = Record<string, any>;

class APIConfig {
  url: string;
  accessToken: string;
  timeoutSeconds: number;

  constructor(timeoutSeconds: number = 15) {
    if (timeoutSeconds <= 0) throw new Error("Timeout must be greater than 0");

    const API_VERSION = "v24.0";
    const INSTAGRAM_ID = "17841455210130919";
    this.url = `https://graph.facebook.com/${API_VERSION}/${INSTAGRAM_ID}`;

    const token = process.env.ACCESS_TOKEN;
    if (!token) throw new Error("ACCESS_TOKEN environment variable is required");

    this.accessToken = token;
    this.timeoutSeconds = timeoutSeconds;
  }
}

main().catch((error) => {
  console.error("Execution failed:", error);
  process.exit(1);
});

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

  let media = await getAllUsersMedia(users, config);

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

async function getAllUsersMedia(users: User[], config: APIConfig): Promise<Media[]> {
  if (users.length === 0) throw new Error("Users array cannot be empty");

  const promises = users.map((user) => processSingleUser(user, config));
  const results = await Promise.all(promises);
  return results.flat();
}

async function processSingleUser(user: User, config: APIConfig): Promise<Media[]> {
  const userData = await getUserData(user.username, config);
  return sanitizeData(user.username, userData, user.category);
}

async function getUserData(
  username: string,
  config: APIConfig,
  sinceDays: number = 30,
  maxAmount: number = 100,
): Promise<any> {
  if (maxAmount <= 0) throw new Error("maxAmount must be greater than 0");

  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - sinceDays);
  const timestamp = Math.floor(dateLimit.getTime() / 1000);

  const fields = `
  business_discovery.username(${username}){
    profile_picture_url,
    media.limit(${maxAmount}).since(${timestamp}){
      timestamp,caption,media_type,permalink,media_url,children
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
      return {};
    }

    return await response.json();
  } catch (error) {
    console.error(`Could not connecto to Instagram API: ${error}`);
    return {};
  }
}

function sanitizeData(username: string, data: any, category: string = "") {
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
