<script>
    export let text;
    export let url;
</script>

<div class="module-item">
    {#if url}
        <a href={url}>{text}</a>
    {:else}
        {text}
    {/if}
</div>
