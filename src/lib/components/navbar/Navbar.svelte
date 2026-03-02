<script lang="ts">
  import DesktopNav from "./DesktopNav.svelte";
  import BottomNav from "./BottomNav.svelte";
  import TopNav from "./TopNav.svelte";
  import { sections, categories } from "./nav";

  let lastScrollY = $state(0);
  let hideMobileNav = $state(false);

  function handleScroll() {
    const currentScrollY = window.scrollY;
    hideMobileNav = currentScrollY > lastScrollY && currentScrollY > 10;
    lastScrollY = currentScrollY;
  }
</script>

<svelte:window onscroll={handleScroll} />

<div class="h-30 lg:hidden"></div>
<DesktopNav navItems={sections} />
<TopNav {categories} hidden={hideMobileNav} />
<BottomNav {sections} hidden={hideMobileNav} />