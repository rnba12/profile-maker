<script>
    import { enhance, applyAction } from "$app/forms";
    import { invalidateAll} from '$app/navigation';
    import { page } from "$app/stores";

    console.log($page)

	async function handleNew() {
        return async({ result, update}) => {
            console.log(result)
            if (result.type === "success") {
                invalidateAll()
                
            } if (result.type === "failure") {
                console.log("error")
                await applyAction(result)
            }
            console.log($page)
            update()
        }
    }
	
</script>

<h1>Welcome to Profile-Maker</h1>

<p>Choose a link name to create your profile:</p>
{#if $page.form?.error}
    {$page.form.message}
{/if}

<form action="?/new" method="post" use:enhance={handleNew}>
	<input type="text" name="linkName" required maxlength="50">
	<button>Create my profile</button>
</form>
