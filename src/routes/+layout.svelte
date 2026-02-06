<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
    import { navigationMenuTriggerStyle } from "$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";
    import logo from '$lib/assets/logo-sn.png';
    import '../app.css';
    import { resolve } from "$app/paths";

    const navItems = [
        { label: 'Iniciativas', href: resolve('/iniciativas') },
        { label: 'Avisos', href: resolve('/avisos') },
        { label: '¿Qué es una iniciativa?', href: resolve('/que-es') },
        { label: 'Sobre Nosotros', href: resolve('/nosotros') }
    ];

    let { children } = $props();
    let mobileMenuOpen = $state(false);

    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }

    function closeMobileMenu() {
        mobileMenuOpen = false;
    }
</script>

<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SansaNews</title>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="grid min-h-screen grid-rows-[auto_1fr_auto] relative bg-background text-foreground overflow-x-hidden">
    
    <header class="w-full bg-background z-50 relative">
        <div class="w-full max-w-7xl mx-auto px-4 py-8">
            
            <!-- Logo -->
            <div class="text-center mb-6">
                <a href={resolve("/")} class="inline-block w-full">
                    <img src={logo} class="h-auto w-full max-w-120 mx-auto" alt="SansaNews Logo"/>
                </a>
            </div>

            <!-- Desktop navigation -->
            <div class="hidden md:flex items-center justify-center gap-4">
                <div class="h-0.5 w-16 bg-primary/40"></div>
                
                <NavigationMenu.Root>
                    <NavigationMenu.List class="flex items-center [&>li:not(:last-child)]:after:content-['/'] [&>li:not(:last-child)]:after:mx-1 [&>li:not(:last-child)]:after:text-muted-foreground">
                        {#each navItems as item}
                            <NavigationMenu.Item>
                                <NavigationMenu.Link href={item.href}>
                                    {#snippet child({ props })}
                                        <a href={item.href} {...props} class="bg-transparent focus:bg-transparent hover:bg-transparent active:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent transition-colors hover:text-primary focus:text-primary {navigationMenuTriggerStyle()}"> 
                                            {item.label}
                                        </a>
                                    {/snippet}
                                </NavigationMenu.Link>
                            </NavigationMenu.Item>
                        {/each}
                    </NavigationMenu.List>
                </NavigationMenu.Root>

                <div class="h-0.5 w-16 bg-primary/40"></div>
            </div>

            <!-- Mobile menu button -->
            <div class="md:hidden flex justify-center">
                <button 
                    onclick={toggleMobileMenu}
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
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        {:else}
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
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
                                    onclick={closeMobileMenu}
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
    </header>

    {@render children()}

    <footer class="border-t-3 border-double p-6 text-center text-sm font-medium text-muted-foreground">
        <p class="px-4">SansaNews es un medio de comunicación automatizado que visibiliza las iniciativas estudiantiles de la USM</p>
    </footer>

</div>