<script>
    import { page } from '$app/stores';
    import { signOut } from '@auth/sveltekit/client'

    $: linkName = $page.data.userInfo.linkName ?? "";

</script>

<aside class="sidebar">
    <nav class="sidebar-nav">
        <a class="sidebar-item" href="/profile/{linkName}"><iconify-icon icon="ph:eye"></iconify-icon>View Profile</a>
        <a class="sidebar-item" href="/user/edit" class:active={$page.url.pathname === "/user/edit"}><iconify-icon icon="ph:user"></iconify-icon>Edit</a>
        <a class="sidebar-item" href="/user/projects" class:active={$page.url.pathname === "/user/projects"}><iconify-icon icon="octicon:stack-24"></iconify-icon>Projects</a>
        <a class="sidebar-item" href="/user/settings" class:active={$page.url.pathname === "/user/settings"}><iconify-icon icon="ph:gear"></iconify-icon>Settings</a>
        <a class="sidebar-item" href="#" on:click={signOut}><iconify-icon icon="ph:sign-out"></iconify-icon>Log Out</a>
    </nav>
</aside>

<style lang="scss">
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
