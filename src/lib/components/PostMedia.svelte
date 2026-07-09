<script lang="ts">
import { GalleryHorizontalEnd } from "@lucide/svelte";
import * as Popover from "$lib/components/ui/popover/index.js";
import { type Media } from "$lib/media";
import { makeSrcset } from "$lib/utils";

let { media, first }: { media: Media; first: boolean } = $props();
let videoLoaded = $state(false);

let hovered = $state(false);
let open = $state(false);

$effect(() => {
	if (hovered) {
		open = true;
		return;
	}
	const timer = setTimeout(() => {
		open = false;
	}, 150);
	return () => clearTimeout(timer);
});

function handleOpen() {
	hovered = true;
}

function handleClose() {
	hovered = false;
}

function handleScroll() {
	hovered = false;
	open = false;
}
</script>

<svelte:window onscroll={handleScroll} />

<div class="relative border-b-2 lg:w-1/3 lg:shrink-0 lg:border-r-2 lg:border-b-0">
	<a
		href={media.permalink}
		target="_blank"
		rel="noopener noreferrer"
		class="flex h-full w-full"
	>
		{#if media.type !== "VIDEO"}
			<img
				class="block h-full w-full object-contain"
				{...makeSrcset('/posts', media.id, 376)}
				sizes="(min-width: 1024px) 33vw, 100vw"
				alt="Post de {media.username}"
				referrerpolicy="no-referrer"
				loading={first ? "eager" : "lazy"}
				fetchpriority={first ? "high" : "auto"}
				decoding={first ? "sync" : "async"}
				width={media.dimensions.width}
				height={media.dimensions.height}
			/>
		{:else if videoLoaded}
			<video
				class="block h-full w-full object-contain"
				src={media.videoURL}
				muted
				autoplay
				controls
				width={media.dimensions.width}
				height={media.dimensions.height}
			></video>
		{:else}
			<button
				class="relative flex h-full w-full cursor-pointer border-none bg-transparent p-0 leading-none"
				onclick={(e) => {
					e.preventDefault();
					videoLoaded = true;
				}}
				aria-label="Reproducir video de {media.username}"
			>
				<img
					class="block h-full w-full object-contain"
					{...makeSrcset('/posts', media.id, 376)}
					sizes="(min-width: 1024px) 33vw, 100vw"
					alt="Previsualización video de {media.username}"
					loading={first ? "eager" : "lazy"}
					fetchpriority={first ? "high" : "auto"}
					decoding={first ? "sync" : "async"}
					width={media.dimensions.width}
					height={media.dimensions.height}
				/>
				<div class="absolute inset-0 flex items-center justify-center bg-black/20">
					<svg
						class="h-16 w-16 text-white opacity-80"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
						/>
					</svg>
				</div>
			</button>
		{/if}
	</a>

	{#if media.type === "CAROUSEL_ALBUM"}
		<Popover.Root bind:open>
			<Popover.Trigger
				onmouseenter={handleOpen}
				onmouseleave={handleClose}
				onclick={(e) => {
					e.preventDefault();
					open = true;
				}}
				class="absolute top-2 right-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black/50"
			>
				<GalleryHorizontalEnd class="h-4 w-4 text-white opacity-75" />
			</Popover.Trigger>

			<Popover.Content
				onmouseenter={handleOpen}
				onmouseleave={handleClose}
				side="top"
				sideOffset={12}
				class="mx-4 w-48 border-0 bg-black/50 p-1 text-center text-xs text-white"
			>
				Más contenido en Instagram
			</Popover.Content>
		</Popover.Root>
	{/if}
</div>
