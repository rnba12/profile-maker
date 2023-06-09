<script>
    import '../app.scss'
    import '../normalize.css'
    import { page } from '$app/stores'
    import { signIn } from '@auth/sveltekit/client'

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
        <a class="logo" href="/">
            <h2>Profile Maker</h2>
        </a>
        {#if !$page.url.pathname.startsWith('/login')}
            {#if $page.data.session}
            <a class="btn login" href="user/edit">Edit Profile</a>
            {:else}
            <button class="login btn" on:click={() => signIn("github", {callbackUrl: '/user/edit'})}><iconify-icon icon="mdi:github"></iconify-icon> Log in</button>
            {/if}
        {/if}
    </nav>
</header>
{/if}

<slot/>

<style>
     header {
        width: 100%;
        border-bottom: 1px solid rgb(200, 200, 200);
    }
    .logo {
        color: black;
        text-decoration: none;
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
        font-weight: 500;
        text-decoration: none;
        padding: 0.3em 0.9em;
        border-radius: 10px;
        color: black;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 5px;
    }
</style>
