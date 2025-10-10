<script lang="ts">
	import { onMount } from "svelte";
	import { getAllVM, type VM, type VMResponse} from "../lib/VM/getAllVM";
	import { start_vm, stop_vm, delete_vm, create_vm} from "../lib/VM/vmController"
	import CreateVM from "../lib/components/CreateVM.svelte";
	import VMRow from "../lib/components/VMItem.svelte";
	import VMDetail from "../lib/components/VMDetail.svelte";
	import "../lib/css/global.css";

	let vms: VM[] = [];
	onMount(async () => {
		vms = await getAllVM();
		console.log(vms);
	});

	let showModel = false;
	let selectedVM = null;

	function closeModel() {
		showModel = false;
		selectedVM = null;
	}

	function showVMDetails(vm) {
		selectedVM = vm;
		showModel = true;
	}

	async function toggleVM(vm: VM, toggleLoading: (i: boolean) => void) {
		toggleLoading(true);
		let res;
		if (vm.status === "running")
			res = await stop_vm(vm.vmname);
		else
			res = await start_vm(vm.vmname);

		if (!res.status) {
			alert(res?.stdout)
			toggleLoading(false);
			return ;
		}

		vms = vms.map((v) =>
			v.vmname === vm.vmname
				? { ...v, status: v.status === "running" ? "stop" : "running" }
				: v,
		);
		toggleLoading(false);
	}

	async function deleteVM(vmname: string) {
		if (confirm("คุณต้องการลบ VM" + vmname + " หรือไม่?")) {
			let res = await delete_vm(vmname)
			if (!res.status)
				alert(res.stdout)
			console.log(res);
			vms = vms.filter((v) => v.vmname !== vmname);
		}
	}

	function updateData(newVM: VM) {

		vms = [...vms, newVM]
	}
</script>

<div class="app">
	<div class="container">
		<CreateVM {vms} {updateData} />
		<!-- VM List -->
		<div class="vm-row header-row">
			<div class="vm-icon-cell"></div>
			<div class="vm-name-cell">VM name</div>
			<div class="vm-ip-cell">IP</div>
			<div class="vm-status-cell">Status</div>
			<div class="vm-actions-cell">Actions</div>
		</div>
		{#each vms as vm (vm.vmname)}
			<VMRow {vm} {showVMDetails} {toggleVM} {deleteVM} />
		{/each}
	</div>
</div>

<!-- Model -->
{#if showModel && selectedVM}
	<VMDetail {selectedVM} {closeModel} {toggleVM} />
{/if}
