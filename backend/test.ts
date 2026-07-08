import assert from "node:assert";
import { LogLevel, log } from "./logging.ts";
import { APIConfig, igFetch, sanitizeData } from "./main.ts";

if (import.meta.main) {
	try {
		await main();
	} catch (error) {
		log(LogLevel.FATAL, `Execution failed: ${error}`);
		process.exit(1);
	}
}

async function main() {
	const args = process.argv.slice(2);
	const command = args[0];

	assert(command, "Command is required");

	try {
		switch (command) {
			case "check":
				await handleCheckCommand(args);
				break;
			case "get":
				await handleGetCommand(args);
				break;
			default:
				log(LogLevel.ERROR, `Unknown command: ${command}`);
		}
	} catch (error) {
		log(
			LogLevel.FATAL,
			`Execution failed: ${error instanceof Error ? error.message : error}`,
		);
		process.exit(1);
	}
}

async function handleCheckCommand(args: string[]): Promise<void> {
	const username = args[1];
	assert(username, "Username is required for 'check' command");

	const isCreator = await checkIfCreatorAccount(username, new APIConfig());
	console.log(isCreator);
}

interface GetFlags {
	username: string;
	sanitize: boolean;
	sinceDays: number;
	maxPosts: number;
}

function parseGetFlags(args: string[]): GetFlags {
	let username = "";
	let sanitize = false;
	let sinceDays = 3650; // Default to 10 years (no limit)
	let maxPosts = 10000; // Default to 10000 posts (no limit)

	for (let i = 1; i < args.length; i++) {
		const arg = args[i];
		switch (arg) {
			case "--sanitize":
				sanitize = true;
				break;
			case "--since": {
				i++;
				assert(args[i], "Value is required for --since");
				sinceDays = Number.parseInt(args[i], 10);
				assert(
					!Number.isNaN(sinceDays) && sinceDays > 0,
					"Invalid value for --since",
				);
				break;
			}
			case "--max": {
				i++;
				assert(args[i], "Value is required for --max");
				maxPosts = Number.parseInt(args[i], 10);
				assert(
					!Number.isNaN(maxPosts) && maxPosts > 0,
					"Invalid value for --max",
				);
				break;
			}
			default:
				if (!arg.startsWith("--")) username = arg;
		}
	}

	return { username, sanitize, sinceDays, maxPosts };
}

async function handleGetCommand(args: string[]): Promise<void> {
	const { username, sanitize, sinceDays, maxPosts } = parseGetFlags(args);
	assert(username, "Username is required for 'get' command");

	const config = new APIConfig(15, sinceDays, maxPosts);

	if (sanitize) {
		const sanitizedData = await sanitizeData(username, "", config);
		console.dir(sanitizedData, { depth: null });
		return;
	}

	const fields = `
  business_discovery.username(${username}){
    profile_picture_url,
    media.limit(${config.maxPostsPerUser}).since(${config.timestampLimit}) {
      timestamp,caption,media_type,permalink,media_url,children,thumbnail_url
    }
  }`;

	const result = await igFetch(username, fields, config);
	if (!result.ok) {
		if (result.reason === "forbidden") {
			throw new Error(
				"HTTP 403 Forbidden: Reached API rate limit or insufficient permissions.",
			);
		}
		console.dir({}, { depth: null });
		return;
	}

	console.dir(await result.response.json(), { depth: null });
}

async function checkIfCreatorAccount(
	username: string,
	config: APIConfig,
): Promise<boolean> {
	const result = await igFetch(
		username,
		`business_discovery.username(${username}){name}`,
		config,
	);

	if (result.ok) return true;
	if (result.reason === "forbidden") {
		throw new Error(
			"HTTP 403 Forbidden: Reached API rate limit or insufficient permissions.",
		);
	}
	return false;
}
