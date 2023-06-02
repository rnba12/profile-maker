<script>
    import stackOptions from '$lib/stackOptions'
    import { createEventDispatcher } from 'svelte';
    import { enhance } from '$app/forms'
    import Modal from "./Modal.svelte";
    import Typeahead from "svelte-typeahead"

    const dispatch = createEventDispatcher()

    export let project;
    export let action;

    let showModal = true
    let closeModal

    const stackAdd = (name) => {
        project.stack = [...project.stack, name]
    }

    const stackDelete = (name) => {
        project.stack = project.stack.filter(t => t !== name)
    }

    const handleAdd = () => {

    }

    const handleDiscard = () => {
        dispatch("closeForm")
    }
    
</script>

<Modal bind:showModal bind:close={closeModal} on:exit={handleDiscard}>

    
    <form method="POST" action={action} use:enhance={() => {
        // Before submission
        return async ({ result, update }) => {
            if (result.type === "success") {
                
            }
            update();
            handleDiscard()
        };
    }}
    >
    {#if action === "?/update"}
        <button formaction="?/delete&id={project.id}">Delete</button>
    {/if}
    {#if action === "?/update"}
        <input type="text" name="id" hidden value={project.id}>
    {/if}
        <div class="inputs">
            <div class="text">
                <label for="title">Title</label>
                <input bind:value={project.title} type="text" name="title" required maxlength="100" />
                <label for="url">Link</label>
                <input bind:value={project.url} type="url" name="url" />
                <label for="description">Description</label>
                <textarea bind:value={project.description} name="description" maxlength="150" />
            </div>
            <div class="stack">
                <Typeahead
                    label="Tech Stack" inputAfterSelect="clear" limit="5" filter={(t) => project.stack.includes(t)} placeholder="Add" data={stackOptions} extract={(item) => item}
                    on:select={({ detail }) => stackAdd(detail.selected)}
                />
                {#each project.stack as name}
                    <button class="stack-item" type="button" on:click={() => stackDelete(name)}>{name} &#x2715;</button>
                {/each}
                <input hidden name="stack" type="text" bind:value={project.stack} />
            </div>
        </div>
        <button>Add</button>
        <button type="button" on:click={handleDiscard}>Discard</button>
    </form>
</Modal>

<style lang="scss">

    .inputs {
        margin-bottom: 0.2rem;
    }

    input,
    textarea {
        width: 100%;
        padding: 0.2rem;
    }

    label {
        font-weight: 500;
    }

    
    .stack-item {
        border: 1px solid rgb(204, 204, 204);
        border-radius: 36px;
        margin: 2px;
    }
    button {
        border: none;
    }
</style>
