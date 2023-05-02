<script>
    import mockData from '$lib/assets/mockData.json'
    import ProjectItem from '$lib/compnents/ProjectItem.svelte';
    const profileData = {...mockData}
    


    let option = "github";
    let stackItem = "";
    let selectedProject = null

    const updateStack = (e) => {
        profileData.stack[stackItem] = stackItem
        stackItem = ""
    }

    const setProject = (project) => {
        selectedProject = project
    }

</script>

<h1>Edit</h1>

<main class="h-full bg-gray-50">
    <div class=" border-4 flex flex-col text-2xl">

        <input type="file" name="profilePicture" id="">
        
        <input type="text" name="name" placeholder="name" bind:value={profileData.name}>

        <input type="text" name="tagline" placeholder="tagline" bind:value={profileData.tagline}>

        <textarea name="about" placeholder="about" bind:value={profileData.about}></textarea>

        <label for="">links</label>
        <div class="link-form">
            <select name="link" id="" bind:value={option}>
                <option value="github">GitHub</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="dribbble">Dribbble</option>
            </select>
            <input type="text" value={profileData.links[option]}>
        </div>
        <label for="">Stack</label>
        <div class="stack-form">
            {#each Object.entries(profileData.stack) as [icon, name]}
            <img class="inline" width="20px" height="20px" src={`https://cdn.simpleicons.org/${icon}/black`} alt="">
            <span>{name}</span><br>
            {/each}
            <input type="text" bind:value={stackItem}>
            <button on:click|preventDefault={updateStack}>Add</button>
        </div>

        <label for="">projects</label>
        {#each profileData.projects as project}
            <button on:click={() => setProject(project)}>{project.title}</button>
        {/each}
        {#if selectedProject}
            <div class="project-form">
                <input type="text" placeholder="title" bind:value={selectedProject.title}>
                <input type="url" placeholder="about" bind:value={selectedProject.url}>
                <textarea placeholder="title" bind:value={selectedProject.description}></textarea>
                <div class="stack-select">
                    
                </div>
                <button>Update</button>
            </div>
        {/if}

        
        <button>Update</button>
    </div>
</main>
