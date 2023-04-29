<script>
    import { signIn } from '@auth/sveltekit/client'
    export let provider;
    export let displayText;
    export let icon;
</script>

<button on:click={() => signIn(provider, {callbackUrl: '/user/edit'})}>
    <img src={icon} alt="icon">
    Continue With {displayText}
</button>

<style>
    button {
        @apply
            flex justify-center items-center
            gap-2
            border-none
            bg-black text-white
            rounded-md
            px-4 py-2
            text-lg
            cursor-pointer;  
    }
</style>
