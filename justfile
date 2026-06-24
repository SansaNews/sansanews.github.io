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

# Update media.json
update:
	bun run backend/main.ts

# Check if user is available
check username:
	bun run backend/test.ts check {{username}}

# Get user media (--sanitize, --since <days>, --max <amount>)
get username *flags:
	bun run backend/test.ts get {{username}} {{flags}}

# Initialize project enviroment
init:
	bun install

# Run svelte-check and biome check
lint:
	bun run check
	bun x biome check
