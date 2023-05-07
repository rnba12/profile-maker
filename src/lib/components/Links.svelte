<script>
    

    export let links;
</script>

<div class="links"
>
    {#each Object.entries(links) as [icon, url]}
        <a href={url}><img width="30px" height="30px" src={`https://cdn.simpleicons.org/${icon}/black`} alt={icon}></a>
    {/each}
</div>

<style>
    .links {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }
</style>
