<script>
    export let header=null;
</script>

<div class="module">
    {#if header}
    <div class="module-header">{header}</div>
    {/if}
    <div class="module-content">
        <slot/>
    </div>
</div>

<style lang="scss">
    .module {
        background-color: white;
        border: 1px solid rgb(204, 204, 204);
        border-radius: $border-radius;
        padding: 2rem;
    }
    .module-header {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1.2rem;
    }
    .module-content {
        font-size: 1.3em;
    }
</style>
