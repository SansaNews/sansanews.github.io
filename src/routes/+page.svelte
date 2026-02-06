<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Avatar, AvatarFallback } from "$lib/components/ui/avatar/index.js";

    import media from "../media.json"

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

    // Initials (avatar wip)
    function getInitials(name: string): string {
        if (!name) return "USM";
        return name.substring(0, 2).toUpperCase();
    }

    
    const Posts = media.map((item) => ({
        description: item.caption || "Sin descripción",
        image: item.media_url, 
        author: item.username,
        initials: getInitials(item.username),
        time: timeAgo(item.timestamp),
        
        // Random data (for testing)
        comments: Math.floor(Math.random() * 50), 
        likes: Math.floor(Math.random() * 500)
    }));
</script>

<main class="w-full max-w-7xl mx-auto p-4 flex flex-col gap-8 min-h-screen">
    <section class="w-full">

        <!-- Card -->
        {#each Posts as post}
            <Card.Root class="border-0 shadow-none bg-transparent mb-8">
                <Card.Content class="px-6">
                    <div class="bg-card border-2 border-border card-shadow">
                        <div class="flex flex-col md:flex-row md:h-82"> 
                            <div class="w-full md:w-auto h-full aspect-square shrink-0 border-b-2 md:border-b-0 md:border-r-2 border-border">
                                
                                <!-- IG post image -->
                                <div class="relative w-full h-full group">
                                    <img 
                                        src={post.image} 
                                        alt="Post de {post.author}" 
                                        referrerpolicy="no-referrer"
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