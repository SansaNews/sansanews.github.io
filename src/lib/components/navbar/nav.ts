import { type Icon as IconType, Newspaper, Info, PencilRuler } from "@lucide/svelte";
import { resolve } from "$app/paths";
import { goto } from "$app/navigation";
import categoriesJSON from "$lib/assets/users.json";

export interface NavItem {
  label: string;
  href: string;
  icon?: typeof IconType;
}

export const categories: NavItem[] = Object.keys(categoriesJSON).map((category) => ({
  label: category,
  href: resolve("/[[category]]", { category: category.toLowerCase() }),
}));

export const sections: NavItem[] = [
  { label: "Noticias", href: resolve("/"), icon: Newspaper },
  { label: "Herramientas", href: resolve("/herramientas"), icon: PencilRuler },
  { label: "Sobre Nosotros", href: resolve("/nosotros"), icon: Info },
];

export function isSectionActive(href: string, currentPath: string): boolean {
  if (currentPath === href) return true;

  if ( 
    href === resolve("/") && 
    !sections.some((s) => s.href !== resolve("/") && currentPath.startsWith(s.href))
  ) 
  {
    return true;
  }

  return false;
}

export function handleNavClick(event: MouseEvent, isActive: boolean) {
  if (isActive) {
    event.preventDefault();
    goto(resolve("/"));
  }
}