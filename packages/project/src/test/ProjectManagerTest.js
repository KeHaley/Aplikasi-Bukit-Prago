"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProjectManager_js_1 = require("../ProjectManager.js");
var manager = new ProjectManager_js_1.ProjectManager();
var project = manager.create("Bukit Prago");
var configuration = manager.createConfiguration();
if (project.name !== "Bukit Prago") {
    throw new Error("Nama project salah.");
}
if (project.version !== "1.0.0") {
    throw new Error("Versi project salah.");
}
if (configuration.workspaceVersion !== "1.0.0") {
    throw new Error("Workspace version salah.");
}
console.log("");
console.log("======================================");
console.log("Project Manager Test PASSED");
console.log("======================================");
