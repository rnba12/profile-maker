<script>
    import { signOut } from "@auth/sveltekit/client";
</script>

<nav class="flex flex-row gap-1 justify-center">
        <a class="font-bold border rounded-full p-2 hover:bg-slate-200" href="/user/edit">Edit</a>
        <a class="font-bold border rounded-full p-2 hover:bg-slate-200" href="/user/projects">Projects</a>
        <a class="font-bold border rounded-full p-2 hover:bg-slate-200" href="/user/settings">Settings</a>
        <button class="text-red-600 font-bold border rounded-full p-2 hover:bg-slate-200" on:click={() => signOut()}>Sign Out</button>
</nav>

<slot/>
