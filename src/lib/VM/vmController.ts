import { json } from '@sveltejs/kit';
import { type VM_Create, type VM } from "./utill"
import { URL } from "./utill"

export async function create_vm(vm: VM_Create) {
	const res = await fetch(`${URL}/create-vm/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer your_token_here"
		},
		body: JSON.stringify({ ...vm })
	});

	console.log("Create Log ");

	if (!res.ok) {
		throw new Error('Failed to fetch VM data');
	}
	const data = await res.json();
	console.log(data);
	return data;
}

export async function start_vm(vm: string) {
	const res = await fetch(`${URL}/start-vm/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer your_token_here"
		},
		body: JSON.stringify({ vmname: vm })
	});

	if (!res.ok) {
		throw new Error('Failed to fetch VM data');
	}
	const data = await res.json();
	console.log(data);
	return data;
}

export async function stop_vm(vm: string) {
	console.log("Stop");

	const res = await fetch(`${URL}/stop-vm/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer your_token_here"
		},
		body: JSON.stringify({ vmname: vm })
	});

	if (!res.ok) {
		throw new Error('Failed to fetch VM data');
	}
	const data = await res.json();
	console.log(data);
	return data;
}

export async function delete_vm(vm: string) {
	const res = await fetch(`${URL}/remove-vm/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer your_token_here"
		},
		body: JSON.stringify({ vmname: vm })
	});

	if (!res.ok) {
		throw new Error('Failed to fetch VM data');
	}
	const data = await res.json();
	console.log(data);

	return data;
}