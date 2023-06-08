<script>
    import { page } from '$app/stores';

    $: userInfo = $page.data.userInfo;
    // let menu;
    // let menuButton;

    // const handlePopup = () => {
    //     showPopUpMenu = !showPopUpMenu
    // }

    // export const closePopUp = (e) => {
    //     if (!e.composedPath().includes(menuButton)) {
    //         if (!e.composedPath().includes(menu) && showPopUpMenu) {
    //             showPopUpMenu = false
    //         } 
    //     }
    // }
    // let showPopUpMenu = false;

</script>

<div class="top-nav-header">
    <div class="logo">Profile Maker&nbsp;</div>
    <div class="current-view"> / {$page.url.pathname.split("/")[2]}</div>
</div>
<div class="top-nav-menu"> 
    <a href="/help">
        <iconify-icon icon="material-symbols:help-outline"></iconify-icon>
    </a>
    <a href="https://www.github.com/rnba12/profile-maker" target="_blank">
        <iconify-icon icon="mdi:github"></iconify-icon>
    </a>  
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div>
        <div class="account">
            {#if userInfo}
            <span>{userInfo.linkName}</span>
                <img src={userInfo.image} alt={userInfo.linkName}>
            {/if}
        </div>
        
        <!-- keeping this here just in case -->

        <!-- <div class="popup-menu" bind:this={menu} style={showPopUpMenu ? "" : "display: none"}>
            <nav class="popup-nav" aria-label="Account Menu">
                <a class="popup-item" href="/profile/{linkName}">View Profile</a>
                <div class="popup-item">Light Mode</div>
                <div class="popup-item" on:click={signOut}><iconify-icon icon="ph:sign-out"></iconify-icon>Log Out</div>
            </nav>
        </div> -->

    </div>
</div>

<style lang="scss">
    .top-nav-header {
        display: flex;
        align-items: center;
        height: 100%;
    }
    img {
            height: 30px;
            width: auto;
            border-radius: 48px;
        }
    .top-nav-menu {
        position: relative;
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        a {
            font-size: 1.4em;
            display: inline-flex;
            align-items: center;
            color: inherit;
        }
    }

    .logo {
        font-size: 1.3rem;
        font-weight: 700;
    }
    .current-view {
        font-size: 1.3rem;
        &::first-letter{
            text-transform: capitalize;
        }
    }
    .account {
        display: flex;
        align-items: center;
        gap: 0.4em;
    }
    // .popup-menu {
    //     margin: 1rem;
    //     padding: 1rem 0;
    //     z-index: 99;
    //     position: absolute;
    //     top: 100%;
    //     right: 0;
    //     width: 200px;
    //     border: 1px solid rgb(185, 185, 185);
    //     background-color: white;
    //     border-radius: 10px;
    // }
    // .popup-item {
    //     text-align: center;
    //     border: none;
    //     border-radius: 0;
    //     height: 2rem;
    //     width: 100%;
    //     display: inline-flex;
    //     flex-direction: row;
    //     justify-content: center;
    //     background-color: white;
    //     text-decoration: none;
    //     &:hover {
    //         background-color: rgb(185, 185, 185);
    //     }
    // }
</style>
