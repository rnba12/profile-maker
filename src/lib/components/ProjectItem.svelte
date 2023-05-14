<script>
    import Typeahead from "svelte-typeahead";
    import { enhance } from "$app/forms";
    import link from '$lib/assets/icons/link.svg';

    export let id = null;
    export let profileId = null;
    export let title;
    export let url = "";
    export let description;
    export let stack;


    // edit stuff
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

    const stackDelete = (name) => {
        editStack = editStack.filter(t => t !== name)
    }

    const handleUpdate = () => {
            // Before submission
            return async ({result, update }) => {
                if( result.type === "success") {
                    edit = false
                }
                update()
            }
        }

</script>

<div class="project" class:left={stackOptions}>
    {#if !edit}
    <form class="buttons" class:hidden={!stackOptions} action="?/delete&id={id}" method="POST" use:enhance>
        <button type="button" on:click={handleEdit}>Edit</button>
        <button>Delete</button>
    </form>
    <div class="header" class:header-left={stackOptions}>
        <div class="title">{title}</div>
        {#if url}
        <a class="link" class:hidden={stackOptions} href={url} target="_blank">
            <img src={link} alt="">
        </a>
        {/if}
    </div>
        <p>{description}</p>
        {#each stack as name}
            <img class="icon" src={`https://cdn.simpleicons.org/${name.replaceAll(" ", "")}`} alt="">
        {/each}
        <br>
        {:else}
        <form method="POST" action="?/update" use:enhance={handleUpdate}>

            <div class="inputs">
                <input type="text" name="id" hidden value={id}>
                <input type="text" name="id" hidden value={profileId}>
                <label for="title">Title</label>
                <input type="text" name="title" value={title} required maxlength="100">
                <label for="url">Link</label>
                <input type="url" name="url" value={url}>
                <input type="text" name="stack" hidden bind:value={editStack}>
                <label for="description">Description</label>
                <textarea name="description" value={description} maxlength="150"></textarea>
                
                <Typeahead
                label="Tech Stack" inputAfterSelect="clear" limit="5"
                filter={(t) => editStack.includes(t)} data={stackOptions} extract={item => item} on:select={({ detail }) => stackAdd(detail.selected)}
                />
                {#each editStack as name}
                <button class="stack-item" type="button" on:click={() => stackDelete(name)}>{name} &#x2715;</button>
                {/each}
            </div>
                <button>Update</button>
                <button type="button" on:click={() => edit = false}>Cancel</button>
            </form>
            {/if}
        </div>

<style lang="scss">
    .hidden {
        display: none;
    }
    .left{
        text-align: left !important;
    }
    .header-left {
        justify-content: start !important; 
    }
    .project {
        text-align: center;
        background-color: white;
        border: 1px solid $border-light;
        border-radius: $border-radius;
        padding: 1rem;
        // min-height: 17rem;
        .icon {
            width: 1.5em;
            height: 1.5em;
            margin-left: 3px;
        }
    }
    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1em;
    }
    
    .title {
        font-size: 1.5rem;
        font-weight: 600;
        // line-height: 0.2rem;
    }

    .inputs {
        margin-bottom: 0.2rem;
    }

    input, textarea {
        width: 100%;
        padding: 0.2rem;
    }

    label {
        font-weight: 500;
    }

    .link {
        color: black;
        height: 1em;
        width: 1em;
        display: flex;
        align-items: center;
        img {
            width: 1.5em;
            height: 1.5em;
        }
    }
    .stack-item {
        border: 1px solid rgb(204,204,204);
        border-radius: 36px;
        margin: 2px;
    }
    button {
        border: none;
    }
    .buttons {
        margin-bottom: 0.7rem;
    }


</style>
