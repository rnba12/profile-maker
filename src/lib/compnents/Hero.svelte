<script>
    import placeholder from '$lib/assets/placeholder.jpg';
    
    export let name;
    export let profileImage = placeholder;
    export let about;

</script>

<div class="hero">
    <img src={profileImage} alt="profile pic">
    <h1>{name}</h1>
    <p>{about}</p>
    <ul class="links">
        
    </ul>
</div>
