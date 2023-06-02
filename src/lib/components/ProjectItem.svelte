<script>
    export let title;
    export let url = "";
    export let description;
    export let stack;

    // edit
    export let edit = false;
</script>

<div class="project" class:left={edit}>
    <div class="header" class:header-left={edit}>
        <div class="title">{title}</div>
        {#if url}
            <a class="link" class:hidden={edit} href={url} target="_blank"><iconify-icon icon="tabler:external-link"></iconify-icon></a>
        {/if}
    </div>
    <p>{description}</p>
    {#each stack as name}
        <img class="icon" src={`https://cdn.simpleicons.org/${name.replaceAll(" ", "")}`} alt=""/>
    {/each}
</div>

<style lang="scss">
    .hidden {
        display: none;
    }
    .left {
        text-align: left !important;
    }
    .header-left {
        justify-content: start !important;
    }
    .project {
        text-align: center;
        background-color: white;
        border: 1px solid $border-light;
        border-radius: $border-radius;
        padding: 1rem;
        // min-height: 17rem;
        .icon {
            width: 1.5em;
            height: 1.5em;
            margin-left: 3px;
        }
    }
    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1em;
    }

    .title {
        font-size: 1.5rem;
        font-weight: 600;
        // line-height: 0.2rem;
    }

    .inputs {
        margin-bottom: 0.2rem;
    }

    input,
    textarea {
        width: 100%;
        padding: 0.2rem;
    }

    label {
        font-weight: 500;
    }

    .link {
        color: black;
        height: 1em;
        width: 1em;
        display: flex;
        align-items: center;
        img {
            width: 1.5em;
            height: 1.5em;
        }
    }
    .stack-item {
        border: 1px solid rgb(204, 204, 204);
        border-radius: 36px;
        margin: 2px;
    }
    button {
        border: none;
    }
    .buttons {
        margin-bottom: 0.7rem;
    }
</style>
