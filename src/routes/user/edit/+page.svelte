<script>
    import mockData from '$lib/assets/mockData.json'
    import Module from '$lib/components/Module.svelte'
    import Typeahead from "svelte-typeahead"
    import stackOptions from '$lib/stackOptions';
    export let data;

    const profileData = {
         ...data.profile,
    }
    

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



    <form on:submit|preventDefault={handleSubmit}>
        <h1>Edit Profile</h1>

        <Module header="Bio">
            <div class="form bio-form">
                <img src={profileData.image} width="100px" height="100px" alt="profile pic">
                <input type="file" name="profilePicture" id="">
                
                <div class="field">
                    <label for="name">Name</label><br>
                    <input type="text" name="name" maxlength="100" required bind:value={profileData.name}>
                </div>
                
                <div class="field">
                    <label for="tagline">Tagline</label><br>
                    <input type="text" name="tagline" maxlength="100" bind:value={profileData.tagline}>
                </div>
                
            </div>
        </Module>
        
        <Module header="Links">
            <div class="form link-form">
                <select name="link" id=""  bind:value={selectOption}>
                    <option value="github">GitHub</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                </select>
                <input type="text" bind:value={profileData.links[selectOption]}>
            </div>  
            <div class="{valid.links ? "hidden" : "warning"}">Links Must Be Valid URLs</div>
        </Module>
        
        <Module header="Tech Stack">
            <div class="form stack-form">
                <div class="{valid.stack ? "hidden" : "warning"}">Stack Cannot Be Empty</div>
                <div class="tech-stack">
                    {#each profileData.stack as name}
                    <div class="tech">
                        <img src={`https://cdn.simpleicons.org/${name.replaceAll(" ", "")}`} alt={name}>
                        <span>{name}</span> <button class="delete-stack" type="button" on:click={() => deleteStack(name)}>&#x2715;</button>
                    </div>
                    {/each}
                </div>
                
                <Typeahead label="Add" inputAfterSelect="clear" limit="5" filter={(item) => profileData.stack.includes(item)} placeholder="e.g. Python" data={stackOptions} extract={item => item} on:select={({ detail }) => updateStack(detail.selected)}/>
            </div>
        </Module>
        
        <button type="submit">Update</button>
    </form>


<style lang="scss">
    @mixin flex($direction) {
        display: flex;
        flex-direction: $direction;
    }

    .hidden {
        display: none;
    }
    .warning {
        color: red;
    }

    form {
        h1 {
            font-size: 3rem;
            line-height: 0;
        }
        @include flex(column); 
        gap: 1.5em;
        width: 100%;

        label {
            display: inline-block;
            margin-bottom: 0.2rem;
            font-weight: 500;
        }
    }
    .bio-form {
        @include flex(column);
        gap: 1em;

        .field {
            width: 100%;
            margin: auto;
        }
    }
    input[type="text"] {
        line-height: 1rem;
        width: 100%;
        padding: 0.2rem 0.3rem;
        margin: auto;
    }


    .link-form {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5em;
        margin-bottom: 1rem;
        select {
            border: none
        }
    }
   

    .tech-stack {
        @include flex(row);
        gap: 0.3rem;
        flex-wrap: wrap;
        width: 80%;
        margin-bottom: 1.2rem;

        .tech {
            @include flex(row);
            gap: 0.3rem;
            align-items: center;
            border: 1px solid rgb(204,204,204);
            padding: 0.5rem;
            border-radius: 36px;
        }
        img {
            width: 1.1rem;
            height: 1.1rem;
        } 
        
        .delete-stack {
            background-color: inherit;
            border: none;
            cursor: pointer;
        }
    }

    button[type="submit"] {
        width: 20%;
        padding: 0.5em;
        margin: auto;
        &:hover {
            background-color: rgb(216, 216, 216);
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
