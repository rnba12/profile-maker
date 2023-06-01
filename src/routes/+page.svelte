<script>
    import githubLogo from '$lib/assets/mark-github.svg'
    import imagePlaceholder from '$lib/assets/imagePlaceholder.jpg';
    export let data;
</script>

<svelte:head>
    <title>Profile Maker</title>
</svelte:head>

<header>
    <nav>
        <h1>Profile Maker</h1>
        {#if data.session}
            <a class="login" href="user/edit">Manage Profile</a>
        {:else}
            <a class="login" href="/login">Login</a>
        {/if}
    </nav>

</header>

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
    <a href="https://www.github.com/rnba12"><img src={githubLogo} alt="github"></a>
</footer>

<style lang="scss">
    header {
        width: 100%;
    }
    nav {
        width: 90%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .login {
        font-size: 1.3rem;
        font-weight: 600;
        text-decoration: none;
        padding: 0.3em 0.9em;
        border-radius: 10px;
        color: white;
        background-color: black;
    }
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
