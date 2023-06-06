<script>
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import Typeahead from 'svelte-typeahead/';
    import stackOptions from '$lib/stackOptions.js'

    export let stack;
    let initalStack = [...stack];
    let submitBtn;
    let cancelBtn;

    const updateStack = (name) => {
        stack = [...stack, name]
        checkChange()
    }

    const deleteStack = (name) => {
        stack = stack.filter(t => t !== name)
        checkChange()
    }

    function arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    const discardChange = () => {
        stack = [...initalStack]
        checkChange()
    }

    const checkChange = (e) => { 
        if (!arrayEquals(stack, initalStack)) {
            submitBtn.disabled = false
            cancelBtn.disabled = false
        } else {
            submitBtn.disabled = true
            cancelBtn.disabled = true
        }
    }

    async function handleUpdate() {
        return async({ result }) => {
            if (result.type === "success") {
                await invalidateAll()
                initalStack = [...stack]
                checkChange()
                await applyAction(result)
            } if (result.type === "failure") {
                await applyAction(result)
            }
        }
    }

</script>

<form method="post" action="?/updateStack" use:enhance={handleUpdate}>
    <div class="stack-form">

        <input type="text" name="stack" value={stack} hidden>

        <div class="tech-stack">
            {#each stack as name}
                <div class="stack-item">
                    <img src={`https://cdn.simpleicons.org/${name.replaceAll(" ", "")}`} alt={name}>
                    <span>{name}</span>
                    <button class="delete-stack" type="button" on:click={() => deleteStack(name)}>&#x2715;</button>
                </div>
            {:else}
                <p>No Items</p>
            {/each}
        </div>
        
        <Typeahead label="Add" inputAfterSelect="clear" limit="5" filter={(item) => stack.includes(item)} placeholder="e.g. Python" data={stackOptions} extract={item => item} on:select={({ detail }) => updateStack(detail.selected)}/>

    </div>
    <button bind:this={submitBtn} class="update" disabled>Update</button>
    <button bind:this={cancelBtn} on:click={discardChange} class="update" disabled>Cancel</button>
</form>

<style lang="scss">
      @mixin flex($direction) {
        display: flex;
        flex-direction: $direction;
    }

    .stack-form {
        margin-bottom: 1rem;
    }

    .tech-stack {
        @include flex(row);
        gap: 0.3rem;
        flex-wrap: wrap;
        width: 80%;
        margin-bottom: 1.2rem;

        .stack-item {
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

    button.update {
        font-size: 1em;
        padding: 0.5rem 0.7rem;
        background-color: black;
        color: white;
        border: none;
        transition: all 0.2s;
        &:disabled {
            cursor: default;
            background-color:inherit;
        }
    }

    :global([data-svelte-typeahead] form) {
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

    :global([data-svelte-typeahead] input) {
        line-height: 1rem;
        padding: 0.5rem !important;
        border-radius: $border-radius !important;
        border: none !important;
        outline: none;
        &:focus {
            outline: none;
        }
    }

    :global([data-svelte-typeahead] label) {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        color: hsl(0, 0%, 39%);
        font-size: 1.1rem !important;
        font-weight: 500;
    }
</style>
