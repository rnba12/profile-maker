<script>
    import ProjectItem from '$lib/components/ProjectItem.svelte';
    import { page } from '$app/stores';
    import ProjectForm from '$lib/components/forms/ProjectForm.svelte';
    import { fade } from 'svelte/transition';

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
    <h1>Projects</h1>
            
    <button class="new-project" on:click={handleNew}>+ New Project</button>          
    <div class="projects">
        {#each projects as p}
            <div class="project-container">
                <button class="edit-btn" on:click={() => handleEdit(p)}><iconify-icon icon="ph:note-pencil"></iconify-icon>Edit</button>
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
        gap: 1rem;
    
        h1 {
            font-size: 3rem;
            line-height: 0;
        }
        .new-project {
            width: min-content;
            padding: 0.5em;
        }

        .project-container {
            position: relative;
            &:hover {
                .edit-btn {
                    display: block;
                }
            }
        }
        .edit-btn {
            display: none;
            position: absolute;
            right: 0;
            transition: all 0.5s;
        }
        
        .projects {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1rem;
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
