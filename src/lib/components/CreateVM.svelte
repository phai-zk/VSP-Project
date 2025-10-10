<script>
	import { getIconForDistro } from "../utils.js";
		// Form data
	let formData = {
		name: "",
		ram: "",
		distribute: "",
		disk: "",
		password: "",
	};

	export let updateData = (vm) => {};

	// Functions
	function createVM() {
		if (
			!formData.name ||
			!formData.ram ||
			!formData.distribute ||
			!formData.disk ||
			!formData.password
		) {
			alert("กรุณากรอกข้อมูลให้ครบถ้วน");
			return;
		}

		const newVM = {
			id: vms.length + 1,
			name: formData.name,
			ip: `192.168.1.${100 + vms.length}`,
			status: "stop",
			ram: parseInt(formData.ram),
			disk: parseInt(formData.disk),
			distribute: formData.distribute,
			icon: getIconForDistro(formData.distribute),
		};

		updateData(newVM);

		// Reset form
		formData = {
			name: "",
			ram: "",
			distribute: "",
			disk: "",
			password: "",
		};
	}
</script>

<!-- Create VM Form -->
<div class="create-vm-section">
		<div class="form-title">create VM</div>
		<div class="form-grid">
				<input
						type="text"
						placeholder="name"
						bind:value={formData.name}
						class="input-field"
				/>
				<input
						type="text"
						placeholder="ram (MB)"
						bind:value={formData.ram}
						class="input-field"
				/>
				<select bind:value={formData.distribute} class="input-field">
						<option value="">choose distribution</option>
						<option value="Ubuntu">Ubuntu</option>
						<option value="Debian">Debian</option>
						<option value="Kali">Kali Linux</option>
						<option value="CentOS">CentOS</option>
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
				<div class="button-cell">
						<button class="create-btn" on:click={createVM}>create</button>
				</div>
		</div>
</div>