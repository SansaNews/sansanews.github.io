<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import geekusm from '$lib/assets/image.png';
    import { Separator } from "$lib/components/ui/separator/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import { Avatar, AvatarFallback } from "$lib/components/ui/avatar/index.js";
    
    const carouselSlides = [
        {  
            description: "✨ ¡Revisa el cronograma oficial de Festigeek! ✨\n\nEste sábado te esperamos con un día lleno de actividades para todos los gustos:\n\n🔥 Escenario principal con dance cover y cosplay\n🎤 Mini Stage repleto de concursos y juegos\n🎨 Talleres creativos para aprender y ampliar tus conocimientos.\n🎶 K-Stage con concursos, pasapalabra geek, pasarela y mucho más\n\nVen a disfrutar, competir, bailar, crear y vivir la experiencia completa del Festigeek.\n\n¡Prepárate para un día lleno de magia, energía y comunidad geek! 💜⚡\n\n📍 Campus San Joaquín UTFSM\n📅 Sábado 6 de diciembre\n⏰ Desde las 11:00 hrs\n\n#Festigeek #GeekUSM #geekie", 
            image: geekusm,
            author: "GEEKUSM", 
            initials: "GK",
            time: "Hace 2 horas",
            comments: 22,
            likes: 323
        },
        {  
            description: "eL WEB DEV me tiene loco",
            image: favicon,
            author: "Joaquin Dominguez", 
            initials: "JD",
            time: "Hace 2 horas",
            comments: 22,
            likes: 2341
        },
        {  
            description: "Una prueba poca",
            image: favicon,
            author: "Yo el", 
            initials: "YE",
            time: "Hace 2 horas",
            comments: 22,
            likes: 4562
        },
    ];
</script>

<main class="w-full max-w-6xl mx-auto p-4 flex flex-col gap-8 min-h-screen font-sans">

    <!-- Top section -->
    <section class="w-full">
        
        <!-- Carousel -->
        <Carousel.Root class="w-full select-none cursor-grab active:cursor-grabbing" opts={{ loop: true, startIndex: 0, }}>
            <Carousel.Content class="ml-0">
                {#each carouselSlides as slide, i}
                    <Carousel.Item class="pl-0">
                        <Card.Root class="border-0 shadow-none bg-transparent">
                            <Card.Content class="p-0">
                                
                                <!-- Layout: image left, info right -->
                                <div class="bg-card/50 border border-border rounded-xl overflow-hidden">
                                    <div class="flex flex-col md:flex-row">
                                        
                                        <!-- IG image -->
                                        <div class="w-full md:w-1/2 aspect-square shrink-0">
                                            <div class="relative w-full h-full group">
                                                <img 
                                                    src={slide.image} 
                                                    alt="Noticia {i + 1}" 
                                                    class="absolute inset-0 w-full h-full object-contain"
                                                />
                                            </div>
                                        </div>
                                        
                                        <!-- Info -->
                                        <div class="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center space-y-6">
                                            <!-- Metadata -->
                                            <div class="space-y-4">
                                                <!-- Avatar and author -->
                                                <div class="flex items-center gap-3">
                                                    <Avatar class="h-10 w-10 bg-primary text-primary-foreground shrink-0">
                                                        <AvatarFallback class="bg-primary text-primary-foreground font-bold text-sm">
                                                            {slide.initials}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span class="text-lg font-extrabold leading-tight tracking-tighter text-foreground">
                                                        {slide.author}
                                                    </span>
                                                </div>
                                                
                                                <!-- Hour, likes and comments -->
                                                <div class="flex items-center gap-4 text-muted-foreground text-sm font-bold">
                                                    <span class="uppercase tracking-wider">{slide.time}</span>
        
                                                    <div class="flex items-center gap-1.5">

                                                        <!-- heart (likes) -->
                                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                                        </svg>
                                                        <span>{slide.likes}</span>

                                                    </div>
                                                    
                                                    <div class="flex items-center gap-1.5">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                                        </svg>
                                                        <span>{slide.comments}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <!-- Description -->
                                            <p class="text-base text-muted-foreground leading-relaxed">
                                                {slide.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Content>
                        </Card.Root>
                    </Carousel.Item>
                {/each}
            </Carousel.Content>
            
            <Carousel.Previous class="top-1/2 -translate-y-1/2 bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary hover:text-secondary-foreground transition-all" />
            <Carousel.Next class="top-1/2 -translate-y-1/2 bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary hover:text-secondary-foreground transition-all" />
        </Carousel.Root>

    </section>

    <Separator class="bg-border" />

    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card.Root class="border-border bg-card/50 h-96">
            <Card.Content class="h-full flex items-center justify-center p-6">
                <h2 class="text-xl font-bold text-muted-foreground">Abajo Izquierda</h2>
            </Card.Content>
        </Card.Root>
        
        <Card.Root class="border-border bg-card/50 h-96">
            <Card.Content class="h-full flex items-center justify-center p-6">
                <h2 class="text-xl font-bold text-muted-foreground">Abajo Derecha</h2>
            </Card.Content>
        </Card.Root>
    </section>

</main>