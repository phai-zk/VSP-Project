<script lang="ts">
	import { getIconForDistro } from "$lib/utils.js";
	import { type VM, type Log, type VM_Create } from "$lib/VM/utill";
	let formData: any = {
		distro: "",
		vmname: "",
		port: "",
		disk: "",
		ram: "",
		password: "",
	};
	export let updateData = (vm, createVM) => {};
	export let vms: VM[];

	function validInp() {
		if (
			!formData.distro ||
			!formData.vmname ||
			!formData.port ||
			!formData.disk ||
			!formData.ram
		) {
			alert("กรุณากรอกข้อมูลให้ครบถ้วน");
			return false;
		}
		return true;
	}

	function validType() {
		const { port, disk, ram } = formData;
		let isSamePort = false;
		vms.forEach((v) => {
			if (v.port == Number(port)) {
				alert("port " + port + " ไม่ว่าง");
				isSamePort = true;
				return ;
			}
		});
		if (isSamePort)
			return false;
		if (isNaN(port) || Number(port) < 9000) {
			alert("กรุณากรอก port เป็นตัวเลขที่มากกว่า 9000");
			return false;
		}
		if (isNaN(disk)) {
			alert("กรุณากรอก disk เป็นตัวเลข");
			return false;
		}
		if (isNaN(ram)) {
			alert("กรุณากรอก ram เป็นตัวเลข");
			return false;
		}
		return true;
	}

	function validName(name: string) {
		vms.forEach((v) => {
			if (v.vmname === name) {
				alert("ชื่อ " + name + " ถูกใช้ไปแล้ว");
				return false;
			}
		});
		return true;
	}

	function getNewVM() {
		return {
			distro: formData.distro,
			vmname: formData.vmname,
			name: formData.vmname.toLowerCase(),
			ip: formData.ip,
			port: formData.port,
			disk: formData.disk,
			ram: formData.ram,
			status: "running",
			icon: getIconForDistro(formData.distro),
		};
	}

	// Functions
	function createVM() {
		if (!validInp()) return ;

		if (!validType()) return ;

		if (!validName(formData.vmname)) return ;

		const newVM: VM = getNewVM();

		const responVM: VM_Create = {
			distro: newVM.distro,
			vmname: newVM.vmname,
			user: newVM.name.toLocaleLowerCase(),
			port: Number(newVM.port),
			disk: Number(newVM.disk),
			ram: Number(newVM.ram),
			password: formData.password,
		};

		updateData(newVM, responVM);

		// Reset form
		formData = {
			distro: "",
			vmname: "",
			port: "",
			disk: "",
			ram: "",
			password: "",
		};
	}
</script>

<!-- Create VM Form -->
<div class="create-vm-section w-full">
	<div class="form-title">create VM</div>
	<div class="grid grid-cols-2 gap-2">
		<input
			type="text"
			placeholder="name"
			bind:value={formData.vmname}
			class="input-field"
		/>
		<input
			type="text"
			placeholder="ram (MB)"
			bind:value={formData.ram}
			class="input-field"
		/>
		<select bind:value={formData.distro} class="input-field">
			<option value="">choose distribution</option>
			<option value="Ubuntu">Ubuntu</option>
			<option value="Debian">Debian</option>
		</select>
		<input
			type="text"
			placeholder="disk (GB)"
			bind:value={formData.disk}
			class="input-field"
		/>
		<input
			type="password"
			placeholder="password for root"
			bind:value={formData.password}
			class="input-field password-field"
		/>
		<input
			type="number"
			min={9000}
			placeholder="port"
			bind:value={formData.port}
			class="input-field"
		/>
		<div class="button-cell">
			<button class="create-btn" on:click={createVM}>create</button>
		</div>
	</div>
</div>
