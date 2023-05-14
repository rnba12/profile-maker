<script>
    import mailIcon from '$lib/assets/icons/email.svg'

    export let links;
    export let email;
</script>

<div class="links"
>
    {#each Object.entries(links) as [icon, url]}
        {#if url}
            <a href={url}><img src={`https://cdn.simpleicons.org/${icon}/black`} alt={icon}></a>
        {/if}
    {/each}
    <a href="mailto:{email}"><img src={mailIcon} alt=""></a>
</div>

<style>
    .links {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    img {
        width: 1.5rem;
        height: 1.5rem;
    }
</style>
