<script>
    import { enhance, applyAction } from '$app/forms'
    import { invalidateAll } from '$app/navigation';

    export let image;
    export let name;
    export let tagline;

    let submitBtn;
    let cancelBtn;
    let form;

    const checkChange = () => {
        const formName = form.name.value 
        const formTagline = form.tagline.value 
        if (formName.trim() !== name || formTagline.trim() !== tagline) {
            submitBtn.disabled = false
            cancelBtn.disabled = false
        } else {
            submitBtn.disabled = true
            cancelBtn.disabled = true
        }
    }

    const discardChange = () => {
        form.name.value = name
        form.tagline.value = tagline
        checkChange()
    }

    async function handleUpdate() {
        return async({ result }) => {
            if (result.type === "success") {
                await invalidateAll()
                checkChange()
                await applyAction(result)
            } if (result.type === "failure") {
                await applyAction(result)
            }            
        }
    }

</script>

<form bind:this={form} method="post" action="?/updateBio" on:input={checkChange} use:enhance={handleUpdate}>
    <div class="bio-form">
            <div>
                <img src={image} width="150px" height="150px" alt="profile pic">
                <br>
                <!-- <button type="button">Upload</button> -->
               
            </div>
        
            <div>
                <div class="field">
                    <label for="name">Name<iconify-icon icon="ph:user-bold"></iconify-icon></label>
                    <input type="text" name="name" maxlength="100" required value={name}>
                </div>
        
                <div class="field">
                    <label for="tagline">Tagline<iconify-icon icon="mdi:text"></iconify-icon></label>
                    <input type="text" name="tagline" maxlength="100" value={tagline}>
                </div>
            </div>
        </div>
        <button class="submit-btn" bind:this={submitBtn} disabled>Update</button>
        <button class="cancel-btn" bind:this={cancelBtn} type="button" on:click={discardChange} disabled>Cancel</button>
    </form>

<style lang="scss">
    .bio-form {
        display: grid;
        grid-template-columns: max-content auto;
        gap: 0.6rem;
        margin-bottom: 1rem;
    }
    
</style>
