<script>
    export let links;
    export let email;
</script>

<div class="links"
>
    {#each Object.entries(links) as [icon, url]}
        {#if url}
            <a href={url}><iconify-icon icon="simple-icons:{icon.toLowerCase()}"></iconify-icon></a>
        {/if}
    {/each}
    <a href="mailto:{email}"><iconify-icon icon="fa-solid:envelope"></iconify-icon></a>
</div>

<style>
    .links {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }
    a {
        font-size: 1.5rem;
        color: black;
    }
</style>
