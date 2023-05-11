<script>
    import Typeahead from "svelte-typeahead"
    import { createEventDispatcher } from "svelte";
    import { enhance } from "$app/forms";

    export let id = null;
    export let title;
    export let url = "";
    export let description;
    export let stack;

    // edit stuff
    let dispatch = createEventDispatcher()
    let edit = false;
    export let stackOptions = null;
    
    let editStack = null;

    const handleEdit = () => {
        edit = true
        editStack = [...stack]
        
    }

    const stackAdd = (name) => {
        editStack = [...editStack, name]
    }

    const stackDelete = (e) => {
        editStack = editStack.filter(t => t !== e.target.innerHTML)
    }

    const handleUpdate = (e) => {
        const updated = {
            title: e.target.title.value,
            url: e.target.url.value,
            description: e.target.description.value,
            stack: [...editStack]
        }
        dispatch("update", {prevTitle: title, updated})
        edit = false
    }

    const handleDelete = () => {
        dispatch('delete')
    }

</script>

<div class="project">
    {#if !edit}
        {#if url}
            <a class="link" href={url} target="_blank">
                link
            </a>
        {/if}
        <button class:hidden={!stackOptions} on:click={handleEdit}>Edit</button>
         <h2>{title}</h2>
        <p>{description}</p>
        {#each stack as name}
            <img src={`https://cdn.simpleicons.org/${name.replaceAll(" ", "")}`} alt="">
        {/each}
        <br>
        {:else}
        <form method="POST" action="?/update">
        <button formaction="?/delete">Delete</button>

            <input type="text" name="id" hidden value={id}>
            <input type="text" name="title" value={title} required maxlength="100">

            <input type="url" name="url" value={url}>
            <input type="text" name="stack" hidden bind:value={editStack}>
            <textarea name="description" value={description} maxlength="300"></textarea>

            {#each editStack as name}
            <button type="button" on:click={stackDelete}>{name}</button>
            {/each}

            <Typeahead 
                label="Add" inputAfterSelect="clear" limit="5" 
                filter={(t) => editStack.includes(t)} data={stackOptions} extract={item => item} on:select={({ detail }) => stackAdd(detail.selected)}
            />
                <button>Update</button>
                <button type="button" on:click={() => edit = false}>Cancel</button>
            </form>
            {/if}
        </div>

<style lang="scss">
    .hidden {
        display: none;
    }
    .project {
        background-color: white;
        border: 1px solid $border-light;
        border-radius: $border-radius;
        padding: 1rem;
        min-height: 17rem;
        img {
            width: 1.5em;
            height: 1.5em;
        }
    }

    .link {
        color: black;
        height: 1em;
        width: 1em;
    }

    button {
        border: none;
    }

</style>
