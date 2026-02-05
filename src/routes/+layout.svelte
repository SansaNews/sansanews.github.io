<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
    import { navigationMenuTriggerStyle } from "$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";
    import logo from '$lib/assets/logo-sn.png';
    import '../app.css';


    const navItems = [
        { label: 'Iniciativas', href: '/iniciativas' },
        { label: 'Avisos', href: '/avisos' },
        { label: '¿Qué es una iniciativa?', href: '/que-es' },
        { label: 'Sobre Nosotros', href: '/nosotros' }
    ];

    let { children } = $props();
</script>

<svelte:head>
    <title>SansaNews</title>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="grid min-h-screen grid-rows-[auto_1fr_auto] relative bg-background text-foreground">
    
    <header class="w-full bg-background z-50 relative border-border">
        
        <div class="w-full flex h-22 items-center justify-end max-w-7xl mx-auto p-4"> 

            <div class="flex items-center border-b-3 border-double">

                <div class= "flex items-center after:content-['/'] after:mx-1 after:text-muted-foreground">             
                    <a href="/" class="flex items-center gap-2 shrink-0">
                        <img src={logo} class="h-auto w-70" alt="SansaNews Logo"/>
                    </a>
                </div>
                
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
            </div>
        </div>
    </header>


    {@render children()}


    <footer class="border-t-3 border-double p-6 text-center text-sm font-medium text-muted-foreground">
        <p>SansaNews es un medio de comunicación automatizado que visibiliza las iniciativas estudiantiles de la USM</p>
    </footer>

</div>