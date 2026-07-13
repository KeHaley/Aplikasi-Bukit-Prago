import { strict as assert } from "node:assert";

import { DocumentService } from "../DocumentService.js";

const service = new DocumentService();

const document = service.create(
    "Developer Guide",
    "Hello BPV4"
);

const summary = service.getSummary(document);

assert.equal(
    summary.title,
    "Developer Guide"
);

assert.equal(
    summary.contentLength,
    10
);

assert.equal(
    summary.healthy,
    true
);

assert.equal(
    service.isHealthy(document),
    true
);

console.log("");
console.log("======================================");
console.log("Document Service Test PASSED");
console.log("======================================");