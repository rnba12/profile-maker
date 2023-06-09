<script>
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";

</script>

<svelte:head>
    <title>Welcome | Profile Maker</title>
</svelte:head>

<main>
        <h1>Welcome</h1>
    
        <p>Choose a link name to create your profile:</p>
        
        <form method="POST" use:enhance>
            <div class="field">
                <input aria-label="Link Name" type="text" name="linkName" required minlength="3" maxlength="20">
            </div>
            <button class="submit-btn">Create My Profile</button>
        </form>
        {#if $page.form?.error}
            <p class="warning">{$page.form?.message}</p>
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
        font-size: 1.5rem;
    }
    .field input {
        padding-left: 0.5rem;
        font-size: 1.2rem;
    }
    button {
        /* padding: 0.8rem; */
        font-size: 1.2rem;
    }
    .warning {
        color: red;
    }
</style>
