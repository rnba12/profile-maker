<script>
    import placeholder from '$lib/assets/placeholder.jpg';
    import Links from './Links.svelte';
    export let name;
    export let image = placeholder;
    export let tagline;
    export let links;

</script>

<div class="hero">
        <img class="hero-image" src={image} alt="profile pic">
        <h1 class="hero-name">{name}</h1>
        <h3 class="hero-about">{tagline}</h3>
        {#if links}
            <Links {links}/>
        {/if}
</div>

<style>
    .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    h1 {
        font-size: 4rem;
        line-height: 0;
    }
    img {
        width: 80px;
        height: 80px;
    }
</style>
