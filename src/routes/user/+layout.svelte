<script>
    import { signOut } from "@auth/sveltekit/client";
</script>
<nav>
    <ul>
        <a href="/user/edit">Edit</a>
        <a href="/user/settings">Settings</a>
        <button on:click={() => signOut()}>Sign Out</button>
    </ul>
</nav>

<slot/>
