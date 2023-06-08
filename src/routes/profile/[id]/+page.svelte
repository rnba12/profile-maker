<script>
    import Hero from '$lib/components/Hero.svelte';
    import ProjectItem from '$lib/components/ProjectItem.svelte';
    import code from '$lib/assets/icons/code.svg'
    import { page } from '$app/stores'
    
    const profileData = $page.data.getProfile
    const projects = $page.data.getProjects

    const handleError = e => {
        e.target.src = code
    }
   
</script>

<svelte:head>
    <title>{profileData.name} | Profile Maker</title>
</svelte:head>

{#if $page.data.isSession}
    <a class="edit-link btn" href="/user/edit">Edit Profile</a>
{/if}

<main>
    <div class="profile-page">
        <Hero name={profileData.name}  tagline={profileData.tagline} 
            links={{links: profileData.links, email: profileData.email}} 
            image={profileData.image}
        />
        <div class="content">
            <h2><iconify-icon icon="ph:toolbox"></iconify-icon>Tech Stack</h2>
                <div class="tech-stack">
                    {#each profileData.stack as name}
                        <div class="stack-item">
                            <img on:error={handleError} width="20px" height="20px" src={`https://cdn.simpleicons.org/${name.replace(" ", "")}`} alt={name}>
                            <span class="item-name">{name}</span>
                </div>
                    {/each}
                </div>
        
                <h2><iconify-icon icon="octicon:stack-24"></iconify-icon>Projects</h2>
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
        width: 100%;
        min-height: 100vh;
        background:linear-gradient(45deg, #eeeeee, #FAF8F9, #FFFFFF);
    }
    .profile-page {
        width: 60%;
        margin: auto;
        padding-top: 1.5rem;
        padding-bottom: 2rem;
    }
    .edit-link {
        position: fixed;
        top: 1rem;
        left: 1rem;
        text-decoration: none;
        font-size: 1.2em;
        font-weight: 500;
        color: black;
        padding: 0.8rem;
        border-radius: 48px;
    }

    h2 {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        font-weight: 500;
        text-align: center;
    }

    .tech-stack {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.6rem;
        margin-bottom: 2em;
        
        @media(Max-width: 600px) {
            border: 1px solid rgb(204, 204, 204);
            padding: 1rem;
            background-color: white;
            border-radius: 12px;
            gap: 0px;
        }    
    }
    .stack-item {
        background-color: rgb(255, 255, 255);
        font-size: 1.2em;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;
        border: 1px solid #cccccc;
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

    .projects {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        @media(Max-width: 600px) {
            grid-template-columns: 1fr;
        }     
    }
    
</style>
