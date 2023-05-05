<script>
    import mockData from '$lib/assets/mockData.json'
    import ProjectItem from '$lib/components/ProjectItem.svelte';
    import Module from '$lib/components/Module.svelte';
    let projects = [...mockData.projects]
    const stack = [...mockData.stack]

    const checkIsEmpty = (e, input) => {
        isValid[input] = true
        if (!e.target.value) isValid[input] = false
    }

    const checkURL = (e, input) => {
        isValid[input] = true
        if (e.target.value) {
            const urlPattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
            if (urlPattern.test(e.target.value)) {
               isValid[input] = true
            } else {
                isValid[input] = false
            }
        }  
    }


    const isValid = {
        name: true,
        about: true,
        links: true,
        projectTitle: true,
        projectURL: true
    }
    let selectedProject = null
    let isNewProject = false;

    const setProject = (project) => {
        // TODO validation
        if (isNewProject) {
            isNewProject = false
            isValid.projectTitle = true
        }
        selectedProject = project
    }

    const updateProjectStack = (name) => {
        if (selectedProject.stack.includes(name) ) {
            selectedProject.stack = selectedProject.stack.filter(t => t !== name)
       } else {
            selectedProject.stack = [...selectedProject.stack, name]
       }
    }

    const updateProject = () => {
        if (isNewProject){ 
            projects = [...projects, selectedProject]
            isNewProject = false
        }
        selectedProject = null;
    }

    const newProject = () => {
        selectedProject = {
            title: "",
            url: "",
            description: "",
            stack: []
        }

        isNewProject = true
        isValid.projectTitle = false
    }

    const addProject = () => {
        // TODO validation
        
        selectedProject = null
    }

    const deleteProject = () => {
        profileData.projects = profileData.projects.filter(p => p !== selectedProject)
        if (isNewProject) {
            isNewProject = false
            isValid.projectTitle = true
        }
        selectedProject = null
    }
</script>

<svelte:head>
    <title>Projects | Profile-Maker</title>
</svelte:head>

<main>
    {#each projects as {title, description, stack}}
    <ProjectItem title={title} description={description} stack={stack}/>
    {/each}

    <Module header="Projects">
        <button on:click={newProject} disabled={!isValid.projectURL || !isValid.projectTitle}>Add Project</button>
        {#each projects as project}
            <button on:click={() => setProject(project)} disabled={!isValid.projectURL}>{project.title}</button>
        {/each}
        {#if selectedProject}
            <div class="project-form">
                <button class="text-red-600" on:click={deleteProject}>Delete</button>
                <label for="title">Title</label>
                <input on:keyup={(e) => checkIsEmpty(e, "projectTitle")} type="text" placeholder="title" maxlength="100" bind:value={selectedProject.title}>
                <div class="{!isValid.projectTitle ? "text-red-600" : "hidden"}">Title cannot be empty</div>
                <label for="url">Url</label>
                <input on:keyup={(e) => checkURL(e,'projectURL')} type="url" name="url" bind:value={selectedProject.url}>
                <div class="{!isValid.projectURL ? "text-red-600" : "hidden"}">Link must be valid url</div>

                <label for="description">Description</label>
                <textarea name="description" placeholder="description" maxlength="300" bind:value={selectedProject.description}></textarea>
                <br>
                <div class="stack-select">
                    {#each stack as name}
                        <button
                            class="{selectedProject.stack.includes(name) ? 'bg-green-500' : "bg-white"} rounded-full" on:click={() => updateProjectStack(name)}>{name}</button>
                    {/each}
                </div>
                {#if !isNewProject}
                    <button on:click={updateProject} disabled={!isValid.projectURL || !isValid.projectTitle}>Update</button>
                {:else}
                    <button on:click={updateProject} disabled={!isValid.projectURL || !isValid.projectTitle}>Add</button>
                {/if}
            </div>
        {/if}
    </Module>
</main>
