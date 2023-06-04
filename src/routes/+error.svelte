<script>
    import { page } from '$app/stores';
</script>


<h1>There's been a Problem😭</h1>
<h1>Error: {$page.status} - {$page.error.message}</h1>

<a href="/">Back To Home</a>

<p>Found an issue? <a href="https://www.github.com/rnba12/profile-maker/issues">Let me now</a></p>
