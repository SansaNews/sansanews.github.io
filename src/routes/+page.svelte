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

    <section class="w-full overflow-x-hidden">
        <!-- Card -->
        {#each Posts as post}
            <Card.Root class="border-0 shadow-none bg-transparent mb-8">
                <Card.Content class="px-0 sm:px-6">
                    <div class="bg-card border-2 border-border border-t card-shadow overflow-hidden flex flex-col md:flex-row md:h-82 rounded-lg">
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
                            <p class="overflow-y-auto text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line wrap-break-word">
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
                                        <span class="text-base sm:text-base font-semibold text-foreground truncate">
                                            {post.author}
                                        </span>
                                        <span class="text-[10px] uppercase text-muted-foreground tracking-wider font-semibold whitespace-nowrap">
                                            {post.time}
                                        </span>
                                    </div>
                                     <!-- Avatar -->
                                    <Avatar class="h-12 w-12 sm:h-15 sm:w-15 shrink-0">
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
                </Card.Content>
            </Card.Root>
        {/each}
    </section>
</main>