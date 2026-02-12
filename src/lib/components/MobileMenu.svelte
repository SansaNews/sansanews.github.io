<script lang="ts">
  let { navItems } = $props();
  let mobileMenuOpen = $state(false);
</script>

<div>
  <!-- Mobile menu button -->
  <div class="flex justify-center md:hidden">
    <button
      onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
      class="hover:bg-primary/10 rounded-md p-2 transition-colors"
      aria-label="Toggle menu"
    >
      <svg
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {#if mobileMenuOpen}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        {:else}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        {/if}
      </svg>
    </button>
  </div>

  <!-- Mobile navigation -->
  {#if mobileMenuOpen}
    <nav class="mt-4 border-t pt-4 md:hidden">
      <ul class="flex flex-col gap-2">
        {#each navItems as item}
          <li>
            <a
              href={item.href}
              onclick={() => (mobileMenuOpen = false)}
              class="hover:bg-primary/10 hover:text-primary block rounded-md px-4 py-3 text-center transition-colors"
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
</div>
