<script lang="ts">
	import { type VM } from "$lib/VM/utill";
	import Loading from "./icon/Loading.svelte";
	import { onMount } from "svelte";
    import StartBTN from "./icon/StartBTN.svelte";
    import StopBTN from "./icon/StopBTN.svelte";
	export let selectedVM: VM;
	export let closeModel = () => {};
	export let toggleVM = (vm: VM) => {};

	function startVMFromModel() {
		toggleVM(selectedVM);
		closeModel();
	}

	export let loading = false;
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
				{#if loading}
					<Loading size={16} />
				{:else if selectedVM.status === "stop"}
					<StopBTN w={16} h={16} />
				{:else}
					<StartBTN w={16} h={16} />
				{/if}
				<span>{selectedVM.status === "running" ? "stop" : "start"}</span
				>
			</button>
		</div>

		<div class="model-body">
			<div class="model-vm-name">{selectedVM.distro}</div>
			<div class="model-info">IP: {selectedVM.ip}</div>
			<div class="model-info">port: {selectedVM.port}</div>
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
