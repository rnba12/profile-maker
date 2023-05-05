<script>
    import { signOut } from "@auth/sveltekit/client";
</script>

<nav>
    <a href="/user/edit">Edit</a>
    <a href="/user/projects">Projects</a>
    <a href="/user/settings">Settings</a>
    <button on:click={() => signOut()}>Sign Out</button>
</nav>

<slot/>
