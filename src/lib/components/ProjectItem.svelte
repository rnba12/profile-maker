<script>
    export let title;
    export let url = null;
    export let description;
    export let technologies;
</script>

<div class="project border border-solid border-gray-200 rounded-2xl">
    {#if url}
        <a href="url">{title}</a>
    {:else}
        <h2 class="text-xl font-bold">{title}</h2>
    {/if}
    <p>{description}</p>
    {#each technologies as tech}
        <span class="tech border border-slate-200 rounded-full p-1">
            {tech}
        </span>
    {/each}
</div>
