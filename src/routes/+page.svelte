<script>
    import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
    import SignInButton from '../lib/components/SignInButton.svelte';
    import githubLogo from '../lib/assets/mark-github.svg'
    import stock from '$lib/assets/stock.jpg';

</script>


<main class="grid grid-cols-2">
    <img class="grid-left object-cover h-screen" src={stock} alt="code">
    <div class="grid-right p-8">
        <h1 class="text-5xl font-bold">Profile Maker</h1>
        <p class="text-xl">Showcase Your Skills</p>
        <div class="login-box px-5 pb-8 mt-6 bg-white border-solid border border-gray-200 rounded-2xl">
            <h2 class="text-3xl/loose font-bold">Sign In</h2>
            <SignInButton provider="github" displayText="GitHub" icon={githubLogo}/>
        </div>
    </div>
</main>

<style>
    .grid-left {
        width: 50vw;
    }
</style>
