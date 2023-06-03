<script>
    import stackOptions from '$lib/stackOptions'
    import { createEventDispatcher } from 'svelte';
    import { enhance } from '$app/forms'
    import Modal from "./Modal.svelte";
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
        e.target.querySelector("input").focus();
    }
    
</script>

<Modal bind:showModal bind:close={closeModal} on:exit={handleClose}>

    
    <form method="POST" action={action} use:enhance={() => {
        // Before submission
        return async ({ result, update }) => {
            if (result.type === "success") {
                dispatch("success", result.data.message)
            }
            update();
            handleClose()
        };
    }}
    >
    <div class="form-header">
        <h2>{action === "?/add" ? "Add" : "Edit"} Project</h2>
        {#if action === "?/update"}
            <button class="delete" formaction="?/delete&id={project.id}"><iconify-icon icon="ph:trash"></iconify-icon>Delete</button>
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
                        <button class="stack-item" type="button" on:click={() => stackDelete(name)}>{name} &#x2715;</button>
                    {/each}
                </div>
                <input hidden name="stack" type="text" bind:value={project.stack} />
            </div>
        </div>
        <div>
            <button class="submit">{action === "?/add" ? "Add" : "Update"}</button>
            <button class="cancel" type="button" on:click={handleClose}>Discard</button>
        </div>
    </form>
</Modal>

<style lang="scss">

    form {
        font-size: 1.1rem;
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
        .field {
            display: flex;
            flex-direction: column;
            align-items: baseline;
            border: 2px solid #cccccc;
            border-radius: 10px;
            margin: 0.5rem 0;
            padding: 0.3rem;
            &:focus-within {
                border-color: #818181;
                label {
                    color: rgb(47, 47, 47);
                }
            }
            transition: all 0.2s;
        }
        label {
            z-index: -1;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            color: rgb(100, 100, 100);
            font-size: 1.1rem;
            font-weight: 500;
        }
        .text {
            display: flex;
            flex-direction: column;
            gap: 2px;
            input {
                width: 100%;
                border: none;
                border-radius: 5px;
                padding: 0.5em 0.5em;
                &:focus {
                    outline: none;
                }
            }
            textarea {
                padding: 0.5em 0.5em;
                border: none;
                font-size: 1rem;
                width: 100%;
                &:focus {
                    outline: none;
                }
            }
        }
        button {
            transition: all 0.1s;
            border: none;
        }
        .stack-items {
            margin-top: 5px;
        }
        .stack-item {
            font-size: 1rem;
            background-color: rgb(225, 225, 225);
            border-radius: 36px;
            margin: 2px;
        }

        button {
            font-size: 1em;
            padding: 0.5rem 0.7rem;
            &.submit {
                background-color: black;
                color: white;
            }
            &.cancel {
               &:hover {
                 background-color: rgb(225, 225, 225);
               }
            }
            &.delete {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 2px;
                // height: fit-content;
                &:hover {
                    color: red;
                }
            }
        }
            
    }
</style>
