<script lang="ts">
	import "../VM/vmController";
	import { type VM } from "$lib/VM/utill";
	import StartBTN from "./icon/StartBTN.svelte";
	import StopBTN from "./icon/StopBTN.svelte";
	import Info from "./icon/Info.svelte";
	import Trash from "./icon/Trash.svelte";
	import Loading from "./icon/Loading.svelte";
    import Refesh from "./icon/Refesh.svelte";

	export let vm: VM;
	export let selectedVM: VM | null;
	export let showVMDetails = (vm: VM) => {};
	export let toggleVM = (vm: VM) => {};
	export let deleteVM = (vm: string) => {};
	export let rebootVM = (vm: VM) => {};

	export let loading: boolean;
</script>

<div class="vm-row data-row">
	<div class="vm-icon-cell">
		<div class="vm-icon">
			<img src={vm.icon} alt={vm.distro} class="vm-logo" />
		</div>
	</div>
	<div class="vm-name-cell">{vm.name}</div>
	<div class="vm-ip-cell sm:flex hidden">{vm.ip}</div>
	<div class="vm-status-cell">
		<div class="status-indicator {vm.status}">
			<div class="status-dot"></div>
			<span class="status-text sm:flex hidden">{vm.status}</span>
		</div>
	</div>
	<div class="vm-actions-cell">
		<button
			class="action-btn play-btn"
			on:pointerup={() => {
				selectedVM === vm;
				if (!loading) toggleVM(vm);
			}}
			title={vm.status === "running" ? "Stop" : "Start"}
		>
			{#if loading && selectedVM === vm}
				<Loading size={16} />
			{:else if vm.status === "stop"}
				<StopBTN w={16} h={16} />
			{:else}
				<StartBTN w={16} h={16} />
			{/if}
		</button>
		<button
			class="action-btn reboot-btn"
			on:click={() => rebootVM(vm)}
			title="Reboot"
			disabled={vm.status === "stop"}
		>
			<Refesh w={16} h={16} />
		</button>
		<button
			class="action-btn info-btn"
			on:pointerup={() => showVMDetails(vm)}
			title="Info"
		>
			<Info w={16} h={16} />
		</button>
		<button
			class="action-btn delete-btn"
			on:pointerup={() => deleteVM(vm.vmname)}
			title="Delete"
		>
			<Trash w={16} h={16} />
		</button>
	</div>
</div>
