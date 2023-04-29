<script>
    import { page } from '$app/stores';
    import Hero from '$lib/compnents/Hero.svelte';
    import Module from '$lib/compnents/Module.svelte';
    import mockData from '$lib/assets/mockData.json'
    import ProjectItem from '../../../lib/compnents/ProjectItem.svelte';

    console.log(mockData)
</script>

<Hero name={mockData.name} about={mockData.about}/>
<Module header="Languages">
    {#each mockData.languages as lang}
        <div>{lang}</div>
    {/each}
</Module>

<Module header="Projects">
    {#each mockData.projects as {title, description, technologies}}
        <ProjectItem title={title} description={description} technologies={technologies}/>
    {/each}
</Module>
