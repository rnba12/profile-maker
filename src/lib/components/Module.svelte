<script>
    export let header;
</script>

<div class="module basis-1/2 bg-white border-solid border border-gray-200 rounded-2xl max-h-full m-4 p-3">
    <div class="module-header text-2xl font-bold">{header}</div>
    <div class="module-content p-1">
        <slot/>
    </div>
</div>
