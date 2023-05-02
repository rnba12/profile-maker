<script>
    import { signIn } from '@auth/sveltekit/client'
    export let provider;
    export let displayText;
    export let icon;
</script>

<button 
    class="flex justify-center items-center gap-2
    border-none bg-black rounded-md px-4 py-2 
    text-white text-lg
    cursor-pointer"  
    on:click={() => signIn(provider, {callbackUrl: '/user/edit'})}
>
    <img src={icon} alt="icon">
    Continue With {displayText}
</button>

