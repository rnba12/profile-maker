<script>
    import { signOut } from "@auth/sveltekit/client";
    import { page } from "$app/stores";

    $: linkName = $page.data.userInfo.linkName ?? "";
    $: profilePicture = $page.data.userInfo.image ?? "";
</script>

<div class="layout">
    <aside class="sidebar">
        <div class="sidebar-header">
            <img src={profilePicture} alt={linkName}>
            <span class="link-name">/{linkName}</span>
        </div>
        <nav>
            {#if linkName}
                <a href="/profile/{linkName}"><iconify-icon icon="ph:identification-card-light"></iconify-icon>Profile</a>
            {/if}
            <a href="/user/edit" class:active={$page.url.pathname === "/user/edit"}><iconify-icon icon="ph:user"></iconify-icon>Edit</a>
            <a href="/user/projects" class:active={$page.url.pathname === "/user/projects"}><iconify-icon icon="octicon:stack-24"></iconify-icon>Projects</a>
            <a href="/user/settings" class:active={$page.url.pathname === "/user/settings"}><iconify-icon icon="ph:gear"></iconify-icon>Settings</a>
        </nav>
        <button class="sign-out" on:click={() => signOut()}><iconify-icon icon="ph:sign-out"></iconify-icon> Sign Out</button>
    </aside>

    <div class="page">
        <main>
            <slot />
        </main>
    </div>
</div>

<style lang="scss">
    .layout {
        display: flex;
        width: 100%;
        height: 100vh;
    }
    .sidebar {
        position: relative;
        z-index: 1;
        flex-grow: 0;
        flex-shrink: 0;
        width: 200px;
        display: flex;
        flex-direction: column;
        border-right: 1px solid rgb(185, 185, 185);

        img {
            width: 45px;
            height: 45px;
            border-radius: 36px;
        }
    }
    .sidebar-header {
        padding: 1rem 0;
        font-size: 1.5rem;
        font-weight: 700;
        display: inline-flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.7rem;
        // border-bottom: 1px solid rgb(185, 185, 185);
    }
    .page {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }
    main {
        padding: 2rem;
        height: 100%;
    }
    nav {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        gap: 0.7rem;
    }

    a {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: left;
        text-decoration: none;
        padding: 0.5rem;
        gap: 5px;
        border-radius: 5px;
        color: black;
        font-weight: 400;
        font-size: 1.4rem;
        min-width: 130px;

        &:hover {
            background-color: rgb(195, 195, 195);
        }
        &.active {
            background-color: rgb(195, 195, 195);
        }
    }

    .link-name {
        font-weight: 500;
    }

    .sign-out {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        padding: 1rem;
        font-size: 1.4rem;
        font-weight: 400;
        margin-top: auto;
        background-color: inherit;
        border: none;

        &:hover {
            color: red;
        }
    }
</style>
