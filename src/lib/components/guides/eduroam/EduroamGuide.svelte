<script lang="ts">
import AndroidSteps from "$lib/components/guides/eduroam/PlatformSteps/AndroidSteps.svelte";
import LinuxSteps from "$lib/components/guides/eduroam/PlatformSteps/LinuxSteps.svelte";
import MacosSteps from "$lib/components/guides/eduroam/PlatformSteps/MacosSteps.svelte";
import WindowsSteps from "$lib/components/guides/eduroam/PlatformSteps/WindowsSteps.svelte";
import * as ToggleGroup from "$lib/components/ui/toggle-group";

const platforms = [
	{ id: "android", label: "Android" },
	{ id: "windows", label: "Windows" },
	{ id: "macos", label: "macOS" },
	{ id: "linux", label: "Linux (Ubuntu)" },
] as const;

type PlatformId = (typeof platforms)[number]["id"];

function isPlatformId(value: string): value is PlatformId {
	return platforms.some((p) => p.id === value);
}

let platform = $state<PlatformId>("android");

let fade = $state({ left: false, right: true });

function updateFade(e: Event) {
	const { scrollLeft, scrollWidth, clientWidth } = e.target as HTMLElement;
	fade.left = scrollLeft > 8;
	fade.right = scrollLeft < scrollWidth - clientWidth - 8;
}
</script>

<section>
  <h2>Elige tu dispositivo</h2>
  <div class="relative">
    <div
      class="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-10 bg-linear-to-r
    from-background transition-opacity duration-300 {fade.left ? '' : 'opacity-0'}"
    ></div>
    <div
      class="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-10 bg-linear-to-l
    from-background transition-opacity duration-300 {fade.right ? '' : 'opacity-0'}"
    ></div>

    <div
      onscroll={updateFade}
      class="overflow-x-auto"
      style="scrollbar-width: none;"
    >
    <ToggleGroup.Root
      type="single"
      value={platform}
      onValueChange={(value) => {
        if (value && isPlatformId(value)) platform = value;
      }}
      spacing={2}
      class="min-w-max"
    >
      {#each platforms as item (item.id)}
        <ToggleGroup.Item
          value={item.id}
          class="data-[state=on]:bg-primary/80 data-[state=on]:text-background text-muted-foreground hover:text-primary
          hover:bg-primary/10 cursor-pointer rounded-md bg-white px-4 text-sm font-medium
          shadow-xs transition-none"
        >
          {item.label}
        </ToggleGroup.Item>
      {/each}
    </ToggleGroup.Root>
    </div>
  </div>
</section>

<section>
  {#if platform === "android"}
    <h2>Android</h2>
    <AndroidSteps />
  {:else if platform === "windows"}
    <h2>Windows</h2>
    <WindowsSteps />
  {:else if platform === "macos"}
    <h2>macOS</h2>
    <MacosSteps />
  {:else}
    <h2>Linux (Ubuntu)</h2>
    <LinuxSteps />
  {/if}
</section>
