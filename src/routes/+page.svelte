<script lang="ts">
	import { onMount } from "svelte";
	import { type VM, type VM_Create, type VMResponse } from "$lib/VM/utill";
	import { getAllVM } from "$lib/VM/getAllVM";
	import {
		start_vm,
		stop_vm,
		delete_vm,
		create_vm,
		reboot_vm,
	} from "$lib/VM/vmController";
	import CreateVM from "$lib/components/CreateVM.svelte";
	import VMRow from "$lib/components/VMItem.svelte";
	import VMDetail from "$lib/components/VMDetail.svelte";
	import "$lib/css/global.css";

	let vms: VM[] = [];
	onMount(async () => {
		vms = await getAllVM();
		console.log(vms);
	});

	let showModel = false;
	let selectedVM = null;
	let loading = false;

	function closeModel() {
		showModel = false;
		selectedVM = null;
	}

	function showVMDetails(vm) {
		selectedVM = vm;
		showModel = true;
	}

	function toggleLoading(b: boolean) {
		loading = b;
	}

	async function toggleVM(vm: VM) {
		toggleLoading(true);
		let res;
		let status = vm.status;
		vms = vms.map((v) =>
			v.vmname === vm.vmname ? { ...v, status: "loading" } : v,
		);
		if (status === "running") res = await stop_vm(vm.vmname);
		else res = await start_vm(vm.vmname);

		if (!res.status) {
			alert(res?.stdout);
			toggleLoading(false);
			return;
		}

		vms = vms.map((v) =>
			v.vmname === vm.vmname
				? { ...v, status: status === "running" ? "stop" : "running" }
				: v,
		);
		toggleLoading(false);
	}

	async function deleteVM(vmname: string) {
		if (confirm("คุณต้องการลบ VM " + vmname + " หรือไม่?")) {
			console.log("Remove ...");

			vms = vms.map((v) =>
				v.vmname === vmname ? { ...v, status: "loading" } : v,
			);

			let res = await delete_vm(vmname);
			if (!res.status) {
				alert(res.stdout);
				return;
			}
			console.log(res);
			vms = vms.filter((v) => v.vmname !== vmname);
		}
	}

	async function rebootVM(vm: VM) {
		console.log("Reboot ...");
		vms = vms.map((v) =>
			v.vmname === vm.vmname ? { ...v, status: "reboot" } : v,
		);
		let res = await reboot_vm(vm.vmname);
		if (!res.status) {
			alert(res.stdout);
			return;
		}
		console.log(res);
		vms = vms.map((v) =>
			v.vmname === vm.vmname ? { ...v, status: "running" } : v,
		);
	}

	async function updateData(newVM: VM, createVM: VM_Create) {
		console.log("Create ...");
		let res = await create_vm(createVM);
		if (!res.status) {
			alert(res.stdout);
			return;
		}
		console.log(res);
		vms = [...vms, newVM];
	}
</script>

<div class="app">
	<div class="container">
		<CreateVM {vms} {updateData} />
		<!-- VM List -->
		<div class="vm-row header-row">
			<div class="vm-icon-cell"></div>
			<div class="vm-name-cell">VM name</div>
			<div class="vm-ip-cell sm:flex hidden">IP</div>
			<div class="vm-status-cell">Status</div>
			<div class="vm-actions-cell">Actions</div>
		</div>
		{#each vms as vm (vm.vmname)}
			<VMRow
				{vm}
				{loading}
				{selectedVM}
				{rebootVM}
				{showVMDetails}
				{toggleVM}
				{deleteVM}
			/>
		{/each}
	</div>
</div>

<!-- Model -->
{#if showModel && selectedVM}
	<VMDetail {selectedVM} {loading} {closeModel} {toggleVM} />
{/if}
