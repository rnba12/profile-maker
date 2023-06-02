<script>
    import ProjectItem from '$lib/components/ProjectItem.svelte';
    import stackOptions from "$lib/stackOptions.js"
    import { page } from '$app/stores';
    import ProjectForm from '$lib/components/ProjectForm.svelte';

    $: projects = [...$page.data.projects]

    let openForm = false
    let action
    let formProject
    let showToast = null
    
    const handleNew = () => {
        action = "?/add"
        formProject = {title: "", url: "", description: "", stack: []}
        openForm = true
        showToast = null
    }

    const handleEdit = (project) => {
        action = "?/update"
        formProject = {...project}
        openForm = true
        showToast = null
    }

    const handleSuccess = (e) => {
        showToast = e.detail
    }

    const handleCloseForm = () => {
        openForm = false
        formProject = null
    }

    const handleCloseToast = () => {
        showToast = null
    }

</script>

<svelte:head>
    <title>Projects | Profile Maker</title>
</svelte:head>

<div class="projects-page">
    <h1>Projects</h1>
            
    <button class="new-project" on:click={handleNew}>+ New Project</button>          
    <div class="projects">
        {#each projects as p}
            <div>
                <button on:click={() => handleEdit(p)}>Edit</button>
                <ProjectItem edit={true} title={p.title} url={p.url} description={p.description} stack={p.stack}/>
            </div>
        {:else}
            <h2>No Projects to display</h2>
        {/each}
    </div>
    {#if openForm && formProject}
        <ProjectForm {action} project={formProject} on:closeForm={handleCloseForm} on:success={handleSuccess}/>
    {/if}
    {#if showToast}
        <div class="toast">
            <p>{showToast}</p>
            <button on:click={handleCloseToast}>&#x2715;</button>
        </div>
    {/if}
</div>
        

<style lang="scss">
    .projects-page {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    
        h1 {
            font-size: 3rem;
            line-height: 0;
        }
        .new-project {
            width: min-content;
            padding: 0.5em;
        }
        
        .projects {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
    }

    :global([data-svelte-typeahead] input) {
        line-height: 1rem;
        padding: 0.3rem;
        border-radius: $border-radius !important;
        border: 1px solid rgb(204, 204, 204) !important;
        &:focus {
            outline: none;
            border: 2px solid black !important;
        }
    }
    :global([data-svelte-typeahead] label) {
        font-size: 1.1rem !important;
        font-weight: 500;
    }
</style>
