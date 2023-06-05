<script>
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';

    export let links;
    let initialLinks = {...links};
    let addForm;
    let submitBtn;

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

    // Might be a faster/more efficient way to implement this
    const checkChange = () => {
        if (JSON.stringify(initialLinks) !== JSON.stringify(links)) {
            submitBtn.disabled = false
        } else {
            submitBtn.disabled = true
        }
    }

    async function handleUpdate() {
        return async({ result }) => {
            if (result.type === "success") {
                await invalidateAll()
                initialLinks = {...links}
                submitBtn.disabled = true
                await applyAction(result)
            } if (result.type === "failure") {
                await applyAction(result)
            }
        }
    }

</script>

<div class="links-form">
    <button on:click={() => addForm.hidden = false}>Add</button>
    {#each Object.entries(links) as [name, url]}
        {#if url}
            <div class="link">
                <img src={`https://cdn.simpleicons.org/${name.replaceAll(" ", "")}`} alt={name}>
                <div class="field">
                    <label for={`${name}-url`}>{name}</label>
                    <input type="url" name={`${name}-url`} bind:value={links[name]} on:input={checkChange}>
                </div>
                <button class="delete" on:click={() => deleteLink(name)}>&#x2715;</button>
            </div>
        {/if}
    {/each}

    <form bind:this={addForm} hidden on:submit|preventDefault={(e) => addLink(e, addForm.platform.value)}>
        <div class="link">
            <select name="platform" id="">
                {#each Object.entries(links) as [name, url]}
                    {#if !url}
                        <option value={name}>{name}</option>
                    {/if}
                {/each}
            </select>
            <div class="field">
                <label for="new-link">URL<iconify-icon icon="material-symbols:link"></iconify-icon></label>
                <input type="url" name="newLink" required>
            </div>
            <button class="update">Add</button>
            <button class="delete" type="button" on:click={() => addForm.hidden = true}>Discard</button>
        </div>
    </form>

    <form method="post" action="?/updateLinks" use:enhance={handleUpdate}>
        <input type="text" name="links" value={JSON.stringify(links)} hidden>
        <button bind:this={submitBtn} class="update" disabled>Update</button>
    </form>

</div>

<style lang="scss">
    .link {
        display: flex;
        align-items: center;
        padding: 0.3rem;
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
    }
    .update {
        font-size: 1em;
        padding: 0.5rem 0.7rem;
        background-color: black;
        color: white;
        border: none;
        transition: all 0.2s;
        &:disabled {
            cursor: default;
            background-color:inherit;
        }
    }
    .delete {
        font-size: 1.2em;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 2px;
        transition: all 0.1s;
        border: none;
        // height: fit-content;
        &:hover {
            color: red;
        }
    }
</style>
