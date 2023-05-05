<script>
    import mockData from '$lib/assets/mockData.json'
    import ProjectItem from '$lib/components/ProjectItem.svelte';
    import Module from '$lib/components/Module.svelte';
    import Typeahead from "svelte-typeahead"

    let projects = [...mockData.projects]
    let profileStack = mockData.stack

    let selectedProject = null
    let formStack = []
    let newProject = null

    const handleNew = () => {
        newProject = {title: "", url: "", description: "", stack: [...formStack]}
        formStack = []
    }

    const handleEdit = (project) => {
        selectedProject = project
    }

    const stackAdd = (name) => {
        formStack = [...formStack, name]
    }

    const stackDelete = (e) => {
        formStack = formStack.filter(t => t !== e.target.innerHTML)
    }

    const handleUpdate = (e) => {
        let i = projects.findIndex((p) => p == selectedProject)
        projects[i] = e.detail.updated 
        selectedProject = null
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

    const updateProjects = () => {
        //send data
    }

</script>

<svelte:head>
    <title>Projects | Profile-Maker</title>
</svelte:head>

<main class="p-8">

    <h1>Projects - {projects.length}</h1>
    <button on:click={updateProjects}>Update</button>
    <button on:click={handleNew}>+ New Project</button>

    {#if newProject}
    <form on:submit|preventDefault={addProject}>
        <input type="text" name="title" value={newProject.title} required maxlength="100">
        <input type="url" name="url" value={newProject.url}>
        <textarea name="description" value={newProject.description} maxlength="300"></textarea>
        {#each formStack as name}
            <button type="button" on:click={stackDelete}>{name}</button>
        {/each}
        <Typeahead label="Add Tech" hideLabel inputAfterSelect="clear" limit="5" filter={(t) => formStack.includes(t)} placeholder="Add" data={profileStack} extract={item => item} on:select={({ detail }) => stackAdd(detail.selected)}/>
        <button>✔</button>
        <button type="button" on:click={() => newProject = null}>✖</button>
    </form>
    {/if}

    {#each projects as p}
        <ProjectItem title={p.title} description={p.description} stack={p.stack} url={p.url} {profileStack} on:edit={() => handleEdit(p)} on:update={handleUpdate}/>
    {/each}

</main>
