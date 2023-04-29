<script>
    import { page } from '$app/stores';
    import Hero from '$lib/compnents/Hero.svelte';
    import Module from '$lib/compnents/Module.svelte';
    import mockData from '$lib/assets/mockData.json'
    import ProjectItem from '../../../lib/compnents/ProjectItem.svelte';

    console.log(mockData)
</script>

<main>
    <Hero name={mockData.name} tagline={mockData.tagline}/>
    <div class="content">
        <div class="content-top">
            <Module header="Languages">
                {#each mockData.languages as lang}
                    <div>{lang}</div>
                {/each}
            </Module>
            <Module header="About Me">
                {mockData.about}
            </Module>
        </div>
        
        <Module header="Projects">
            {#each mockData.projects as {title, description, technologies}}
                <ProjectItem title={title} description={description} technologies={technologies}/>
            {/each}
        </Module>
    </div>
</main>

<style>
    main {
        @apply 
            h-full
            bg-gray-100
            ;
        
    }     
    .content {
        @apply    
            p-4
           ; 
    }
    .content-top {
        @apply 
            flex flex-row
            h-72 
            ;
    }
</style>
