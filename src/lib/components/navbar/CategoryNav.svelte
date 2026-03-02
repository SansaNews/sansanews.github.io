<script lang="ts">
  import { page } from "$app/state";
  import { categories, handleNavClick } from "./nav";

  function getCategoryStyles(isActive: boolean): string {
    const baseStyles = "rounded-md px-4 py-1.5 text-sm font-medium";
    const activeStyles = "bg-primary text-background";
    const inactiveStyles = "text-muted-foreground hover:text-primary hover:bg-primary/10";

    return isActive
      ? `${baseStyles} ${activeStyles}`
      : `${baseStyles} ${inactiveStyles}`;
  }
</script>

<nav class="hidden lg:flex items-center gap-2 flex-wrap">
  {#each categories as category}
    {@const isActive = page.url.pathname === category.href}
    
    <a
      href={category.href}
      onclick={(e) => handleNavClick(e, isActive)}
      class={getCategoryStyles(isActive)}
    >
      {category.label}
    </a>
  {/each}
</nav>