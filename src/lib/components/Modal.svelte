<script>
	import { createEventDispatcher } from "svelte";
	export let showModal; // boolean

	let dispatch = createEventDispatcher()

	let dialog; // HTMLDialogElement

    export const close = () => dialog.close();

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => {
		showModal = false
		dispatch("exit")
	}}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>&#x2715</button>
		<slot />
	</div>
</dialog>

<style lang="scss">
	dialog {
		border-radius: 10px;
		border: none;
		padding: 0;
		width: fit-content;
		height: fit-content;
	}
	dialog:modal {
		overflow: hidden;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
		border: none;
		&:hover {
			background-color: rgb(225,225,225);
		}
	}
</style>
