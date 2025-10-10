export function getIconForDistro(distro) {
    console.log(distro);

    const name = distro.toLowerCase();
    if (name.includes("ubuntu"))
        return "https://assets.ubuntu.com/v1/49a1a858-favicon-32x32.png";
    if (name.includes("debian")) return "https://www.debian.org/favicon.ico";
    if (name.includes("kali")) return "https://www.kali.org/images/favicon.ico";
    if (name.includes("centos"))
        return "https://www.centos.org/assets/img/favicon.png";
    return "https://cdn-icons-png.flaticon.com/512/888/888882.png";
}