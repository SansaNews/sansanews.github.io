<script lang="ts">
  import DesktopNav from "./DesktopNav.svelte";
  import BottomNav from "./BottomNav.svelte";
  import TopNav from "./TopNav.svelte";
  import { Newspaper, Info , PencilRuler} from "@lucide/svelte";
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
      label: "Noticias",
      href: resolve("/"),
      icon: Newspaper,
    },
    {
      label: "Herramientas",
      href: resolve("/herramientas"),
      icon: PencilRuler,
    },
    {
      label: "Sobre Nosotros",
      href: resolve("/nosotros"),
      icon: Info,
    },
  ];

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
