import assert from "node:assert";
import { file, write } from "bun";
import { LogLevel, log } from "./logging.ts";

export type User = { username: string; category: string };

interface IGMediaItem {
	id: string;
	timestamp: string;
	caption?: string;
	media_type: string;
	permalink: string;
	media_url?: string;
	thumbnail_url?: string;
	children?: unknown;
	video_url?: string;
	username?: string;
	category?: string;
	dimensions?: { width: number; height: number };
}

interface IGBusinessDiscovery {
	profile_picture_url?: string;
	media?: { data: IGMediaItem[] };
}

export interface IGMediaResponse {
	business_discovery?: IGBusinessDiscovery;
}

export class APIConfig {
	url: string;
	accessToken: string;
	timeoutSeconds: number;
	timestampLimit: number;
	maxPostsPerUser: number;

	constructor(
		timeoutSeconds: number = 15,
		sinceDays: number = 30,
		maxPostsPerUser: number = 5,
	) {
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
		log(LogLevel.FATAL, "Execution failed", error);
		process.exit(1);
	}
}

async function main() {
	const start = performance.now();
	log(LogLevel.INFO, "Starting data extraction");
	const USERS_PATH = "src/lib/assets/users.json";
	const dryRun = process.argv.includes("--dry-run");
	const MEDIA_PATH = dryRun
		? "src/lib/assets/media.dry.json"
		: "src/lib/assets/media.json";

	if (dryRun) log(LogLevel.INFO, "Dry run: no API calls, no image downloads");
	const config = dryRun ? undefined : new APIConfig();

	const usersFile = file(USERS_PATH);
	const usersData = await usersFile.json();

	const users: User[] = [];
	for (const [category, usernames] of Object.entries(usersData)) {
		for (const username of usernames as string[]) {
			users.push({ username, category });
		}
	}
	log(LogLevel.DEBUG, `Loaded ${users.length} users from ${USERS_PATH}`);

	const promises = users.map(async (user, index) => {
		if (!config) return fakePosts(user, index);
		log(LogLevel.DEBUG, `Fetching user: ${user.username} (${user.category})`);
		const userData = await getUserData(user.username, config);
		const sanitized = await processUserMedia(
			user.username,
			userData,
			user.category,
		);
		log(
			LogLevel.DEBUG,
			`Processed user: ${user.username} (${sanitized.length} posts)`,
		);
		return sanitized;
	});
	const results = await Promise.all(promises);
	const media = results.flat();

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
	const durationMs = Math.round(performance.now() - start);
	log(LogLevel.INFO, `Posts saved on ${MEDIA_PATH}`);
	log(
		LogLevel.INFO,
		`Run summary: ${users.length} users, ${media.length} posts, ${durationMs}ms`,
	);
}

function fakePosts({ username, category }: User, userIndex: number) {
	const FAKE_SHAPES = [
		{
			dimensions: { width: 376, height: 376 },
			caption: "",
			media_type: "IMAGE",
		},
		{
			dimensions: { width: 376, height: 470 },
			caption: "Post corto.",
			media_type: "CAROUSEL_ALBUM",
		},
		{
			dimensions: { width: 376, height: 669 },
			caption:
				"Historia vertical 9:16 con un texto de largo medio para probar el salto de línea en la tarjeta.",
			media_type: "VIDEO",
			video_url: "/placeholder.mp4",
		},
		{
			dimensions: { width: 376, height: 211 },
			caption: "Formato horizontal 16:9. ".repeat(12),
			media_type: "IMAGE",
		},
		{
			dimensions: { width: 376, height: 197 },
			caption: "Banner 1.91:1\n\nCon saltos de línea.\n\n#hashtag ".repeat(8),
			media_type: "CAROUSEL_ALBUM",
		},
		{
			dimensions: { width: 376, height: 376 },
			caption: "Palabra_muy_larga_sin_espacios_".repeat(10),
			media_type: "VIDEO",
			video_url: "/placeholder.mp4",
		},
	];

	return [0, 1].map((i) => {
		const n = userIndex * 2 + i;
		return {
			id: `${username}-fake${i}`,
			timestamp: new Date(Date.now() - n * 7 * 3_600_000).toISOString(),
			permalink: `https://www.instagram.com/p/fake${i}/`,
			username,
			category,
			...FAKE_SHAPES[n % FAKE_SHAPES.length],
		};
	});
}

