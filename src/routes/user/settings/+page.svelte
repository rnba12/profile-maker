<script>
    import { page } from '$app/stores';
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import Module from '$lib/components/Module.svelte';

    $: linkName = $page.data.profile.linkName;

    async function handleUpdate() {
        return async({ result, update}) => {
            if (result.type === "success") {
                invalidateAll()
                await applyAction(result)
            } if (result.type === "failure") {
                await applyAction(result)
            }
            update()
        }
    }

</script>

<div class="settings-page">
    <h1>Settings</h1>
    
    <Module header="Change Profile Link">
        <form method="post" action="?/editLink" use:enhance={handleUpdate}>
            <label for="linkName">Link Name</label>
            <input type="text" name="linkName" value={linkName}>
            <button>Update</button>
            {#if $page.form}
                <p class:error={$page.form.error} class:success={$page.form.success}>{$page.form.message}</p>
            {/if}
        </form>
    </Module>
    
    <Module header="Delete Account">
        <form method="post" action="?/deleteAccount">
            <button class="delete" type="submit">Delete Account</button>
            <p>Warning: This action is irreversible. Only proceed if you are confident you want to delete your account</p>
        </form>
    </Module>
</div>

<style>
    .settings-page {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    h1 {
        font-size: 3rem;
        line-height: 0;
    }
    .error {
        color: red;
    }
    .success {
        color: green;
    }
    .delete {
        color: red;
    }
</style>
