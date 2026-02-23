<script lang="ts">
  import { resolve } from "$app/paths";
  import { House, Info } from "@lucide/svelte";
  import Topnav from "./Topnav.svelte";
  import BottomNav from "./BottomNav.svelte";
  import Navbar from "./Navbar.svelte";
  import { type NavItem } from "$lib/nav";

  const categories: NavItem[] = [
    {
      label: "USM",
      href: resolve("/[[category]]", { category: "usm" }),
    },
    {
      label: "Iniciativas",
      href: resolve("/[[category]]", { category: "iniciativas" }),
    },
    {
      label: "Deportes",
      href: resolve("/[[category]]", { category: "deportes" }),
    },
    {
      label: "Centros",
      href: resolve("/[[category]]", { category: "centros" }),
    },
  ];

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
<Navbar navItems={allItems} />
<Topnav {categories} hidden={hideMobileNav} />
<BottomNav {sections} hidden={hideMobileNav} />