export async function fetchBusinessDiscovery(
	fields: string,
	config: APIConfig,
): Promise<Response> {
	const url = new URL(config.url);
	url.searchParams.append("fields", fields);
	return fetch(url.toString(), {
		headers: {
			Authorization: `Bearer ${config.accessToken}`,
		},
		signal: AbortSignal.timeout(config.timeoutSeconds * 1000),
	});
}

export async function getUserData(
	username: string,
	config: APIConfig,
): Promise<IGMediaResponse> {
	log(LogLevel.DEBUG, `Fetching data for user: ${username}`);
	const fields = `
  business_discovery.username(${username}){
    profile_picture_url,
    media.limit(${config.maxPostsPerUser}).since(${config.timestampLimit}) {
      timestamp,caption,media_type,permalink,media_url,children,thumbnail_url
    }
  }`;

	let response: Response;
	let data: IGMediaResponse = {};
	let errorText = "";
	try {
		response = await fetchBusinessDiscovery(fields, config);
		if (response.ok) data = await response.json();
		else errorText = await response.text();
	} catch (error) {
		log(
			LogLevel.ERROR,
			`Could not connect to Instagram API for ${username}: ${error}`,
		);
		return {};
	}

	if (response.ok) return data;

	log(LogLevel.ERROR, `HTTP ${response.status} for ${username}: ${errorText}`);
	if (response.status === 403) {
		throw new Error(
			"HTTP 403 Forbidden: Reached API rate limit or insufficient permissions.",
		);
	}
	return {};
}

export async function processUserMedia(
	username: string,
	data: IGMediaResponse,
	category: string = "",
) {
	if (!data?.business_discovery?.media) {
		log(LogLevel.DEBUG, `No media found for user: ${username}`);
		return [];
	}

	await optimizeImage(
		data.business_discovery.profile_picture_url,
		username,
		"./static/pfp",
		48,
	);

	const promises = data.business_discovery.media.data.map(
		async (m: IGMediaItem) => {
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

			if (media.media_type === "VIDEO" && media.media_url) {
				media.video_url = media.media_url;
			} else if (media.media_type === "VIDEO") {
				log(
					LogLevel.WARN,
					`Video without media_url (likely copyright-restricted): ${media.id}`,
				);
			}

			delete media.media_url;
			delete media.thumbnail_url;
			delete media.children;
			return media;
		},
	);

	return await Promise.all(promises);
}

export function isAllowedHost(url: string): boolean {
	let hostname: string;
	try {
		hostname = new URL(url).hostname.toLowerCase();
	} catch {
		return false;
	}
	return ["cdninstagram.com", "fbcdn.net"].some(
		(host) => hostname === host || hostname.endsWith(`.${host}`),
	);
}

export async function optimizeImage(
	url: string | undefined,
	fileName: string,
	folderPath: string,
	baseWidth: number,
): Promise<{ width: number; height: number }> {
	let dimensions = { width: 0, height: 0 };
	if (!url) {
		log(LogLevel.WARN, `Missing image URL: ${fileName}`);
		return dimensions;
	}

	if (!isAllowedHost(url)) {
		log(LogLevel.WARN, `Blocked fetch from invalid or disallowed URL: ${url}`);
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
			img.resize(baseWidth * i).write(`${folderPath}/${fileName}-${i}x.webp`);
		}

		dimensions = await img
			.metadata()
			.then((meta) => ({ width: meta.width, height: meta.height }));
		log(LogLevel.DEBUG, `Image optimized: ${fileName}`);
	} catch (error) {
		log(LogLevel.ERROR, `Couldn't fetch image from ${url}: ${error}`);
	}

	return dimensions;
}
