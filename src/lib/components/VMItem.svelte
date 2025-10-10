<script>
	export let vm = {};
	// Model state
	export let showVMDetails = (v) => {};
	export let toggleVM = (vm) => {};
	export let deleteVM = (vmId) => {};

</script>

<div class="vm-row data-row">
	<div class="vm-icon-cell">
		<div class="vm-icon">
			<img src={vm.icon} alt={vm.distribute} class="vm-logo" />
		</div>
	</div>
	<div class="vm-name-cell">{vm.name}</div>
	<div class="vm-ip-cell">{vm.ip}</div>
	<div class="vm-status-cell">
		<div class="status-indicator {vm.status}">
			<div class="status-dot"></div>
			<span class="status-text">{vm.status}</span>
		</div>
	</div>
	<div class="vm-actions-cell">
		<button
			class="action-btn play-btn"
			on:pointerup={() => toggleVM(vm)}
			title={vm.status === "running" ? "Stop" : "Start"}
		>
			{#if vm.status === "stop"}
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
		</button>
		<button
			class="action-btn info-btn"
			on:pointerup={() => showVMDetails(vm)}
			title="Info"
		>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
				<circle
					cx="8"
					cy="8"
					r="7"
					stroke="currentColor"
					stroke-width="1.5"
				/>
				<text
					x="8"
					y="12"
					text-anchor="middle"
					fill="currentColor"
					font-size="10"
					font-weight="bold">i</text
				>
			</svg>
		</button>
		<button
			class="action-btn delete-btn"
			on:pointerup={() => deleteVM(vm.id)}
			title="Delete"
		>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
				<path
					d="M5 3V2h6v1h3v1H2V3h3zm1 2h4v8H6V5zm-1 9h6a1 1 0 001-1V5H4v8a1 1 0 001 1z"
				/>
			</svg>
		</button>
	</div>
</div>
