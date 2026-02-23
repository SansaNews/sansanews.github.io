import { type Icon as IconType } from "@lucide/svelte";

export interface NavItem {
  label: string;
  href: string;
  icon?: typeof IconType;
}
