# AGENTS.md

This file gives guidance to coding agents that work with code in this repository.

## Project

SansaNews is a static SvelteKit site. It collects recent Instagram posts from USM accounts and shows them on one page. The UI text is in Spanish.

## Commands

The project uses `just` and Bun. Run `just --list` to see all recipes.

```sh
just init                 # bun install
just dev                  # vite dev server
just lint                 # svelte-check + biome check
just build                # vite build, then vite preview
just update               # clear static/pfp and static/posts, then run backend/main.ts
just check <username>     # tell if the account is reachable through the API
just get <username> [--sanitize] [--since <days>] [--max <n>]
just rate-limit           # show current API rate-limit usage
```

The `justfile` sets `dotenv-required`. Every recipe fails if `.env` does not exist. The backend scripts need `ACCESS_TOKEN` in `.env`.

The project has no test suite. `backend/test.ts` is a manual CLI for the Instagram API, not a test runner.

Lefthook runs on pre-commit:

1. `biome check --write` on staged files. The hook stages the fixed files again.
2. `bun run check` (svelte-check).

Biome uses tabs and double quotes.

## Architecture

The data flow has three stages.

1. Fetch. `backend/main.ts` reads `src/lib/assets/users.json`. The file maps a category name to a list of usernames. The script calls the Instagram Graph API `business_discovery` endpoint for each user. The default limits are 30 days and 5 posts for each user.
2. Store. The script downloads each profile picture and post image. Only `cdninstagram.com` and `fbcdn.net` hosts are allowed. Bun's image API converts each image to WebP at 1x, 2x, and 3x widths in `static/pfp/` and `static/posts/`. The script writes all posts, sorted newest first, to `src/lib/assets/media.json` with a `lastUpdate` timestamp.
3. Render. `src/routes/+page.svelte` imports `media.json` at build time. `jsonToMedia` in `src/lib/media.ts` maps the raw snake_case fields to the `Media` type. All routes are prerendered (`src/routes/+layout.js`) with `adapter-static`.

`media.json`, `static/pfp/`, and `static/posts/` are gitignored. Run `just update` before `just dev` or `just build`, or the home page import fails.

Videos: the backend copies `media_url` to `video_url` only for `VIDEO` posts that have it. Copyright-restricted videos come without `media_url`. The frontend then shows the thumbnail as a link to Instagram.

Time on the client: the site is prerendered, so relative dates ("Hoy", "Hace 3 horas") are not correct at build time. `src/lib/time.svelte.ts` holds a shared `ClientTime` rune. Components show skeletons until `isMounted` is true, then group and format dates from `now`. `now` updates each minute.

`src/lib/components/ui/` contains shadcn-svelte components (see `components.json`). Do not edit them by hand without a reason.

`src/service-worker.ts` only gives an offline fallback page for navigation requests. It does not cache assets.

## Deploy

`.github/workflows/deploy.yml` runs on a push to the `pages` branch, each hour at minute 42, and on manual dispatch. It runs `backend/main.ts` with the `ACCESS_TOKEN` secret, builds with `BASE_PATH=''`, and deploys `build/` to GitHub Pages. Development happens on `main`. To publish, push to `pages`.

The Instagram API allows 200 requests each hour. The hourly schedule exists because of this limit.

## Known errors in README.md

- The README says that the backend uses Python. The backend is TypeScript on Bun.
- The README names `.github/workflow/backend.yml`. That file does not exist. `deploy.yml` fetches the posts.
