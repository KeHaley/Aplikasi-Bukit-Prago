import { ReleaseInfo } from "../ReleaseInfo.js";

const info =
    new ReleaseInfo();

if (info.product !== "BPV4 Analyzer") {

    throw new Error("Product salah.");

}

if (info.version !== "1.0.0") {

    throw new Error("Version salah.");

}

if (info.status !== "Production Ready") {

    throw new Error("Status salah.");

}

console.log("");
console.log("======================================");
console.log("Release Info Test PASSED");
console.log("======================================");

console.log(info);