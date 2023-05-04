<script>
    import mockData from '$lib/assets/mockData.json'
    import Module from '$lib/components/Module.svelte'
    import Typeahead from "svelte-typeahead"
    const profileData = {...mockData}
    
    const isValid = {
        links: true,
        projectURL: true
    }

    const lang = [
        "Python", "JavaScript", "Vue.js", "Docker"
    ]
    

    let option = "github";
    let selectedProject = null
    let isNewProject = false;

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

    const updateStack = (name) => {
        // TODO validation
        profileData.stack = [...profileData.stack, name]
    }

    const deleteStack = (name) => {
        profileData.stack = profileData.stack.filter(t => t !== name)
        profileData.projects.forEach(project => {
            project.stack = project.stack.filter(t => t !== name)
        });
    }

    const setProject = (project) => {
        // TODO validation
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
        profileData.projects = [...profileData.projects, selectedProject]
        selectedProject = null
    }

    const deleteProject = () => {
        profileData.projects = profileData.projects.filter(p => p !== selectedProject)
        selectedProject = null
    }

</script>

<svelte:head>
    <title>Edit | Profile-Maker</title>
</svelte:head>


<main class="h-full p-4 bg-gray-100">
    <div class="flex flex-col gap-2 text-2xl">

        <Module header="Bio">
            <input type="file" name="profilePicture" id="">
            <br>
            <label for="name">Name</label>
            <input class="w-1/2 border-2" type="text" name="name" maxlength="100" bind:value={profileData.name}>
            <br>
            <label for="tagline">Tagline</label>
            <input class="w-1/2 border-2" type="text" name="tagline" maxlength="100" bind:value={profileData.tagline}>
            <br>
            <label for="about">About</label>
            <textarea class="w-1/2 border-2" name="about" placeholder="about" maxlength="500" bind:value={profileData.about}></textarea>
        </Module>
        
        <Module header="Links">
            <div class="link-form">
                <select name="link" id=""  bind:value={option} disabled={!isValid.links}>
                    <option value="github">GitHub</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="dribbble">Dribbble</option>
                </select>
                <input on:keyup={(e) => checkURL(e, 'links')} type="text" bind:value={profileData.links[option]}>
                <div class="{!isValid.links ? "text-red-600" : "hidden"}">Link must be valid url</div>
            </div>  
        </Module>
        
        <Module header="Tech Stack">
            <div class="stack-form">
                {#each profileData.stack as name}
                <img class="inline" width="20px" height="20px" src={`https://cdn.simpleicons.org/${name}/black`} alt="">
                <span>{name}</span> <button on:click={() => deleteStack(name)}>x</button><br>
                {/each}
                
                <Typeahead label="Add To Your Stack" hideLabel inputAfterSelect="clear" filter={(item) => profileData.stack.includes(item)} placeholder="e.g. Python" data={lang} extract={item => item} on:select={({ detail }) => updateStack(detail.selected)} let:result let:index>
                    <div class="search">{@html result.string}</div>
                </Typeahead>
            </div>
        </Module>

        
        <Module header="Projects">
            <button on:click={newProject}>Add Project</button>
            {#each profileData.projects as project}
                <button on:click={() => setProject(project)} disabled={!isValid.projectURL}>{project.title}</button>
            {/each}
            {#if selectedProject}
                <div class="project-form">
                    <button class="text-red-600" on:click={deleteProject}>Delete</button>
                    <label for="title">Title</label>
                    <input type="text" placeholder="title"maxlength="100" bind:value={selectedProject.title}>

                    <label for="url">Url</label>
                    <input on:keyup={(e) => checkURL(e,'projectURL')} type="url" name="url" bind:value={selectedProject.url}>
                    <div class="{!isValid.projectURL ? "text-red-600" : "hidden"}">Link must be valid url</div>

                    <label for="description">Description</label>
                    <textarea name="description" placeholder="description" maxlength="300" bind:value={selectedProject.description}></textarea>
                    <br>
                    <div class="stack-select">
                        {#each Object.entries(profileData.stack) as [icon, name]}
                            <button
                                class="{selectedProject.stack.includes(name) ? 'bg-green-500' : "bg-white"} rounded-full" on:click={() => updateProjectStack(name)}>{name}</button>
                        {/each}
                    </div>
                    {#if !isNewProject}
                        <button on:click={updateProject} disabled={!isValid.projectURL}>Update</button>
                    {:else}
                        <button on:click={addProject} disabled={!isValid.projectURL}>Add</button>
                    {/if}
                </div>
            {/if}
        </Module>

        
        <button on:click={() => console.log(profileData)}>Update</button>
    </div>
</main>
