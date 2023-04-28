<script>
    import { signIn } from '@auth/sveltekit/client'
    export let provider;
    export let displayText;
    export let icon;
</script>

<button on:click={() => signIn(provider)}>
    <img src={icon} alt="icon">
    Sign In With {displayText}
</button>
