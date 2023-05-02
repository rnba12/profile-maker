<script>
    import mockData from '$lib/assets/mockData.json'
    import Module from '$lib/components/Module.svelte'
    const profileData = {...mockData}
    


    let option = "github";
    let stackItem = "";
    let selectedProject = null
    let isNewProject = false;

    const updateStack = () => {
        // TODO validation
        profileData.stack[stackItem] = stackItem
        stackItem = ""
    }

    const setProject = (project) => {
        // TODO validation
        selectedProject = project
    }

    const updateProjectStack = (name) => {
        selectedProject.stack.includes(name) 
            ? selectedProject.stack = selectedProject.stack.filter(t => t !== name)
            : selectedProject.stack.push(name)
    }

    const updateProject = () => {
        // TODO validation
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
    }

    const addProject = () => {
        // TODO validation
        profileData.projects.push(selectedProject)
        selectedProject = null
    } 

</script>


<main class="h-full p-4 bg-gray-100">
    <div class="flex flex-col gap-2 text-2xl">

        <Module header="Bio">
            <input type="file" name="profilePicture" id="">
            <br>
            <label for="name">Name</label>
            <input class="w-1/2 border-2" type="text" name="name" placeholder="name" bind:value={profileData.name}>
            <br>
            <label for="tagline">Tagline</label>
            <input class="w-1/2 border-2" type="text" name="tagline" placeholder="tagline" bind:value={profileData.tagline}>
            <br>
            <label for="about">About</label>
            <textarea class="w-1/2 border-2" name="about" placeholder="about" bind:value={profileData.about}></textarea>
            <br>     
        </Module>
        
        <Module header="Links">
            <div class="link-form">
                <select name="link" id="" bind:value={option}>
                    <option value="github">GitHub</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="dribbble">Dribbble</option>
                </select>
                <input type="text" bind:value={profileData.links[option]}>
            </div>  
        </Module>
        
        <Module header="Tech Stack">
            <div class="stack-form">
                {#each Object.entries(profileData.stack) as [icon, name]}
                <img class="inline" width="20px" height="20px" src={`https://cdn.simpleicons.org/${icon}/black`} alt="">
                <span>{name}</span><br>
                {/each}
                <input class="border-2" type="text" placeholder="e.g. Python" bind:value={stackItem}>
                <button on:click|preventDefault={updateStack}>Add</button>
            </div>
        </Module>

        
        <Module header="Projects">
            <button on:click={newProject}>Add Project</button>
            {#each profileData.projects as project}
                <button on:click={() => setProject(project)}>{project.title}</button>
            {/each}
            {#if selectedProject}
                <div class="project-form">
                    <label for="title">Title</label>
                    <input type="text" placeholder="title" bind:value={selectedProject.title}>

                    <label for="url">Url</label>
                    <input type="url" name="url" placeholder="url" bind:value={selectedProject.url}>

                    <label for="description">Description</label>
                    <textarea name="description" placeholder="description" bind:value={selectedProject.description}></textarea>
                    <br>
                    <div class="stack-select">
                        {#each Object.entries(profileData.stack) as [icon, name]}
                            <button
                                class="{selectedProject.stack.includes(name) ? 'bg-green-500' : "bg-white"} rounded-full" on:click={() => updateProjectStack(name)}>{name}</button>
                        {/each}
                    </div>
                    {#if !isNewProject}
                        <button on:click={updateProject}>Update</button>
                    {:else}
                        <button on:click={addProject}>Add</button>
                    {/if}
                </div>
            {/if}
        </Module>

        
        <button on:click={() => console.log(profileData)}>Update</button>
    </div>
</main>
