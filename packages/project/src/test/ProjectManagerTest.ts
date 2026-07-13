import { ProjectManager } from "../ProjectManager.js";

const manager = new ProjectManager();

const project = manager.create("Bukit Prago");

const configuration =
    manager.createConfiguration();

if (project.name !== "Bukit Prago") {

    throw new Error(
        "Nama project salah."
    );

}

if (project.rootPath !== "") {

    throw new Error(
        "Root path salah."
    );

}

if (project.files.length !== 0) {

    throw new Error(
        "Files awal harus kosong."
    );

}

if (configuration.workspaceVersion !== "1.0.0") {

    throw new Error(
        "Workspace version salah."
    );

}

console.log("");
console.log("======================================");
console.log("Project Manager Test PASSED");
console.log("======================================");