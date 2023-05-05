<script>
    import Typeahead from "svelte-typeahead"
    import { createEventDispatcher } from "svelte";

    export let title;
    export let url = "";
    export let description;
    export let stack;

    // edit stuff
    let dispatch = createEventDispatcher()
    let edit = false;
    export let profileStack = null;
    
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

{#if !edit}
<div class="project">
        <button class="{!profileStack ? "hidden": ""}" on:click={handleEdit}>Edit</button>
        <button class="{!profileStack ? "hidden": ""}" on:click={handleDelete}>Delete</button>
         <h2>{title}</h2>
        <p>{description}</p>
        {#each stack as tech}
            <span class="tech">
                {tech}
            </span>
        {/each}
        {#if url}
            <a href={url} target="_blank"><img src="" alt="link"></a>
        {/if}
    </div>
{:else}
    <form on:submit|preventDefault={handleUpdate}>
        <input type="text" name="title" value={title} required maxlength="100">
        <input type="url" name="url" value={url}>
        <textarea name="description" value={description} maxlength="300"></textarea>
        {#each editStack as name}
            <button type="button" on:click={stackDelete}>{name}</button>
        {/each}
        <Typeahead label="Add Tech" hideLabel inputAfterSelect="clear" limit="5" filter={(t) => editStack.includes(t)} placeholder="Add" data={profileStack} extract={item => item} on:select={({ detail }) => stackAdd(detail.selected)}/>
        <button>✔</button>
        <button type="button" on:click={() => edit = false}>✖</button>
    </form>
{/if}

<style>
    .hidden {
        display: none;
    }
</style>
