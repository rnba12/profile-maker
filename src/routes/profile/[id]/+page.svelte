<script>
    import Hero from '$lib/compnents/Hero.svelte';
    import Module from '$lib/compnents/Module.svelte';
    import mockData from '$lib/assets/mockData.json'
    import ProjectItem from '../../../lib/compnents/ProjectItem.svelte';
    import iconLookup from '$lib/icons.js'
   
</script>

<main class="h-full bg-gray-50">
    <Hero name={mockData.name} tagline={mockData.tagline} links={mockData.links}/>
    <div class="content p-4">
        <div class="content-top flex flex-row h-72">
            <Module header="Languages/Technologies">
                {#each Object.entries(mockData.languages) as [icon, name]}
                    <img class="inline" width="20px" height="20px" src={iconLookup[icon] || iconLookup['code']} alt="">
                    <span>{name}</span>
                    <br>
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
