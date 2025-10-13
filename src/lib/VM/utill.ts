// export let URL: string = "https://vsp-project.vercel.app/api";
// export let URL: string = "http://pub.dmaltzi.com:8000/";
export let URL: string = "https://apios.dmaltzi.com";
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