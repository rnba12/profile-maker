<script>
    import Hero from '$lib/components/Hero.svelte';
    import Module from '$lib/components/Module.svelte';
    import ProjectItem from '$lib/components/ProjectItem.svelte';
    import code from '$lib/assets/icons/code.svg'
    export let data;
    
    const profileData = data.getProfile
    const projects = data.getProjects

    const handleError = e => {
        e.target.src = code
    }
   
</script>

<svelte:head>
    <title>{profileData.name} | Profile Maker</title>
</svelte:head>

{#if data.isSession}
    <a class="edit-link" href="/user/edit">Edit Your Profile</a>
{/if}

<main>
    <Hero name={profileData.name} tagline={profileData.tagline} links={{links: profileData.links, email: profileData.email}} image={profileData.image}/>
    <div class="content">
        <div class="content-top">
            <Module>
                <div class="tech-stack">
                    {#each profileData.stack as name}
                        <div class="stack-item">
                            <img on:error={handleError} width="20px" height="20px" src={`https://cdn.simpleicons.org/${name.replace(" ", "")}`} alt="">
                            <span class="item-name">{name}</span>
                            <br>
                        </div>
                    {/each}
                </div>
            </Module>
        </div>
        
        <div class="content-bottom">
            <h2>Projects</h2>
                <div class="projects">
                    {#each projects as {title, description, stack, url}}
                        <ProjectItem {title} {description} {stack} {url}/>
                    {/each}
                </div>
        </div>

    </div>
</main>

<style lang="scss">
    main {
        width: 60%;
        margin: auto;
        padding-top: 1.5rem;
        padding-bottom: 2rem;
    }
    .edit-link {
        position: absolute;
        top: 1rem;
        left: 1rem;
        text-decoration: none;
        background-color: white;
        border: 1px solid rgb(204,204,204);
        border-radius: 56px;
        color: black;
        padding: 0.8rem;
        font-weight: 500;
        &:hover {
            color: rgb(0, 136, 255);
        }
    }

    h2 {
        font-weight: 500;
    }

    .content-top {
    }
    .content-bottom {
    }
    h2 {
        text-align: center;
    }

    .projects {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    .tech-stack {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.6rem;

        @media(Max-width: 600px) {
            gap: 0px;
        }
    

    }
    .stack-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 4px;
            border: 1px solid rgb(204,204,204);
            padding: 0.5rem;
            border-radius: 36px;

            @media(Max-width: 600px) {
            border: none;
            padding: 0.1rem;
            
            .item-name {
                display: none;
            }
        }

        
    }
</style>
