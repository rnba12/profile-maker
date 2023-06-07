<script>
    import { page } from "$app/stores";
    import Toast from "$lib/components/Toast.svelte";
    import NavBar from "../../lib/components/NavBar.svelte";
    import Sidebar from "../../lib/components/Sidebar.svelte";

</script>


<div class="user-layout">

    <div class="top-nav">
        <NavBar/>
    </div>


    <div class="content">
        <Sidebar />
    
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
    
    .page {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background-color: #f8f9fa;
    }
    main {
        padding: 2rem 4rem;
    }

</style>
