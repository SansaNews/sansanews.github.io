# AGENTS.md

Context for coding agents in this repository.

## Project

SansaNews is a static SvelteKit site. It shows recent Instagram posts from USM accounts on one page.

## Rules

- Write code, commit messages, and branch names in English.
- Write UI text and documentation in Spanish. This file is the only exception.
- Use Conventional Commits. Name branches `type/short-description` with the same types.
- In each pull request description, disclose AI use in one line. Name the tool and what it did.
- Follow `DESIGN.md` for UI work. Always use the color tokens.
- Import from `src/lib` with `#lib/*`. Always write the file extension, for example `#lib/utils.js` for `utils.ts`.
- Do not edit `src/lib/components/ui/` (shadcn-svelte) without a reason.
- Do not push to `pages`. A push to `pages` publishes the site.

`CONTRIBUTING.md` gives the full contribution rules.

## Commands

```sh
just init      # bun install
just dev       # vite dev server
just lint      # svelte-check + biome check
just update    # fetch posts into media.json (needs ACCESS_TOKEN)
just build     # vite build, then vite preview
```

Run `just --list` to see all recipes.

- Every recipe fails if `.env` does not exist.
- The project has no test suite. `backend/test.ts` is a manual CLI for the Instagram API.
- To sort Tailwind classes, run `bun x biome check --write --unsafe`. The fix is unsafe, so `just lint` does not apply it.
- CI runs `biome ci` and `bun run check`.

## Data flow

1. `backend/main.ts` reads `src/lib/assets/users.json` and calls the Instagram Graph API.
2. The script writes the images to `static/pfp/` and `static/posts/`, and the posts to `src/lib/assets/media.json`.
3. `src/routes/+page.svelte` imports `media.json` at build time. All routes are prerendered.

These three paths are gitignored. Without `media.json`, the home page import fails. If you have no token, copy the fake `media.json` step from `.github/workflows/ci.yml`.

## Non-obvious behavior

- SvelteKit reads its configuration from the `sveltekit(...)` plugin in `vite.config.ts`. The project has no `svelte.config.js`.
- Relative dates are wrong at build time, because the site is prerendered. `ClientTime` in `src/lib/time.svelte.ts` gives the client time. Components show skeletons until `isMounted` is true.
- The Instagram API allows 200 requests each hour. For this reason, the deploy workflow runs each hour.
