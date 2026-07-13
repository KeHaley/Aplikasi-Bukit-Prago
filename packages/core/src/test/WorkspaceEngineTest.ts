import { strict as assert } from "node:assert";

import { WorkspaceEngine } from "../WorkspaceEngine.js";

const engine = new WorkspaceEngine();

assert.equal(
    engine.getWorkspace().name,
    "BPV4 Workspace"
);

assert.equal(
    engine.getWorkspace().version,
    "1.0.0"
);

console.log("WorkspaceEngineTest PASS");