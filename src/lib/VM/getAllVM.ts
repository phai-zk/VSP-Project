import { json } from '@sveltejs/kit';
import { getIconForDistro } from "../utils.js";
import { URL } from './baseURL.js';

export interface VMResponse {
	vmname: string;
	log: Log;
}

export interface Log {
	distro: string;
	vmname: string;
	name: string;
	ip: string;
	port: number;
	disk: number;
	ram: number;
	status: string;
}

export interface VM {
	distro: string;
	vmname: string;
	name: string;
	ip: string;
	port: number;
	disk: number;
	ram: number;
	status: string;
	icon: string;
}

export interface VM_Create {
	distro: string;
	vmname: string;
	user: string;
	port: number;
	disk: number;
	ram: number;
	password: string;
}

export async function getAllVM(): Promise<VM[]> {
	const res = await fetch(`${URL}/all-vm/`);
	if (!res.ok) {
		throw new Error('Failed to fetch VM data');
	}
	let respones: any = await res.json();
	let data: VMResponse[] = await JSON.parse(respones?.stdout);
	let info: VM[] = normalizeData(data);

	return info;
}

function normalizeData(data: VMResponse[]): VM[] {
	let info: VM[] = [];
	data.forEach((vm: VMResponse, i: number) => {
		let d = vm.log;
		info.push({
			...d,
			icon: getIconForDistro(d.distro),
			ip: d.ip ?? "0.0.0.0",
		} as VM)
	})
	return info;
}