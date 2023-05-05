<script>
    

    export let links;
</script>

<div class="links"
>
    {#each Object.entries(links) as [icon, url]}
        <a href={url}><img width="20px" height="20px" src={`https://cdn.simpleicons.org/${icon}`} alt={icon}></a>
    {/each}
</div>
