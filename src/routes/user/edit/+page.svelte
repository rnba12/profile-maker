<script>
    import Module from '$lib/components/Module.svelte'
    import { page } from '$app/stores';
    import BioForm from '$lib/components/forms/BioForm.svelte';
    import StackForm from '$lib/components/forms/StackForm.svelte';


    $: profileData = {
         ...$page.data.profile
    }

    let updated = false;
    let failed = false;

    const valid = {
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


    const handleSubmit = async () => {
        updated = false
        const newData = {...profileData}
        
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
            const response = await fetch('/api/profile', {
                method: 'POST',
                body: JSON.stringify(newData)
            })
            response.json().then(
                data => {
                    if (data.success) updated = true 
                }
            ).catch(
                 failed = true
            )
        }
        
    }

</script>

<svelte:head>
    <title>Edit | Profile Maker</title>
</svelte:head>

    <form on:submit|preventDefault={handleSubmit}>
        <h1>Edit Profile</h1>

        <Module header="Bio">
            <BioForm name={profileData.name} tagline={profileData.tagline} image={profileData.image}/>
        </Module>
        
        <Module header="Links">
            <div class="link-form">
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
            <StackForm stack={profileData.stack}/>    
        </Module>

        {#if updated}
            <p style="color: green; font-size: 1.1rem; text-align: center">Info Updated Succesfully</p>
        {:else if failed}
            <p style="color: red; font-size: 1.1rem; text-align: center">An Error Occured While Updating</p>
        {/if}
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
   
    button[type="submit"] {
        width: 20%;
        padding: 0.5em;
        margin: auto;
        &:hover {
            background-color: rgb(216, 216, 216);
        }
    }


</style>
