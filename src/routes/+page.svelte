<script>
    import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
    import SignInButton from '$lib/components/SignInButton.svelte';
    import githubLogo from '$lib/assets/mark-github.svg'
    import stock from '$lib/assets/stock.jpg';

</script>

<svelte:head>
    <title>Login | Profile-Maker</title>
</svelte:head>

<main>
    <img class="grid-left" src={stock} alt="code">
    <div class="grid-right">
        <h1>Profile Maker</h1>
        <p>Showcase Your Skills</p>
        <div class="login-box">
            <h2>Sign In</h2>
            <SignInButton provider="github" displayText="GitHub" icon={githubLogo}/>
        </div>
    </div>
</main>

<style lang="scss">
    main {
        font-size: 1.6rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 100%;
    }
    .grid-left {
        width: 100%;
        height: 100vh;
    }
    .grid-right {
        display: flex;
        flex-direction: column;
        align-items: center;

        .login-box {
            h2 {
                font-size: 1.4rem;
            }
            padding: 1.5rem;
            border: 1px solid rgb(196, 196, 196);
            border-radius: 5px;
            min-height: 10rem;
        }
    }
</style>
