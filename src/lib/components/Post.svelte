<script lang="ts">
import PostMedia from "#lib/components/PostMedia.svelte";
import User from "#lib/components/User.svelte";
import { type Media } from "#lib/media.js";

let { media, first }: { media: Media; first: boolean } = $props();
</script>

<div class="mb-8 py-6 text-card-foreground">
	<div
		class="card-shadow relative flex flex-col overflow-hidden rounded-lg border-2 border-t bg-card lg:flex-row"
	>
		<PostMedia {media} {first} />

		<div class="flex w-full flex-col justify-between p-4">
			<p
				class="overflow-y-auto wrap-break-word whitespace-pre-line lg:grow lg:basis-0"
			>
				{media.caption}
			</p>

			<div class="flex justify-end border-t-2 pt-4">
				<User username={media.username} datePublished={media.datePublished} />
			</div>
		</div>
	</div>
</div>
