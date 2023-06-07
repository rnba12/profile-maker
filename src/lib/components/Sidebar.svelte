<script>
    import { page } from '$app/stores';
    import { signOut } from '@auth/sveltekit/client'

    $: linkName = $page.data.userInfo.linkName ?? "";

</script>

<aside class="sidebar">
    <nav class="sidebar-nav">
        <a class="sidebar-item" href="/profile/{linkName}"><iconify-icon icon="ph:eye"></iconify-icon><span>View Profile</span></a>
        <a class="sidebar-item" href="/user/edit" class:active={$page.url.pathname === "/user/edit"}><iconify-icon icon="ph:user"></iconify-icon><span>Edit</span></a>
        <a class="sidebar-item" href="/user/projects" class:active={$page.url.pathname === "/user/projects"}><iconify-icon icon="octicon:stack-24"></iconify-icon><span>Projects</span></a>
        <a class="sidebar-item" href="/user/settings" class:active={$page.url.pathname === "/user/settings"}><iconify-icon icon="ph:gear"></iconify-icon><span>Settings</span></a>
    </nav>
        <a class="sidebar-item log-out-btn" href="#" on:click={signOut}><iconify-icon icon="ph:sign-out"></iconify-icon><span>Log Out</span></a>
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
        align-items: center;
        border-right: 1px solid rgb(218, 218, 218);
        transition: all 0.2s;
    }
    .sidebar-nav {
        padding-top: 1rem;
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
        min-width: 150px;

        &:hover {
            background-color: rgb(200, 200, 200);
        }
        &.active {
            background-color: rgb(200, 200, 200);
        }
        &:active {
            background-color: rgb(161, 161, 161);
        }
        transition: all 0.1s;
    }
    .log-out-btn {
        margin-top: auto;
        margin-bottom: 0.6rem;
    }
    
</style>
