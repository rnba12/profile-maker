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

<svelte:head>
    <title>{mockData.name} | Profile-Maker</title>
</svelte:head>

<main>
    <Hero name={mockData.name} tagline={mockData.tagline} links={mockData.links}/>
    <div class="content">
        <div class="content-top">
            <Module header="Tech Stack">
                {#each mockData.stack as name}
                    <img on:error={() => handleError()} width="20px" height="20px" src={`https://cdn.simpleicons.org/${name.replace(" ", "")}/black`} alt="">
                    <span>{name}</span>
                    <br>
                {/each}
            </Module>
            <Module header="About Me">
                {mockData.about}
            </Module>
        </div>
        
        <Module header="Projects">
            {#each mockData.projects as {title, description, stack, url}}
                <ProjectItem {title} {description} {stack} {url}/>
            {/each}
        </Module>
    </div>
</main>
