<script>
    import Module from '$lib/components/Module.svelte'
    import { page } from '$app/stores';
    import BioForm from '$lib/components/forms/BioForm.svelte';
    import StackForm from '$lib/components/forms/StackForm.svelte';
    import LinkForm from '$lib/components/forms/linkForm.svelte';

    $: profileData = {...$page.data.profile}

</script>

<svelte:head>
    <title>Edit | Profile Maker</title>
</svelte:head>

    <div class="edit-page">
        <h1>Edit Profile</h1>

        <Module header="Bio">
            <BioForm name={profileData.name} tagline={profileData.tagline} image={profileData.image}/>
        </Module>
        
        <Module header="Links">
           <LinkForm links={profileData.links}/>
        </Module>
        
        <Module header="Tech Stack">
            <StackForm stack={profileData.stack}/>    
        </Module>


    </div>


<style lang="scss">
    @mixin flex($direction) {
        display: flex;
        flex-direction: $direction;
    }


    .edit-page {
        h1 {
            font-size: 3rem;
            line-height: 0;
        }
        @include flex(column); 
        gap: 1.5em;
        width: 100%;
    }

</style>
