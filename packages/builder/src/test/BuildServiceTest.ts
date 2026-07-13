import { strict as assert } from "node:assert";

import { BuildContext } from "../BuildContext.js";
import { BuildService } from "../BuildService.js";

const service = new BuildService();

const context = new BuildContext(
    "./workspace",
    "./dist"
);

const result = service.build(context);

const summary = service.getBuildSummary(result);

assert.equal(summary.success, true);
assert.equal(summary.warningCount, 0);
assert.equal(summary.errorCount, 0);
assert.equal(summary.healthy, true);

assert.equal(
    service.isHealthy(result),
    true
);

console.log("");
console.log("======================================");
console.log("Build Service Test PASSED");
console.log("======================================");