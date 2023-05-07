<script>
    import mockData from '$lib/assets/mockData.json'
    import ProjectItem from '$lib/components/ProjectItem.svelte';
    import Module from '$lib/components/Module.svelte';
    import Typeahead from "svelte-typeahead"
    import stackOptions from "$lib/stackOptions.js"

    let projects = [...mockData.projects]
    let profileStack = mockData.stack

    // let selectedProject = null
    let formStack = []
    let newProject = null

    const handleNew = () => {
        newProject = {title: "", url: "", description: "", stack: [...formStack]}
        formStack = []
    }

    // const handleEdit = (project) => {
    //     selectedProject = true
    // }

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

    const addProject = (e) => {
            const updated = {
                title: e.target.title.value,
                description: e.target.description.value,
                url: e.target.url.value,
                stack: [...formStack]
            }
            projects = [...projects, updated]
            newProject = null;
    }

    const deleteProject = (project) => {
        projects = projects.filter(p => p !== project)
       
    }

    const updateProjects = () => {
        //send data
    }

</script>

<svelte:head>
    <title>Projects | Profile-Maker</title>
</svelte:head>


        <h1>Projects</h1>
        <button on:click={handleNew}>+ New Project</button>
        
        {#if newProject}
        <form on:submit|preventDefault={addProject}>
            <input type="text" name="title" value={newProject.title} required maxlength="100">
            <input type="url" name="url" value={newProject.url}>
            <textarea name="description" value={newProject.description} maxlength="300"></textarea>
            {#each formStack as name}
                <button type="button" on:click={stackDelete}>{name}</button>
            {/each}
            <Typeahead label="Add Tech" hideLabel inputAfterSelect="clear" limit="5" filter={(t) => formStack.includes(t)} placeholder="Add" data={stackOptions} extract={item => item} on:select={({ detail }) => stackAdd(detail.selected)}/>
            <button>✔</button>
            <button type="button" on:click={() => newProject = null}>✖</button>
        </form>
        {/if}
        <div class="projects">
            {#each projects as p}
                <ProjectItem title={p.title} description={p.description} stack={p.stack} url={p.url} {stackOptions} on:update={(e) => handleUpdate(e, p)} on:delete={() => deleteProject(p)}/>
            {/each}
        </div>
        <button on:click={updateProjects}>Update</button>
        

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
