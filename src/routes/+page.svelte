<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import geekusm from '$lib/assets/image.png';
    import * as Card from "$lib/components/ui/card/index.js";
    import { Avatar, AvatarFallback } from "$lib/components/ui/avatar/index.js";
    
    const Posts = [
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


<main class="w-full max-w-6xl mx-auto p-4 flex flex-col gap-8 min-h-screen">
    
    <!-- Title -->
    <header class="w-full text-center py-8 border-b-3 border-double">
        <h1 class="text-5xl md:text-7xl font-bold text-foreground tracking-tight font-[--font-heading]">
            Últimas Noticias
        </h1>
        <div class="flex items-center justify-center gap-4 mt-4">
            <div class="h-0.5 w-16 bg-primary/40"></div>
                <p class="text-sm uppercase tracking-widest text-muted-foreground font-semibold">
                    05/02/2026
                </p>
            <div class="h-0.5 w-16 bg-primary/40"></div>
        </div>
    </header>

    <section class="w-full">
        
        {#each Posts as post, i}
            <!-- Card -->
            <Card.Root class="border-0 shadow-none bg-transparent mb-8">
                <Card.Content class="px-6">
                    
                    <div class="bg-card border-2 border-border card-shadow">
                        
                        <div class="flex flex-col md:flex-row md:h-82"> 
                            
                            <!-- IG post image -->
                            <div class="w-full md:w-auto h-full aspect-square shrink-0 border-b-2 md:border-b-0 md:border-r-2 border-border">
                                <div class="relative w-full h-full group">
                                    <img 
                                        src={post.image} 
                                        alt="Noticia {i + 1}" 
                                        class="absolute inset-0 w-full h-full object-cover" 
                                    />
                                </div>
                            </div>
                            
                            <!-- Post info -->
                            <div class="w-full flex-1 min-w-0 p-6 md:p-8 flex flex-col">
                                
                                <!-- Description -->
                                <p class="flex-1 overflow-y-auto text-base text-foreground leading-relaxed whitespace-pre-line">
                                    {post.description}
                                </p>
                                
                                <!-- Footer -->
                                <div class="mt-auto pt-4 border-t-2 border-border flex items-center justify-between shrink-0">
                                    
                                    <!-- Author info -->
                                    <div class="flex items-center gap-3">
                                        
                                        <!-- Avatar -->
                                        <Avatar class="h-8 w-8 border-2 border-border">
                                            <AvatarFallback class="bg-primary text-primary-foreground text-xs font-bold">
                                                {post.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                    
                                        <!-- Name and publish time -->
                                        <div class="flex flex-col">
                                            <span class="text-sm font-bold text-foreground font-[--font-heading]">
                                                {post.author}
                                            </span>
                                            <span class="text-[10px] uppercase text-muted-foreground tracking-wider font-semibold">
                                                {post.time}
                                            </span>
                                        </div>
                                    </div>

                                    <!-- likes and comments -->
                                    <div class="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                                        <div class="flex items-center gap-1">
                                            ❤️ {post.likes}
                                        </div>
                                        <div class="flex items-center gap-1">
                                            💬 {post.comments}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </Card.Content>
            </Card.Root>
        {/each}
    </section>
</main>