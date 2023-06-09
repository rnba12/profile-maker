<script>
    import Links from './Links.svelte';
    export let name;
    export let image = placeholder;
    export let tagline;
    export let links;
</script>

<div class="hero">
    <img class="hero-image" src={image} alt="profile pic">
    <div class="header">
        <div class="name">{name}</div>
        {#if tagline}
            <div class="tagline">{tagline}</div>
        {/if}
    </div>
    {#if links}
        <Links {...links}/>
    {/if}
</div>

<style lang="scss">
    .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            border-radius: 56px;
            width: 100px;
            height: 100px
        }
    }
    .header {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 0.5rem;
        margin-bottom: 1.4rem;

    }
    .name {
        font-size: 1.3rem;
        font-weight: 500;
        text-align: center;
        // line-height: 0;
    }
    .tagline {
        text-align: center;
        font-size: 1.2rem;
    }
</style>
