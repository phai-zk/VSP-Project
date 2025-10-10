<script lang="ts">
	import { type VM } from "$lib/VM/getAllVM";
    import { onMount } from "svelte";
	export let selectedVM: VM;
	export let closeModel = () => {};
	export let toggleVM = (vm: VM, toggleLoading: (i: boolean) => void) => {};

	function startVMFromModel() {
		toggleVM(selectedVM, setLoading);
		closeModel();
	}

	let loading = false;
	function setLoading(isload: boolean) {
		loading = isload;
	}
</script>

<div class="model-overlay" on:pointerup={closeModel}>
	<div class="model">
		<!-- on:pointerup={stopPropagation} -->
		<div class="model-header">
			<div class="model-icon">
				<img
					src={selectedVM.icon}
					alt={selectedVM.distro}
					class="vm-logo"
				/>
			</div>
			<span class="model-title">{selectedVM.name}</span>
			<button class="model-start-btn" on:pointerup={startVMFromModel}>
				{#if selectedVM.status === "stop"}
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="currentColor"
					>
						<circle
							cx="8"
							cy="8"
							r="7"
							stroke="currentColor"
							fill="none"
							stroke-width="1.5"
						/>
						<path d="M6 5 L11 8 L6 11 Z" fill="currentColor" />
					</svg>
				{:else}
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="currentColor"
					>
						<circle
							cx="8"
							cy="8"
							r="7"
							stroke="currentColor"
							fill="none"
							stroke-width="1.5"
						/>
						<rect
							x="5"
							y="5"
							width="6"
							height="6"
							fill="currentColor"
						/>
					</svg>
				{/if}
				<span>{selectedVM.status === "running" ? "stop" : "start"}</span
				>
			</button>
		</div>

		<div class="model-body">
			<div class="model-vm-name">{selectedVM.distro}</div>
			<div class="model-info">IP: {selectedVM.ip}</div>
			<div class="model-info">status: {selectedVM.status}</div>
			<div class="model-info">Ram: {selectedVM.ram} MB</div>
			<div class="model-info">
				Disk: {selectedVM.disk} GB
				<!-- (free {selectedVM.disk} GB) -->
			</div>
		</div>

		<button class="model-close-btn" on:pointerup={closeModel}>close</button>
	</div>
</div>
