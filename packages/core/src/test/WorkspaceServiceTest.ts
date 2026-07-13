import { strict as assert } from "node:assert";

import { WorkspaceService } from "../WorkspaceService.js";

const service = new WorkspaceService();

const session = service.createSession();

const context = session.getContext();

const summary = service.getWorkspaceSummary();

assert.equal(
    summary.name,
    "BPV4 Workspace"
);

assert.equal(
    summary.version,
    "1.0.0"
);

assert.equal(
    summary.healthy,
    true
);

assert.equal(
    context.configuration.workspaceVersion,
    "1.0.0"
);

assert.equal(
    session.isReady(),
    true
);

assert.equal(
    service.validate(),
    true
);

assert.equal(
    service.isHealthy(),
    true
);

console.log("");
console.log("======================================");
console.log("Workspace Service Test PASSED");
console.log("======================================");