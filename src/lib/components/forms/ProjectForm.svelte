<script>
    import stackOptions from '$lib/stackOptions'
    import { createEventDispatcher } from 'svelte';
    import { enhance, applyAction } from '$app/forms'
    import { invalidateAll } from "$app/navigation";
    import Modal from "../Modal.svelte";
    import Typeahead from "svelte-typeahead"

    const dispatch = createEventDispatcher()

    export let project;
    export let action;

    let showModal = true
    let closeModal

    const stackAdd = (name) => {
        project.stack = [...project.stack, name]
    }

    const stackDelete = (name) => {
        project.stack = project.stack.filter(t => t !== name)
    }

    const handleClose = () => {
        dispatch("closeForm")
    }

    const toggleInput = (e) => {
        // e.target.querySelector("input").focus();
    }
    
</script>

<Modal bind:showModal bind:close={closeModal} on:exit={handleClose}>

    
    <form method="POST" action={action} use:enhance={() => {
        // Before submission
        return async ({ result }) => {
            if (result.type === "success") {
                await invalidateAll()
                await applyAction(result)
            }
            if (result.type === "failure") {
                await applyAction(result)
            }
            handleClose()
        };
    }}
    >
    <div class="form-header">
        <h2>{action === "?/add" ? "Add" : "Edit"} Project</h2>
        {#if action === "?/update"}
            <button class="btn delete" formaction="?/delete&id={project.id}"><iconify-icon icon="ph:trash"></iconify-icon>Delete</button>
        {/if}
    </div>
    {#if action === "?/update"}
        <input type="text" name="id" hidden value={project.id}>
    {/if}
        <div class="inputs">
            <div class="text">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="field" on:click={(e) => (toggleInput(e))}>
                    <label for="title">Title</label>
                    <input bind:value={project.title} type="text" name="title" required maxlength="100" />
                </div>

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="field" on:click={(e) => (toggleInput(e))}>
                    <label for="url">Link<iconify-icon icon="material-symbols:link"></iconify-icon></label>
                    <input bind:value={project.url} type="url" name="url" />
                </div>

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="field" on:click={(e) => (toggleInput(e))}>
                    <label for="description">Description<iconify-icon icon="mdi:text"></iconify-icon></label>
                    <textarea bind:value={project.description} name="description" maxlength="150" rows="5" />
                </div>

            </div>
            <div class="stack">
                <Typeahead
                    on:click={(e) => (toggleInput(e))}
                    label="Tech Stack" inputAfterSelect="clear" limit="5" filter={(t) => project.stack.includes(t)} placeholder="Add" data={stackOptions} extract={(item) => item}
                    on:select={({ detail }) => stackAdd(detail.selected)}
                />
                <div class="stack-items">
                    {#each project.stack as name}
                        <div class="stack-item">
                            {name}
                            <button class="x-btn" type="button" on:click={() => stackDelete(name)}>
                                <iconify-icon icon="ph:x"></iconify-icon>
                            </button>
                        </div>
                    {/each}
                </div>
                <input hidden name="stack" type="text" bind:value={project.stack} />
            </div>
        </div>
        <div>
            <button class="submit-btn">{action === "?/add" ? "Add" : "Update"}</button>
            <button class="cancel-btn" type="button" on:click={handleClose}>Discard</button>
        </div>
    </form>
</Modal>

<style lang="scss">

    form {
        display: flex;
        flex-direction: column;
        width: 650px;
        height: 460px;
        
        .form-header {
            display: flex;
            justify-content: space-between;
        }

        .inputs {
            position: relative;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.6em;
            margin-bottom: 0.7rem;
            overflow-y: auto;
        }
        
        .text {
            display: flex;
            flex-direction: column;
            gap: 2px;
            input {
                width: 100%;
            }
            textarea {
                font-size: 1rem;
                width: 100%;
            }
        }
        
        .stack-items {
            margin-top: 5px;
        }
        .stack-item {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            gap: 2px;
            padding: 0.5rem;
            font-size: 1.1rem;
            background-color: rgb(225, 225, 225);
            border-radius: 36px;
            margin: 2px;
            button {
                padding: 0;
            }
        }

        .delete {
                border: none;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 2px;
                &:hover {
                    color: red;
                }
            }
        }  
    
</style>
