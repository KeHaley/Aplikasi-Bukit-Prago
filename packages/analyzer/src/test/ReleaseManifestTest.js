"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReleaseManifest_1 = require("../ReleaseManifest");
var manifest = new ReleaseManifest_1.ReleaseManifest();
if (manifest.product !== "BPV4 Analyzer") {
    throw new Error("Product salah.");
}
if (manifest.version !== "1.0.0") {
    throw new Error("Version salah.");
}
if (manifest.architecture !== "Stable") {
    throw new Error("Architecture harus Stable.");
}
console.log("");
console.log("======================================");
console.log("Release Manifest Test PASSED");
console.log("======================================");
console.log(manifest);
