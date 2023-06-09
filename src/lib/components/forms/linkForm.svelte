<script>
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';

    export let links;
    let initialLinks = {...links};
    let addForm;
    let submitBtn;
    let cancelBtn;

    const addLink = (e, name) => {
        links[name] = e.target.newLink.value
        addForm.reset()
        addForm.hidden = true
        checkChange()
    }

    const deleteLink = (name) => {
        links[name] = ""
        checkChange()
    }

    const discardChange = () => {
        addForm.reset()
        addForm.hidden = true
        links = {...initialLinks}
        checkChange()
    }

    // Might be a faster/more efficient way to implement this
    const checkChange = () => {
        if (JSON.stringify(initialLinks) !== JSON.stringify(links)) {
            submitBtn.disabled = false
            cancelBtn.disabled = false
        } else {
            submitBtn.disabled = true
            cancelBtn.disabled = true
        }
    }

    async function handleUpdate() {
        return async({ result }) => {
            if (result.type === "success") {
                await invalidateAll()
                initialLinks = {...links}
                checkChange()
                await applyAction(result)
            } if (result.type === "failure") {
                await applyAction(result)
            }
        }
    }

</script>

<div class="links-form">
    <p>Add Links to display in your bio.</p>
    <button class="btn add-link-btn" on:click={() => addForm.hidden = false}>Add</button>
    {#each Object.entries(links) as [name, url]}
        {#if url}
            <div class="link">
                <img src={`https://cdn.simpleicons.org/${name.replaceAll(" ", "")}`} alt={name}>
                <div class="field">
                    <label for={`${name}-url`}>{name}</label>
                    <input type="url" name={`${name}-url`} bind:value={links[name]} on:input={checkChange}>
                </div>
                <button class="x-btn" on:click={() => deleteLink(name)}><iconify-icon icon="ph:x"></iconify-icon></button>
            </div>
        {/if}
    {/each}

    <form bind:this={addForm} hidden on:submit|preventDefault={(e) => addLink(e, addForm.platform.value)}>
        <div class="link">
            <div class="field select">
                <label for="platform">Platform</label>
                <select name="platform" required>
                    {#each Object.entries(links) as [name, url]}
                        {#if !url}
                            <option value={name}>{name}</option>
                        {/if}
                    {/each}
                </select>
            </div>
            <div class="field">
                <label for="new-link">URL<iconify-icon icon="material-symbols:link"></iconify-icon></label>
                <input type="url" name="newLink" required>
            </div>
            <button class="submit-btn">Add</button>
            <button class="cancel-btn" type="reset" on:click={() => addForm.hidden = true}>Discard</button>
        </div>
    </form>

    <form class="buttons" method="post" action="?/updateLinks" use:enhance={handleUpdate}>
        <input type="text" name="links" value={JSON.stringify(links)} hidden>
        <button class="submit-btn" bind:this={submitBtn} disabled>Update</button>
        <button type="button" class="cancel-btn" on:click={discardChange} bind:this={cancelBtn} disabled>Cancel</button>
    </form>

</div>

<style lang="scss">
    .link {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 0.4rem;
        img {
            display: inline;
            height: 30px;
            width: auto;
        }
        .field {   
            width: 100%;
            input {
                padding: 0.2em 0;
            }
        }
        .x-btn {
            font-size: 2em;
        }
    }
    .add-link-btn {
        margin-bottom: 1em;
    }
    .field {
        &.select {
            width: min-content;
        }
    } 
    select {
        border: none;
        padding: 0.1em;
    }
    .buttons {
        margin-top: 1em;
    }
</style>
