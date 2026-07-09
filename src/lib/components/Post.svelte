<script lang="ts">
import PostMedia from "$lib/components/PostMedia.svelte";
import User from "$lib/components/User.svelte";
import * as Card from "$lib/components/ui/card/index.js";
import { type Media } from "$lib/media";

let { media, first }: { media: Media; first: boolean } = $props();
</script>

<Card.Root class="mb-8 border-0 bg-transparent shadow-none">
	<Card.Content class="px-0">
		<div
			class="bg-card card-shadow relative flex flex-col overflow-hidden rounded-lg border-2 border-t lg:flex-row"
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
	</Card.Content>
</Card.Root>
