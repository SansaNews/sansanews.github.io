<script lang="ts">
  import DesktopNav from "./DesktopNav.svelte";
  import BottomNav from "./BottomNav.svelte";
  import TopNav from "./TopNav.svelte";
  import { House, Info } from "@lucide/svelte";
  import { resolve } from "$app/paths";
  import { type NavItem } from "./nav";
  import categoriesJSON from "$lib/assets/users.json";

  let categories: NavItem[] = [];
  for (let category in categoriesJSON) {
    categories.push({
      label: category,
      href: resolve("/[[category]]", { category: category.toLowerCase() }),
    });
  }

  const sections: NavItem[] = [
    {
      label: "Inicio",
      href: resolve("/"),
      icon: House,
    },
    {
      label: "Sobre Nosotros",
      href: resolve("/nosotros"),
      icon: Info,
    },
  ];

  let allItems = [sections[0], ...categories, sections[1]];

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
<DesktopNav navItems={allItems} />
<TopNav {categories} hidden={hideMobileNav} />
<BottomNav {sections} hidden={hideMobileNav} />
