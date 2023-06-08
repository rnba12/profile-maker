<script>
    export let title;
    export let url = "";
    export let description;
    export let stack;

    // edit
    export let edit = false;
</script>

<div class="project">
    <div class="header">
        <div class="title">{title}</div>
        <div class="header-prompt">
            {#if edit}
                <iconify-icon icon="ph:note-pencil"></iconify-icon>Edit
            {:else if url}
                <a class="link" href={url} target="_blank"><iconify-icon icon="tabler:external-link"></iconify-icon></a>
            {/if}
        </div>
    </div>
    <p>{description}</p>
    <div class="stack">
        {#each stack as name}
            <img class="icon" src={`https://cdn.simpleicons.org/${name.replaceAll(" ", "")}`} alt={name}/>
        {/each}
    </div>
</div>

<style lang="scss">
    .project {
        display: flex;
        flex-direction: column;
        justify-content: baseline;

        background-color: white;
        border: 1px solid $border-light;
        border-radius: $border-radius;
        padding: 1.3rem;
        min-height: 130px;
        .icon {
            width: 1.5em;
            height: 1.5em;
        }
        &:hover {
            cursor: pointer;
            border-color: rgb(125, 125, 125);
            .header-prompt {
                opacity: 100;
            }
        }
        transition: all 0.1s;
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2px;
    }
    .header-prompt {
        font-size: 1.2em;
        display: inline-flex;
        align-items: center;
        gap: 2px;
        opacity: 0;
        transition: all 0.2s;
    }
    a {
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        color: inherit;
        font-size: 1.2em;
        &:hover {
            color: lighten($color: black, $amount: 30);
        }
    }

    .title {
        font-size: 1.3rem;
        font-weight: 600;
        word-wrap: break-word;
    }

    p {
        word-wrap: break-word;
    }
    .stack {
        display: inline-flex;
        align-items: center;
        gap: 5px;
    }

</style>
