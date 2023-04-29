<script>
    export let header;
</script>

<div class="module">
    <h2>{header}</h2>
    <slot/>
</div>

<style>
    .module {
        border: 2px solid grey;
    }
</style>
