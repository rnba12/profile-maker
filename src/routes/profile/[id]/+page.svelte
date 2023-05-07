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
                <div class="tech-stack">
                    {#each mockData.stack as name}
                        <div class="tech">
                            <img on:error={() => handleError()} width="20px" height="20px" src={`https://cdn.simpleicons.org/${name.replace(" ", "")}`} alt="">
                            <span>{name}</span>
                            <br>
                        </div>
                    {/each}
                </div>
            </Module>
        </div>
        
        <h1>Projects</h1>
            <div class="projects">
                {#each mockData.projects as {title, description, stack, url}}
                    <ProjectItem {title} {description} {stack} {url}/>
                {/each}
            </div>

    </div>
</main>

<style>

    .content-top {
        
    }

    .projects {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2rem;
    }
    .tech-stack {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.6rem;
    }
    .tech {
            align-items: center;
            border: 1px solid rgb(204,204,204);
            padding: 0.5rem;
            border-radius: 36px;
    }
</style>
