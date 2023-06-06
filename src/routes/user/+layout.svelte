<script>
    import { page } from "$app/stores";
    import { signOut } from '@auth/sveltekit/client'
    import Toast from "$lib/components/Toast.svelte";
    import NavBar from "../../lib/components/NavBar.svelte";

    $: linkName = $page.data.userInfo.linkName ?? "";

</script>


<div class="user-layout">

    <div class="top-nav">
        <NavBar/>
    </div>


    <div class="content">
        <aside class="sidebar">
            <nav class="sidebar-nav">
                <a class="sidebar-item" href="/profile/{linkName}"><iconify-icon icon="ph:eye"></iconify-icon>View Profile</a>
                <a class="sidebar-item" href="/user/edit" class:active={$page.url.pathname === "/user/edit"}><iconify-icon icon="ph:user"></iconify-icon>Edit</a>
                <a class="sidebar-item" href="/user/projects" class:active={$page.url.pathname === "/user/projects"}><iconify-icon icon="octicon:stack-24"></iconify-icon>Projects</a>
                <a class="sidebar-item" href="/user/settings" class:active={$page.url.pathname === "/user/settings"}><iconify-icon icon="ph:gear"></iconify-icon>Settings</a>
                <a class="sidebar-item" href="#" on:click={signOut}><iconify-icon icon="ph:sign-out"></iconify-icon>Log Out</a>
            </nav>
        </aside>
    
        <div class="page">
            <main>
                <slot />
            </main>
        </div>
    
        {#if $page.form}
                <Toast message={$page.form.message} success={$page.form.success}/>
            {/if}
    </div>
</div>

<style lang="scss">
    .user-layout {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
    }
    .top-nav {
        padding: 0 1rem;
        z-index: 50;
        position: sticky;
        top: 0;
        left: 0;
        width: auto;
        height: 60px;
        border-bottom: 1px solid rgb(185, 185, 185);
        display: flex;
        align-items: center;

    }

    .content {
        display: flex;
        height: calc(100% - 61px);
    }
    .sidebar {
        background-color: white;
        position: relative;
        z-index: 1;
        flex-grow: 0;
        flex-shrink: 0;
        width: 200px;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-right: 1px solid rgb(185, 185, 185);
    }
    .page {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background-color: #f8f9fa;
    }
    main {
        padding: 2rem;
    }
    .sidebar-nav {
        padding-top: 1.2rem;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        gap: 0.7rem;
    }
    .sidebar-item {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: left;
        text-decoration: none;
        padding: 0.5rem;
        gap: 5px;
        border-radius: 5px;
        color: black;
        font-weight: 500;
        font-size: 1.2rem;
        min-width: 140px;

        &:hover {
            background-color: rgb(195, 195, 195);
        }
        &.active {
            background-color: rgb(195, 195, 195);
        }
    }

</style>
