<script>
    import imagePlaceholder from '$lib/assets/imagePlaceholder.jpg';
</script>

<svelte:head>
    <title>Profile Maker</title>
</svelte:head>



<main>
    <div class="page-hero">
        <div>
            <h2>Showcase Your Skills</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis fugiat consequatur magnam expedita hic, excepturi architecto eos adipisci? Illo amet debitis vel enim? </p>
        </div>
        <div>
            <img src={imagePlaceholder} alt="profile">
        </div>
    </div>     
</main>
<footer>
    Created By Russell Ampomah
    <a href="https://www.github.com/rnba12"><iconify-icon icon="mdi:github"></iconify-icon></a>
</footer>

<style lang="scss">
    .page-hero {
        margin-top: 2rem;
        padding: 0 2rem;
        margin: auto;
        display: grid;
        grid-template-columns: 1fr 1fr;

        p {
            font-size: 1.4rem;
            font-weight: 500;
        }
    }
</style>
