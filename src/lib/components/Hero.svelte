<script>
    import placeholder from '$lib/assets/placeholder.jpg';
    import Links from './Links.svelte';
    export let name;
    export let profileImage = placeholder;
    export let tagline;
    export let links;

</script>

<div class="hero flex p-4">
    <div class="hero-profile-image w-40 h-auto border border-slate-400 rounded-full ">
        <img class="hero-image w-full h-auto rounded-full " src={profileImage} alt="profile pic">
    </div>
    <div class="hero-content px-3">
        <div class="hero-name text-6xl font-extrabold">{name}</div>
        <p class="hero-about font-semibold">{tagline}</p>
        {#if links}
            <Links {links}/>
        {/if}

    </div>
</div>
