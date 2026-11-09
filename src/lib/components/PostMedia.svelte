<script lang="ts">
import { GalleryHorizontalEnd, Play } from "@lucide/svelte";
import * as Popover from "#lib/components/ui/popover/index.js";
import { type Media } from "#lib/media.js";
import { makeSrcset } from "#lib/utils.js";

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
</script>

{#snippet postImage(alt: string)}
	<img
		class="block h-full w-full object-contain"
		{...makeSrcset("posts", media.id, 376)}
		sizes="(min-width: 1024px) 33vw, 100vw"
		{alt}
		referrerpolicy="no-referrer"
		loading={first ? "eager" : "lazy"}
		fetchpriority={first ? "high" : "auto"}
		decoding={first ? "sync" : "async"}
		width={media.dimensions.width}
		height={media.dimensions.height}
	/>
{/snippet}

<svelte:window
	onscroll={() => {
		hovered = false;
		open = false;
	}}
/>

<div class="relative border-b-2 lg:w-1/3 lg:shrink-0 lg:border-r-2 lg:border-b-0">
	{#if media.videoURL && videoLoaded}
		<video
			class="block h-full w-full object-contain"
			src={media.videoURL}
			muted
			autoplay
			controls
			playsinline
			width={media.dimensions.width}
			height={media.dimensions.height}
		></video>
	{:else if media.videoURL}
		<button
			type="button"
			class="relative flex h-full w-full cursor-pointer border-none bg-transparent p-0 leading-none"
			onclick={() => {
				videoLoaded = true;
			}}
			aria-label="Reproducir video de {media.username}"
		>
			{@render postImage(`Previsualización video de ${media.username}`)}
			<div class="absolute inset-0 flex items-center justify-center bg-black/20">
				<Play class="h-16 w-16 fill-current text-white opacity-80" aria-hidden="true" />
			</div>
		</button>
	{:else}
		<a
			href={media.permalink}
			target="_blank"
			rel="noopener noreferrer"
			class="flex h-full w-full"
		>
			{@render postImage(`Post de ${media.username}`)}
			<span class="sr-only">(abre en una pestaña nueva)</span>
		</a>
	{/if}

	{#if media.type === "CAROUSEL_ALBUM"}
		<Popover.Root bind:open>
			<Popover.Trigger
				onmouseenter={() => (hovered = true)}
				onmouseleave={() => (hovered = false)}
				onclick={(e) => {
					e.preventDefault();
					open = true;
				}}
				aria-label="Más contenido en Instagram"
				class="absolute top-2 right-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black/50"
			>
				<GalleryHorizontalEnd class="h-4 w-4 text-white opacity-75" />
			</Popover.Trigger>

			<Popover.Content
				onmouseenter={() => (hovered = true)}
				onmouseleave={() => (hovered = false)}
				side="top"
				sideOffset={12}
				class="mx-4 w-48 border-0 bg-black/50 p-1 text-center text-xs text-white"
			>
				Más contenido en Instagram
			</Popover.Content>
		</Popover.Root>
	{/if}
</div>
