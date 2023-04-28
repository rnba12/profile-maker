<script>
    import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
    import SignInButton from '../lib/SignInButton.svelte';
    import githubLogo from '../lib/assets/mark-github.svg'

</script>


<main>
    <h1>Profile Maker</h1>
    <p>Showcase Your Skills</p>
    <div class="sign-in">
        <h2>Sign In</h2>
        <SignInButton provider="github" displayText="GitHub" icon={githubLogo}/>
    </div>
</main>

<style>
    main {
        padding: 30px;
    }
    .sign-in {
        padding: 20px;
        border: 1px solid grey;
        border-radius: 10px;
        width: 300px;
        height: 300px;
    }

</style>
