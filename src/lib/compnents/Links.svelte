<script>
    import iconLookup from '$lib/icons.js'

    export let links;
    console.log(links)
</script>

<div class="links flex items-center justify-center gap-2 
            bg-white
            border-solid border-gray-200
            p-2 rounded-xl
            w-fit"
>
    {#each Object.entries(links) as [icon, url]}
        <a href={url}><img width="20px" height="20px" src={iconLookup[icon]} alt={icon}></a>
    {/each}
</div>
