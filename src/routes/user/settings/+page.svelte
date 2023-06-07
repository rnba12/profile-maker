<script>
    import { page } from '$app/stores';
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import Module from '$lib/components/Module.svelte';
    import Modal from '../../../lib/components/Modal.svelte';

    $: linkName = $page.data.profile.linkName;

    let showModal;
    let closeModal;
    let submitBtn;

    const checkChange = (e) => {
        if (linkName !== e.target.value) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true
        }
    }

    async function handleUpdate() {
        return async({ result }) => {
            if (result.type === "success") {
                await invalidateAll()
                await applyAction(result)
            } if (result.type === "failure") {
                await applyAction(result)
            }
        }
    }

</script>

<svelte:head>
    <title>Settings | Profile Maker</title>
</svelte:head>

<div class="settings-page">
    <h1>Settings</h1>
    
    <Module header="Change Profile Link">
        <form method="post" action="?/editLink" use:enhance={handleUpdate}>
            <div class="field">
                <label for="linkName">Link Name <iconify-icon icon="material-symbols:link"></iconify-icon></label>
                <input type="text" name="linkName" value={linkName} on:input={checkChange}>
            </div>
            <button class="submit-btn" bind:this={submitBtn} disabled>Update</button>
        </form>
    </Module>
    
    <Module header="Delete Account">
        <p>Delete Profile Maker Account</p>
        <button class="btn delete-account-btn" on:click={() => showModal = true}>Delete</button>
    </Module>
</div>

{#if showModal}
    <Modal bind:showModal bind:close={closeModal}>
        <p>Warning: This action is irreversible. Only proceed if you are confident you want to delete your account</p>
        <p>Are you sure you want to delete your Account?</p>
        <form method="post" action="?/deleteAccount">
            <button class="btn delete-account-btn" type="submit">Delete Account</button>
            <button class="cancel-btn" type="button" on:click={closeModal}>Cancel</button>
        </form>
    </Modal>   
{/if}


<style lang="scss">
    .settings-page {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    h1 {
        font-size: 3rem;
        line-height: 0;
    }
    .delete-account-btn {
        border: none;
        background-color: red;
        color: white;
        &:hover {
            background-color: lighten($color: red, $amount: 10);
        }
        &:active {
            background-color: lighten($color: red, $amount: 15);

        }
}
</style>
