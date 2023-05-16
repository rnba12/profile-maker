<script>
    import { enhance, applyAction } from "$app/forms";
    import { invalidateAll} from '$app/navigation';
    import { page } from "$app/stores";


	
	
</script>

<svelte:head>
    <title>Welcome | Profile Maker</title>
</svelte:head>

<main>
        <h1>Welcome</h1>
    
        <p>Choose a link name to create your profile:</p>
        
        <form method="POST">
            <input type="text" name="linkName" required maxlength="50">
            <button>Create My Profile</button>
        </form>
        {#if $page.form?.error}
            <p class="warning">Name is not available</p>
        {/if}
</main>

<style>
    main {
        width: 80%;
        margin: auto;
        margin-top: 8rem;
    }
    h1 {
        font-size: 3rem;
        line-height: 0;
    }
    p {
        font-size: 1.8rem;
    }
    input {
        padding: 0.8rem;
        font-size: 1.3rem;
    }
    button {
        padding: 0.8rem;
        font-size: 1.3rem;
    }
    .warning {
        color: red;
    }
</style>
