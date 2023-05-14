<script>
    import { enhance, applyAction } from "$app/forms";
    import { invalidateAll} from '$app/navigation';
    import { page } from "$app/stores";
    import Module from "./Module.svelte";


	async function handleNew() {
        return async({ result, update}) => {
            if (result.type === "success") {
                invalidateAll()
                
            } if (result.type === "failure") {
                await applyAction(result)
            }
            update()
        }
    }
	
</script>

<Module header="Welcome">
    <p>Welcome to Profile Maker</p>
    
    <p>Choose a link name to create your profile:</p>
    {#if $page.form?.error}
        {$page.form.message}
    {/if}
    
    <form action="?/new" method="post">
        <input type="text" name="linkName" required maxlength="50">
        <button>Create My Profile</button>
    </form>
</Module>
