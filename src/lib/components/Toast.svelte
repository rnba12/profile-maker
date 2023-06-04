<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { fade } from "svelte/transition";

	let dispatch = createEventDispatcher()
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
<div class="toast-wrapper">
    <div class="toast" class:fail={!success} transition:fade>
        <p>{message}</p>
        <button on:click={handleClose}>&#x2715;</button>
    </div>
</div>
{/if}

<style lang="scss">
    .fail {
        background-color: rgb(228, 160, 160) !important;
    }
    .toast-wrapper {
        z-index: 1;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: auto;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .toast {
        font-weight: 600;
        font-size: 1.1rem;
        position: relative;
        z-index: 2;
        min-width: 400px;
        background-color: greenyellow;
        // border: 1px solid green;
        border-radius: 10px;
        display: grid;
        grid-template-columns: 80% 20%;
        text-align: center;
        button {
            background-color: inherit;
            border: none;
            border-radius: inherit;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            // border-left: 1px solid green;
        }
    }
</style>
