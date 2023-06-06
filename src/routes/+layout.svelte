<script>
    import '../app.scss'
    import '../normalize.css'
    import { page } from '$app/stores'

    $: showNav = () => {
        let currentPage = $page.url.pathname
        if (currentPage.startsWith("/user")) return false
        if (currentPage.startsWith("/profile")) return false
        return true
    }

</script>

{#if showNav()}
<header>
    <nav>
        <h1>Profile Maker</h1>
        {#if !$page.url.pathname.startsWith('/login')}
            {#if $page.data.session}
            <a class="login" href="user/edit">Manage Profile</a>
            {:else}
            <a class="login" href="/login">Login</a>
            {/if}
        {/if}
    </nav>
</header>
{/if}

<slot/>

<style>
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
</style>
