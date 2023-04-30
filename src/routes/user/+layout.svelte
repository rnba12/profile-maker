<script>
    import { signOut } from "@auth/sveltekit/client";
</script>
<nav class="flex flex-row">
        <a href="/user/edit">Edit</a>
        <a href="/user/settings">Settings</a>
        <button on:click={() => signOut()}>Sign Out</button>
</nav>

<slot/>
