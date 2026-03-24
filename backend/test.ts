import { APIConfig, getUserData, sanitizeData, assert } from "./main.ts";

if (import.meta.main) {
  main();
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  assert(command, "Command is required");

  try {
    if (command === "check") {
      const username = args[1];
      assert(username, "Username is required for 'check' command");

      const isCreator = await checkIfCreatorAccount(username, new APIConfig());
      console.log(isCreator);
    } else if (command === "get") {
      let username = "";
      let sanitize = false;
      let sinceDays = 3650; // Default to 10 years (no limit)
      let maxPosts = 10000; // Default to 10000 posts (no limit)

      for (let i = 1; i < args.length; i++) {
        const arg = args[i];
        if (arg === "--sanitize") {
          sanitize = true;
        } else if (arg === "--since") {
          i++;
          assert(args[i], "Value is required for --since");
          sinceDays = parseInt(args[i], 10);
          assert(!isNaN(sinceDays) && sinceDays > 0, "Invalid value for --since");
        } else if (arg === "--max") {
          i++;
          assert(args[i], "Value is required for --max");
          maxPosts = parseInt(args[i], 10);
          assert(!isNaN(maxPosts) && maxPosts > 0, "Invalid value for --max");
        } else if (!arg.startsWith("--")) {
          username = arg;
        }
      }

      assert(username, "Username is required for 'get' command");
      const data = await getUserData(username, new APIConfig(15, sinceDays, maxPosts));

      if (sanitize) {
        const sanitizedData = sanitizeData(username, data);
        console.dir(sanitizedData, { depth: null });
      } else {
        console.dir(data, { depth: null });
      }
    } else {
      console.error(`Unknown command: ${command}`);
    }
  } catch (error) {
    console.error("Execution failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

async function checkIfCreatorAccount(username: string, config: APIConfig): Promise<boolean> {
  const fields = `business_discovery.username(${username}){name}`;
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
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Could not connect to Instagram API: ${error}`);
    return false;
  }
}
