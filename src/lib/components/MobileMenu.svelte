<script lang="ts">
  let { navItems } = $props();
  let mobileMenuOpen = $state(false);
</script>

<div>
  <!-- Mobile menu button -->
  <div class="md:hidden flex justify-center">
    <button
      onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
      class="p-2 rounded-md hover:bg-primary/10 transition-colors"
      aria-label="Toggle menu"
    >
      <svg
        class="w-6 h-6"
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
    <nav class="md:hidden mt-4 border-t pt-4">
      <ul class="flex flex-col gap-2">
        {#each navItems as item}
          <li>
            <a
              href={item.href}
              onclick={() => (mobileMenuOpen = false)}
              class="block px-4 py-3 rounded-md hover:bg-primary/10 transition-colors hover:text-primary text-center"
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
</div>
