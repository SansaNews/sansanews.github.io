<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
	import { navigationMenuTriggerStyle } from "$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";
	import logo from '$lib/assets/logo-sn-w-v1.1.png';
    import '../app.css';


	const navItems = [
        { label: 'Iniciativas', href: '/iniciativas' },
        { label: 'Avisos', href: '/avisos' },
        { label: '¿Qué es una iniciativa?', href: '/que-es' },
        { label: 'Sobre Nosotros', href: '/nosotros' }
    ];

    let { children } = $props();
</script>

<!-- Web browser tab  -->
<svelte:head>
    <title>SansaNews</title>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="grid min-h-screen grid-rows-[auto_1fr_auto] relative">
    
    <header class="w-full bg-background z-50 relative">
		
		<!-- Navbar -->
		<div class="w-full flex h-22 items-center justify-end max-w-7xl mx-auto p-4"> 

			<div class="flex items-center">

				<!-- Logo -->
				<div class= "flex items-center after:content-['/'] after:mx-1 after:text-slate-300">				
    				<a href="/" class="flex items-center gap-2 shrink-0">
    				    <img src={logo} class="h-auto w-70" alt="SansaNews Logo"/>
					</a>
				</div>
				
				<!-- Items -->
    			<NavigationMenu.Root>
            	    <NavigationMenu.List class="flex items-center [&>li:not(:last-child)]:after:content-['/'] [&>li:not(:last-child)]:after:mx-1 [&>li:not(:last-child)]:after:text-slate-300">
					
            	        {#each navItems as item}
            	            <NavigationMenu.Item>
            	                <NavigationMenu.Link href={item.href}>
            	                    {#snippet child({ props })}
            	                        <a href={item.href} {...props} class={navigationMenuTriggerStyle()}>
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


	<!-- Main content -->
    {@render children()}


	<!-- Footer -->
    <footer class="border-t-5 py-6 text-center text-sm font-medium">
        <p>SansaNews es un medio de comunicación automatizado que visibiliza las iniciativas estudiantiles de la USM</p>
    </footer>

</div>