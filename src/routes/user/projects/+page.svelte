<script>
    import ProjectItem from '$lib/components/ProjectItem.svelte';
    import Module from '$lib/components/Module.svelte';
    import Typeahead from "svelte-typeahead"
    import stackOptions from "$lib/stackOptions.js"
    import { enhance } from '$app/forms';
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

    const stackDelete = (name) => {
        formStack = formStack.filter(t => t !== name)
    }

</script>

<svelte:head>
    <title>Projects | Profile Maker</title>
</svelte:head>


        <div class="projects-page">
            <h1>Projects</h1>
            
            
            {#if newProject}
            
                <Module header="Add Project">
                    <form method="POST" action="?/add" use:enhance={() => {
                        // Before submission
                        return async ({result, update }) => {
                            if( result.type === "success") {
                                newProject = null
                            }
                            update()
                        }
                    }}>
                    
                        <div class="inputs">
                            <div class="text">
                                        <label for="title">Title</label>
                                        <input type="text" name="title" value={newProject.title} required maxlength="100">
                                        <label for="url">Link</label>
                                        <input type="url" name="url" value={newProject.url}>
                                        <label for="description">Description</label>
                                        <textarea name="description" value={newProject.description} maxlength="150"></textarea>
                            </div>
                            <div class="stack">
                                <Typeahead
                                label="Tech Stack" inputAfterSelect="clear" limit="5"
                                filter={(t) => formStack.includes(t)} placeholder="Add" data={stackOptions} extract={item => item} on:select={({ detail }) => stackAdd(detail.selected)}
                                />
                                {#each formStack as name}
                                    <button class="stack-item" type="button" on:click={() => stackDelete(name)}>{name} &#x2715;</button>
                                {/each}
                                <input hidden name="stack" type="text" bind:value={formStack}>
                            </div>
                        </div>
                        <button>Add</button>
                        <button type="button" on:click={() => newProject = null}>Discard</button>
                    </form>
                </Module>
            
            {:else}
                <button class="new-project" on:click={handleNew}>+ New Project</button>
            {/if}
            <div class="projects">
                {#each projects as p}
                    <ProjectItem {...p} {stackOptions}/>
                        {:else}
                        <h2>No Projects to display</h2>
                {/each}
            </div>
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
        form {
            .inputs {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.6em;
                margin-bottom: 0.7rem;
            }
            label {
                font-size: 1.1rem;
                font-weight: 500;
            }
            .text {
                display: flex;
                flex-direction: column;
                gap: 2px;
                input {
                    padding: 0.5rem;
                }
            }
            button {
                border: none;
            }
            .stack-item {
                font-size: 1rem;
                border: 1px solid rgb(204,204,204);
                border-radius: 36px;
                margin: 2px;
            }
            
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
