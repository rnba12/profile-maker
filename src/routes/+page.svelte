<script>
    import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
    import SignInButton from '../lib/compnents/SignInButton.svelte';
    import githubLogo from '../lib/assets/mark-github.svg'
    import stock from '$lib/assets/stock.jpg';

</script>


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
    main {
        @apply grid grid-cols-2;
    }
    .grid-left {
        object-fit: cover;
        width: 50vw;
        height: 100vh;
    }
    .grid-right {
        @apply px-8;
    }
    .login-box {
        @apply
            bg-white 
            rounded-md
            border-solid
            border-gray-100
            shadow-lg
            px-5 pb-8
            mt-6
            ;
    }
</style>
