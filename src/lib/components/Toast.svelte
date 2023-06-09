<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    export let message;
    export let success = true;

    const handleClose = () => {
        message = null
    }

    onMount(() => {
        const autoClose = setTimeout(() => message = null, 3000)
    })

</script>

{#if message}    
    <div class="toast" class:fail={!success} transition:fade>
        <p><iconify-icon icon="material-symbols:info-outline"></iconify-icon>{message}</p>
        <button class="x-btn" on:click={handleClose}><iconify-icon icon="ph:x"></iconify-icon></button>
    </div>
{/if}

<style lang="scss">
    .fail {
        background-color: rgb(228, 160, 160) !important;
        border-color: rgb(186, 134, 134) !important;
    }

    .toast {
        position: fixed;
        bottom: 4rem;
        left: 0;
        right: 0;
        z-index: 999;
        font-weight: 500;
        width: 400px;
        background-color: rgb(168, 250, 141);
        border: 2px solid rgb(151, 223, 126);
        margin: auto;
        border-radius: 8px;
        display: grid;
        grid-template-columns: 80% 20%;
        
        button {
            display: inline-flex;
            align-items: center;
            background-color: inherit;
            font-size: 1.3em;
            width: min-content;
        }
        p {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }
    }
</style>
