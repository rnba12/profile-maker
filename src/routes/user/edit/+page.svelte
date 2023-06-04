<script>
    import Module from '$lib/components/Module.svelte'
    import { page } from '$app/stores';
    import BioForm from '$lib/components/forms/BioForm.svelte';
    import StackForm from '$lib/components/forms/StackForm.svelte';
    import LinkForm from '$lib/components/forms/linkForm.svelte';
    import Toast from '../../../lib/components/Toast.svelte';

    $: profileData = {
         ...$page.data.profile
    }

    let formResult = null;

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

        {#if formResult}
            <Toast message={formResult.message} success={formResult.success}/>
        {/if}

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


    .link-form {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5em;
        margin-bottom: 1rem;
        select {
            border: none
        }
    }

</style>
