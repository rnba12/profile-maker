<script>
import { signOut } from "@auth/sveltekit/client";
import { page } from '$app/stores';

$: linkName = $page.data.linkName ?? ""


</script>

<nav>
<h3>Profile Maker <span class="link-name">/{linkName.linkName}</span></h3>
<div class="nav-links">
    {#if linkName}
    <a href="/profile/{linkName.linkName}">Profile</a>
    {/if}
    <a href="/user/edit" class:active={$page.url.pathname === '/user/edit'}>Edit</a>
    <a href="/user/projects" class:active={$page.url.pathname === '/user/projects'}>Projects</a>
    <a href="/user/settings" class:active={$page.url.pathname === '/user/settings'}>Settings</a>
    <button on:click={() => signOut()}>Sign Out</button>
</div>
</nav>

<main>
    <slot/>
</main>

<style lang="scss">
main {
        padding: 2rem;
        width: 80%;
        margin: auto;
}
nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 3rem;
    background-color: white;
    border-bottom: 1px solid rgb(185, 185, 185);

    .nav-links {
        height: 100%;
        width: fit-content;
        vertical-align: middle;
    }
}

a {
    display: inline-flex;
    margin: auto;
    align-items: center;
    margin-left: 0.6rem;
    margin-right: 0.6rem;
    text-decoration: none;
    color: black;
    font-weight: 500;
    height: 100%;
    &:hover {
        color: rgb(0, 136, 255);
    }
    &.active {
        color: rgb(0, 136, 255);
    }
}
    .link-name {
        font-weight: 400;
    }
    button {
        background-color: inherit;
        border: none;
        color: red;
        font-weight: 700;
        cursor: pointer;
    }
</style>
