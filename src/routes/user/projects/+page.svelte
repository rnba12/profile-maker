<script>
    import ProjectItem from '$lib/components/ProjectItem.svelte';
    import { page } from '$app/stores';
    import ProjectForm from '$lib/components/forms/ProjectForm.svelte';

    $: projects = [...$page.data.projects]

    let openForm = false
    let action
    let formProject
    
    const handleNew = () => {
        action = "?/add"
        formProject = {title: "", url: "", description: "", stack: []}
        openForm = true
    }

    const handleEdit = (project) => {
        action = "?/update"
        formProject = {...project}
        openForm = true
    }


    const handleCloseForm = () => {
        openForm = false
        formProject = null
    }

</script>

<svelte:head>
    <title>Projects | Profile Maker</title>
</svelte:head>

<div class="projects-page">
    <div class="page-header">Projects</div>
            
    <button class=" submit-btn new-project" on:click={handleNew}>+ New Project</button>          
    <div class="projects">
        {#each projects as p}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="project-container" on:click={() => handleEdit(p)}>
                <ProjectItem edit={true} title={p.title} url={p.url} description={p.description} stack={p.stack}/>
            </div>
        {:else}
            <h2>No Projects to display</h2>
        {/each}
    </div>

    {#if openForm && formProject}
        <ProjectForm {action} project={formProject} on:closeForm={handleCloseForm}/>
    {/if}

</div>
        

<style lang="scss">
    .projects-page {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    
        .new-project {
            width: min-content;
            font-size: 1em;
        }

        .project-container {
            min-width: fit-content;
            cursor: pointer;
            position: relative;
        }
        
        .projects {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: 1fr;
            gap: 1rem;
            @media(Max-width: 640px) {
                grid-template-columns: repeat(1, 1fr);
            
        }
        }
    }

    :global([data-svelte-typeahead] input) {
        line-height: 1rem;
        padding: 0.5rem 0.5rem !important;
        border-radius: $border-radius !important;
        border: none !important;
        outline: none;
        &:focus {
            outline: none;
        }
    }
    :global([data-svelte-typeahead] label) {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        color: rgb(100, 100, 100);
        font-size: 1.1rem !important;
        font-weight: 500;
    }
    :global([data-svelte-typeahead] form) {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        // border: 1px solid #cccccc;
        border-radius: 10px;
        margin: 0.5rem 0;
        padding: 0.3rem;
        &:focus-within {
            border-color: #818181;
        }
    }
</style>
