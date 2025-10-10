<script>
	import { onMount } from "svelte";
	import CreateVM from "../lib/components/CreateVM.svelte";
	import VMRow from "../lib/components/VMItem.svelte";
	import VMDetail from "../lib/components/VMDetail.svelte";
	import { getIconForDistro } from "../lib/utils.js";
	import "../lib/css/global.css";

	let vms = [];
	onMount(async () => {
		vms = await loadData();
		console.log(vms);
	});
	async function loadData() {
		return [
			{
				id: 1,
				name: "SuperLinux",
				ip: "133.333.333.333",
				status: "running",
				ram: 4096,
				disk: 50,
				distribute: "Debian",
				icon: getIconForDistro("Debian"),
			},
			{
				id: 2,
				name: "Katihaha",
				ip: "133.333.222.332",
				status: "stop",
				ram: 2048,
				disk: 30,
				distribute: "Ubuntu",
				icon: getIconForDistro("Ubuntu"),
			},
			{
				id: 3,
				name: "GGOS",
				ip: "4.23.5.12",
				status: "stop",
				ram: 1024,
				disk: 20,
				distribute: "CentOS",
				icon: getIconForDistro("CentOS"),
			},
		];
	}

	let showModel = false;
	let selectedVM = null;

	function closeModel() {
		showModel = false;
		selectedVM = null;
	}

	function showVMDetails(vm) {
		selectedVM = vm;
		showModel = true;
		console.log(vm + "\n" + showModel);
	}

	function toggleVM(vm) {
		vms = vms.map((v) =>
			(v.id === vm.id)
				? { ...v, status: v.status === "running" ? "stop" : "running" }
				: v,
		);
	}

	function deleteVM(vmId) {
		if (confirm("คุณต้องการลบ VM นี้หรือไม่?")) {
			vms = vms.filter((v) => v.id !== vmId);
		}
	}

	function updateData(newVM) {
		vms = [...vms, newVM];
	}
	console.log(vms);
</script>

<div class="app">
	<div class="container">
		<CreateVM {updateData} />
		<!-- VM List -->
		<div class="vm-row header-row">
			<div class="vm-icon-cell"></div>
			<div class="vm-name-cell">VM name</div>
			<div class="vm-ip-cell">IP</div>
			<div class="vm-status-cell">Status</div>
			<div class="vm-actions-cell">Actions</div>
		</div>
		{#each vms as vm (vm.id)}
			<VMRow {vm} {showModel} {showVMDetails} {toggleVM} {deleteVM} />
		{/each}
	</div>
</div>

<!-- Model -->
{#if showModel && selectedVM}
	<VMDetail {selectedVM} {closeModel} {toggleVM} />
{/if}
