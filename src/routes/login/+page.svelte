<script>
    import SignInButton from "$lib/components/SignInButton.svelte";
    import githubLogo from '$lib/assets/mark-github.svg'

</script>

<svelte:head>
    <title>Login | Profile Maker</title>
</svelte:head>

<h1>Profile Maker</h1>

<div class="login-box">
    <SignInButton provider="github" displayText="GitHub" icon={githubLogo}/>
</div>
