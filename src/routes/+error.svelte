<script>
    import { page } from '$app/stores';
</script>


<div class="error-page">
    <h1>There's Been A Problem😭</h1>
    <h1>Error: {$page.status} - {$page.error.message}</h1>
    
    <h3><a href="/">Back To Home</a></h3>
    
    <h3><a href="https://www.github.com/rnba12/profile-maker/issues">Found an issue?</a></h3>
</div>

<style>
    .error-page {
        padding: 1rem;
    }
    a {
        font-weight: 600;
    }
</style>
