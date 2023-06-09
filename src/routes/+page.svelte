<script>
    import image from '$lib/assets/undraw_programming_re_kg9v.svg';
</script>

<svelte:head>
    <title>Profile Maker</title>
</svelte:head>

<main>
    <div class="page-hero">
        <div class="page-image">
            <img src={image} alt="profile">
        </div>
        <div>
            <h2>Showcase Your Skills</h2>
            <p class="lg-p">Profile Maker is an easy place to display your coding projects.</p>
            <p class="lg-p">Free to use an open source, log in with your github to get started.</p>
            <p class="footer">Built By <a href="https://www.github.com/rnba12"> Russell Ampomah</a></p>
        </div>
    </div>     
</main>
    

<style lang="scss">
    .page-hero {
        margin: 4rem;
        display: grid;
        grid-template-columns: auto auto;
        gap: 1rem;

        .lg-p {
            font-size: 1.3rem;
        }
        .footer a {
            color: #006cdf;
            text-decoration: none;
            &:hover {
                color: rgb(105, 105, 105);
            }
            transition: all 0.1s;
        }
    }
    .page-image {
        max-width: 500px;
    }
    img {
        max-width: 100%;
        height: auto;
    }
    @media (max-width: 600px) {
        .page-image {
            max-width: 250px;
            height: auto;
        }
        .page-hero {
            grid-template-columns: 1fr;
        }
        

    }
</style>
