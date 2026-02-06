<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Avatar } from "$lib/components/ui/avatar/index.js";

    import media from "$lib/assets/media.json"

    // Time conversion
    function timeAgo(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        let interval = seconds / 31536000;
        if (interval > 1) return `Hace ${Math.floor(interval)} años`;
        
        interval = seconds / 2592000;
        if (interval > 1) return `Hace ${Math.floor(interval)} meses`;
        
        interval = seconds / 86400;
        if (interval > 1) return `Hace ${Math.floor(interval)} días`;
        
        interval = seconds / 3600;
        if (interval > 1) return `Hace ${Math.floor(interval)} horas`;
        
        interval = seconds / 60;
        if (interval > 1) return `Hace ${Math.floor(interval)} minutos`;
        
        return "Hace un momento";
    }

    // Data map    
    const Posts = media.map((item) => ({
        description: item.caption || "Sin descripción",
        image: item.media_url, 
        author: item.username,
        authorProfile: "https://www.instagram.com/" + item.username,
        authorAvatar: item.profile_picture_url,
        permaLink: item.permalink,

        time: timeAgo(item.timestamp),
    }));
</script>

<main class="w-full max-w-7xl mx-auto px-4 py-4 flex flex-col gap-8 min-h-screen overflow-x-hidden">
    
    <!-- Banner -->
    <div class="w-full border-2 border-border bg-card card-shadow">
        <div class="border-b-2 border-border bg-foreground text-background px-4 py-2">
            <p class="text-center text-sm font-bold uppercase tracking-widest">
                alpha-1.0.0 
            </p>
        </div>
        <div class="px-4 sm:px-6 py-4 text-center">
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold font-[--font-heading] text-foreground mb-2">
                WORK IN PROGRESS
            </h2>
            <p class="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">
                SansaNews se encuentra en fases tempranas del desarrollo, pronto se presentarán mejoras en estetica y contenido, gracias por su comprension.
            </p>
        </div>
    </div>

    <section class="w-full overflow-x-hidden">

        <!-- Card -->
        {#each Posts as post}
            <Card.Root class="border-0 shadow-none bg-transparent mb-8">
                <Card.Content class="px-0 sm:px-6">
                    <div class="bg-card border-2 border-border card-shadow overflow-hidden">
                        <div class="flex flex-col md:flex-row md:h-82"> 
                            <div class="w-full md:w-auto h-full aspect-square shrink-0 border-b-2 md:border-b-0 md:border-r-2 border-border overflow-hidden">
                                
                                <!-- IG post image -->
                                <a 
                                    href={post.permaLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    class="relative w-full h-full group block"
                                >
                                    <img 
                                        src={post.image} 
                                        alt="Post de {post.author}" 
                                        referrerpolicy="no-referrer"
                                        class="absolute inset-0 w-full h-full object-cover" 
                                    />
                                </a>
                            </div>
                            
                            <!-- Post info -->
                            <div class="w-full flex-1 min-w-0 p-4 md:p-4 flex flex-col justify-between">

                                <!-- Description -->
                                <p class="overflow-y-auto text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line break-words">
                                    {post.description}
                                </p>
                                
                                <!-- Footer -->
                                <div class="pt-4 border-t-2 border-border flex items-center justify-end shrink-0">
                                    
                                    <!-- Author info -->
                                    <a 
                                        href={post.authorProfile} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        class="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
                                    >

                                        <!-- Name and publish time -->
                                        <div class="flex flex-col text-right min-w-0">
                                            <span class="text-base sm:text-lg font-bold text-foreground font-[--font-heading] truncate">
                                                {post.author}
                                            </span>
                                            <span class="text-[10px] uppercase text-muted-foreground tracking-wider font-semibold whitespace-nowrap">
                                                {post.time}
                                            </span>
                                        </div>

                                         <!-- Avatar -->
                                        <Avatar class="h-12 w-12 sm:h-15 sm:w-15 border-2 border-border shrink-0">
                                            <img 
                                                src={post.authorAvatar} 
                                                alt="Post de {post.author}" 
                                                referrerpolicy="no-referrer"
                                                class="absolute inset-0 w-full h-full object-cover" 
                                            />
                                        </Avatar>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Content>
            </Card.Root>
        {/each}
    </section>
</main>