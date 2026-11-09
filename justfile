set dotenv-load
set dotenv-required
set windows-shell := ["powershell.exe", "-c"]

# Run dev server
dev:
	bun run dev

# Builds the page
build:
	bun run build
	bun run preview

# Update media.json (--dry-run: fake data, no API calls, keeps static/ files)
update *flags:
	bun run backend/main.ts {{flags}}

# Check if user is available
check username:
	bun run backend/test.ts check {{username}}

# Get user media (--sanitize, --since <days>, --max <amount>)
get username *flags:
	bun run backend/test.ts get {{username}} {{flags}}

# Check current API rate limit usage
rate-limit:
	bun run backend/test.ts rate-limit

# Initialize project enviroment
init:
	bun install

# Run unit tests
test:
	bun test

# Run svelte-check and biome check
lint:
	bun run check
	bun x biome check
