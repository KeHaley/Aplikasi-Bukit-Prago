import { strict as assert } from "node:assert";

import { WorkspaceService } from "../WorkspaceService.js";

const service = new WorkspaceService();

assert.equal(
    service.getWorkspaceName(),
    "BPV4 Workspace"
);

assert.equal(
    service.getWorkspaceVersion(),
    "1.0.0"
);

assert.ok(
    service.getRuntime().engine
);

assert.ok(
    service.getRuntime().projectManager
);

console.log("");
console.log("======================================");
console.log("Workspace Runtime Test PASSED");
console.log("======================================");