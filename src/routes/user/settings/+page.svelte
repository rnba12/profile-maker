<script>
    import { page } from '$app/stores';
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';

    $: linkName = $page.data.profile.linkName;

    async function handleUpdate() {
        return async({ result, update}) => {
            if (result.type === "success") {
                invalidateAll()
                await applyAction(result)
                console.log($page)
            } if (result.type === "failure") {
                await applyAction(result)
            }
            update()
        }
    }

    async function handleDelete() {
        console.log("Delete Account")
    }

</script>

<h1>Settings</h1>

<form method="post" action="?/editLink&id={$page.data.profile.id}" use:enhance={handleUpdate}>
    {#if $page.form}
        {$page.form.message}
    {/if}
    <label for="linkName">Link Name</label>
    <input type="text" name="linkName" value={linkName}>
    <button>Update</button>
</form>

<form method="post" action="?/deleteAccount">
    <button type="submit" on:click={handleDelete}>Delete Account</button>
</form>
