<script>
    import Hero from '$lib/components/Hero.svelte';
    import Module from '$lib/components/Module.svelte';
    import mockData from '$lib/assets/mockData.json'
    import ProjectItem from '$lib/components/ProjectItem.svelte';
    import code from '$lib/assets/icons/code.svg'

    const handleError = e => {
        e.target.src = code
    }
   
</script>

<main class="h-full bg-gray-50">
    <Hero name={mockData.name} tagline={mockData.tagline} links={mockData.links}/>
    <div class="content p-4">
        <div class="content-top flex flex-row h-72">
            <Module header="Languages/Technologies">
                {#each mockData.stack as name}
                    <img on:error={() => handleError()} class="inline" width="20px" height="20px" src={`https://cdn.simpleicons.org/${name}/black`} alt="">
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
