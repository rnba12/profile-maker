<script>
    import mockData from '$lib/assets/mockData.json'
    import Module from '$lib/components/Module.svelte'
    import Typeahead from "svelte-typeahead"
    import stackOptions from '$lib/stackOptions';
    const profileData = {...mockData}
    
    const valid = {
        name: true,
        about: true,
        links: true,
        stack: true
    }
    

    let selectOption = "github";
    

    const isValidURL = (url) => {
            const urlPattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
            if (urlPattern.test(url)) {
               return true
            } else {
               return false
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

    const handleSubmit = () => {
        const newData = {...profileData}
        console.log(newData)
        //Validation
        for (const link in newData.links) {
            if (newData.links[link] !== "") {
                valid.links = isValidURL(newData.links[link])
            }
        }
       valid.stack = newData.stack.length !== 0 

        if (Object.values(valid).includes(false)) {
            // error
            console.log("error in form")
        } else {
            // send data
            console.log("sendinf data")
        }
        
    }

</script>

<svelte:head>
    <title>Edit | Profile-Maker</title>
</svelte:head>


<main class="h-full p-4 bg-gray-100">
    <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-2 text-2xl">

        <Module header="Bio">
            <input type="file" name="profilePicture" id="">
            <br>
            <label for="name">Name</label>
            <input class="w-1/2 border-2" type="text" name="name" maxlength="100" required bind:value={profileData.name}>
            <br>
            <label for="tagline">Tagline</label>
            <input class="w-1/2 border-2" type="text" name="tagline" maxlength="100" bind:value={profileData.tagline}>
            <br>
            <label for="about">About</label>
            <textarea class="w-1/2 border-2" name="about" placeholder="about" maxlength="500" required bind:value={profileData.about}></textarea>
        </Module>
        
        <Module header="Links">
            <div class="link-form">
                <select name="link" id=""  bind:value={selectOption}>
                    <option value="github">GitHub</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="dribbble">Dribbble</option>
                </select>
                <input type="text" bind:value={profileData.links[selectOption]}>
                <div class="{valid.links ? "hidden" : "text-red-600"}">Links Must Be Valid URLs</div>
            </div>  
        </Module>
        
        <Module header="Tech Stack">
            <div class="stack-form">
                <div class="{valid.stack ? "hidden" : "text-red-600"}">Stack Cannot Be Empty</div>
                {#each profileData.stack as name}
                <img class="inline" width="20px" height="20px" src={`https://cdn.simpleicons.org/${name.replace(" ", "")}/black`} alt="">
                <span>{name}</span> <button type="button" on:click={() => deleteStack(name)}>x</button><br>
                {/each}
                
                <Typeahead label="Add To Your Stack" hideLabel inputAfterSelect="clear" limit="5" filter={(item) => profileData.stack.includes(item)} placeholder="e.g. Python" data={stackOptions} extract={item => item} on:select={({ detail }) => updateStack(detail.selected)}/>
            </div>
        </Module>
        
        <button type="submit">Update</button>
    </form>
</main>
