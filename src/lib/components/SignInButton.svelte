<script>
    import { signIn } from '@auth/sveltekit/client'
    export let provider;
    export let displayText;
    export let icon;
</script>

<button   
    on:click={() => signIn(provider, {callbackUrl: '/user/edit'})}
>
    <img src={icon} alt="icon">
    Continue With {displayText}
</button>

<style lang="scss">
    button {
        font-size: 1.4rem;
        background-color: black;
        color: white;
        border: none;
        border-radius: $border-radius;
        padding: 0.5em;
        display: inline-flex;
        align-items: center;
        gap: 0.5em;
        cursor: pointer;
        &:hover {
            background-color: rgb(26, 26, 26);
        }
    }
</style>
