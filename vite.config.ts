import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter({ fallback: "404.html" }),
			paths: {
				base: process.argv.includes("dev")
					? ""
					: (process.env.BASE_PATH as "" | `/${string}` | undefined),
			},
		}),
	],
});
