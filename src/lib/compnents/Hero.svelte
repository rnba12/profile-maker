<script>
    import placeholder from '$lib/assets/placeholder.jpg';
    
    export let name;
    export let profileImage = placeholder;
    export let tagline;

</script>

<div class="hero">
    <div class="hero-profile-image">
        <img class="hero-image" src={profileImage} alt="profile pic">
    </div>
    <div class="hero-content">
        <div class="hero-name">{name}</div>
        <p class="hero-about">{tagline}</p>
    </div>
    <ul class="links">
        
    </ul>
</div>

<style>
    .hero {
        @apply 
        flex
        p-4;

    }
    .hero-profile-image {
        @apply
            w-40
            h-auto
            border-r border-slate-400;
    }
    .hero-image {
        width: 100%;
        height: auto;
    }
    .hero-content {
        @apply
            px-3;
    }
    .hero-name {
        @apply 
        text-6xl
        font-extrabold
       ;
    }
    .hero-about {
        @apply
            font-semibold;

    }
</style>
