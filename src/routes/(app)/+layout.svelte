<script>
import { signOut } from "@auth/sveltekit/client";
import { page } from '$app/stores';

</script>

<nav>
<h3>Profile Maker</h3>
<div class="nav-links">
    {#if $page.data.isSession}
    <a href="/user/edit" class:active={$page.url.pathname === '/user/edit'}>Edit</a>
    <a href="/user/projects" class:active={$page.url.pathname === '/user/projects'}>Projects</a>
    <a href="/user/settings" class:active={$page.url.pathname === '/user/settings'}>Settings</a>
    <button on:click={() => signOut()}>Sign Out</button>
    {:else}
        <a href="/">Sign In</a>
    {/if} 
</div>
</nav>

<main>
    <slot/>
</main>

<style lang="scss">
main {
        padding: 2rem;
        width: 75%;
        margin: auto;
}
nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 3rem;
    // background-color: white;

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
        border-bottom: 2px solid rgb(0, 136, 255);
    }
}
button {
    background-color: inherit;
    border: none;
    color: red;
    font-weight: 700;
    cursor: pointer;
}
</style>
