<script>
    import ProjectItem from '$lib/components/ProjectItem.svelte';
    import Typeahead from "svelte-typeahead"
    import stackOptions from "$lib/stackOptions.js"
    import { enhance, deserialize } from '$app/forms';
    import { page } from '$app/stores';

    $: projects = [...$page.data.projects]

    let formStack = []
    let newProject = null

    const handleNew = () => {
        newProject = { title: "", url: "", description: "", stack: [...formStack] }
        formStack = []
    }


    const stackAdd = (name) => {
        formStack = [...formStack, name]
    }

    const stackDelete = (e) => {
        formStack = formStack.filter(t => t !== e.target.innerHTML)
    }

    const handleUpdate = (e, project) => {
        let i = projects.findIndex((p) => p === project)
        projects[i] = e.detail.updated 
        // selectedProject = false
        formStack = []
    }

    const deleteProject = (project) => {
        projects = projects.filter(p => p !== project)
    }

</script>

<svelte:head>
    <title>Projects | Profile-Maker</title>
</svelte:head>


        <h1>Projects</h1>
        <button on:click={handleNew}>+ New Project</button>
        
        {#if newProject}
        <form method="POST" action="?/add" use:enhance={() => {
            // Before submission
            return async ({result, update }) => {
                if( result.type === "success") {
                    newProject = null
                }
                update()
            }
        }}>
            
            <label for="title">Title</label>
            <input type="text" name="title" value={newProject.title} required maxlength="100">

            <label for="url">URL</label>
            <input type="url" name="url" value={newProject.url}>

            <label for="description">Description</label>
            <textarea name="description" value={newProject.description} maxlength="300"></textarea>

            {#each formStack as name}
                <button type="button" on:click={stackDelete}>{name}</button>
            {/each}

            <input hidden name="stack" type="text" bind:value={formStack}>

            <Typeahead 
                label="Add Tech" hideLabel inputAfterSelect="clear" limit="5" 
                filter={(t) => formStack.includes(t)} placeholder="Add" data={stackOptions} extract={item => item} on:select={({ detail }) => stackAdd(detail.selected)}
            
            />
            <button>Add</button>
            <button type="button" on:click={() => newProject = null}>Discard</button>
        </form>
        {/if}

        <div class="projects">
            {#each projects as p}
                <ProjectItem {...p} {stackOptions}/>
                    {:else}
                    <p>No Projects to display</p>
            {/each}
        </div>
        

<style>
    h1 {
        font-size: 3rem;
        line-height: 0;
    }
    .projects {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
    }
</style>
