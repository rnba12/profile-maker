<script>
    import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
    import SignInButton from '../lib/components/SignInButton.svelte';
    import githubLogo from '../lib/assets/mark-github.svg'
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

<style>
    .grid-left {
        width: 50vw;
    }
</style>
