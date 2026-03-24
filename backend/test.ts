import { APIConfig, getUserData, assert } from "./main.ts";

if (import.meta.main) {
  main();
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  assert(command, "Command is required");

  try {
    const config = new APIConfig();

    if (command === "check") {
      const username = args[1];
      assert(username, "Username is required for 'check' command");

      const isCreator = await checkIfCreatorAccount(username, config);
      console.log(isCreator);
    } else if (command === "get") {
      const username = args[1];
      assert(username, "Username is required for 'get' command");

      const data = await getUserData(username, config);
      console.dir(data, { depth: null });
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
