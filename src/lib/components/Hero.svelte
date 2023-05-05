<script>
    import placeholder from '$lib/assets/placeholder.jpg';
    import Links from './Links.svelte';
    export let name;
    export let profileImage = placeholder;
    export let tagline;
    export let links;

</script>

<div class="hero">
    <div class="hero-profile-image">
        <img class="hero-image" src={profileImage} alt="profile pic">
    </div>
    <div class="hero-content">
        <div class="hero-name">{name}</div>
        <p class="hero-about">{tagline}</p>
        {#if links}
            <Links {links}/>
        {/if}

    </div>
</div>
