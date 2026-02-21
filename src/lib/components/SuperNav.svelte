<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import {
    House,
    Building2,
    Users,
    Trophy,
    Megaphone,
    Info,
  } from "@lucide/svelte";
  import Topnav from "./Topnav.svelte";
  import BottomNav from "./BottomNav.svelte";
  import Navbar from "./Navbar.svelte";
  import type { Component } from "svelte";

  // Single navigation entry
  export interface NavItem {
    label: string;
    icon: Component;
    href: string;
  }

  // Group of items sharing the same TopNav.
  // 'rootHrefs[0]' is the group root (where clicking an active item navigates to).
  // Remaining 'rootHrefs' are routes that also activate this group's TopNav.
  export interface NavGroup {
    items: NavItem[];
    rootHrefs: string[];
  }


  // Optional 'group' links the item to a NavGroup, used to determine
  // which BottomNav item is active when inside that group.
  export interface BottomNavItem extends NavItem {
    group?: NavGroup;
  }


  let { logo }: { logo: string } = $props();

  // "Inicio" group: active on "/" and all the filter routes
  const inicioGroup: NavGroup = {
    rootHrefs: [
      resolve("/"),
      resolve("/[[category]]", { category: "usm" }),
      resolve("/[[category]]", { category: "iniciativas" }),
      resolve("/[[category]]", { category: "deportes" }),
      resolve("/[[category]]", { category: "centros" }),
    ],
    items: [
      {
        label: "USM",
        icon: Building2,
        href: resolve("/[[category]]", { category: "usm" }),
      },
      {
        label: "Iniciativas",
        icon: Users,
        href: resolve("/[[category]]", { category: "iniciativas" }),
      },
      {
        label: "Deportes",
        icon: Trophy,
        href: resolve("/[[category]]", { category: "deportes" }),
      },
      {
        label: "Centros",
        icon: Megaphone,
        href: resolve("/[[category]]", { category: "centros" }),
      },
    ],
  };

  const bottomNavItems: BottomNavItem[] = [
    {
      label: "Inicio",
      icon: House,
      href: resolve("/"),
      group: inicioGroup,
    },
    {
      label: "Sobre Nosotros",
      icon: Info,
      href: resolve("/nosotros"),
    },
  ];

  // All registered groups. Add new groups here. 
  // (Now only one exists, but it's prepared for more.)
  const navGroups: NavGroup[] = [inicioGroup];

  // Active group: whichever group's rootHrefs includes the current route
  const activeGroup = $derived(
    navGroups.find((group) =>
      group.rootHrefs.includes(page.url.pathname)
    ) ?? null
  );

  // All items for the desktop Navbar (bottom nav + all group items)
  const allNavItems: NavItem[] = [
    bottomNavItems[0],
    ...navGroups.flatMap((g) => g.items),
    bottomNavItems[bottomNavItems.length - 1],
  ];

  let lastScrollY = $state(0);
  let topVisible = $state(true);
  let bottomHidden = $state(false);

  function handleScroll() {
    const currentScrollY = window.scrollY;
    topVisible = currentScrollY < lastScrollY || currentScrollY < 10;
    bottomHidden = currentScrollY > lastScrollY && currentScrollY > 100;
    lastScrollY = currentScrollY;
  }
</script>

<svelte:window onscroll={handleScroll} />

<div class="lg:hidden h-30"></div>
<Navbar navItems={allNavItems} {logo} />
<Topnav {activeGroup} {logo} {topVisible} />
<BottomNav {bottomNavItems} {activeGroup} {bottomHidden} />