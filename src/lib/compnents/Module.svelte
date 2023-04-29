<script>
    export let header;
</script>

<div class="module">
    <div class="module-header">{header}</div>
    <div class="module-content">
        <slot/>
    </div>
</div>

<style>
    .module {
        @apply    
            basis-1/2
            bg-white
            border-solid border border-gray-200
            rounded-2xl
            max-h-full
            m-4 p-3;
    }
    .module-header {
        @apply
        text-2xl font-bold
        ;
    }
    .module-content {
        @apply p-1;
    }

</style>
