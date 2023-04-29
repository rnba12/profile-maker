<script>
    export let title;
    export let url = null;
    export let description;
    export let technologies;
</script>

<div class="project">
    {#if url}
        <a href="url">{title}</a>
    {:else}
        <h2>{title}</h2>
    {/if}
    <p>{description}</p>
    {#each technologies as tech}
        <span class="tech">
            {tech}
        </span>
    {/each}
</div>
