<script lang="ts">
  import categoriesJSON from "$lib/assets/users.json";
  import * as ToggleGroup from "$lib/components/ui/toggle-group";

  const categories = Object.keys(categoriesJSON);

  let { setCategory } = $props();
</script>

<ToggleGroup.Root
  type="single"
  variant="outline"
  spacing={2}
  onValueChange={(value) => setCategory(value)}
>
  {#each categories as category}
    <ToggleGroup.Item
      value={category.toLowerCase()}
      class="data-[state=on]:bg-primary data-[state=on]:text-background text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium"
    >
      {category}
    </ToggleGroup.Item>
  {/each}
</ToggleGroup.Root>
