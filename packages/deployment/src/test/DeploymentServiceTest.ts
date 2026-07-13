import { strict as assert } from "node:assert";

import { DeploymentConfiguration } from "../DeploymentConfiguration.js";
import { DeploymentService } from "../DeploymentService.js";
import { DeploymentStatus } from "../DeploymentStatus.js";

const service = new DeploymentService();

const configuration = new DeploymentConfiguration(
    "PROJECT_ID",
    "Google Apps Script"
);

const result = service.deploy(configuration);

const metadata = service.getMetadata(
    configuration
);

assert.equal(
    metadata.projectId,
    "PROJECT_ID"
);

assert.equal(
    metadata.deploymentTarget,
    "Google Apps Script"
);

assert.ok(
    metadata.createdAt instanceof Date
);

assert.equal(
    service.getStatus(result),
    DeploymentStatus.Success
);

console.log("");
console.log("======================================");
console.log("Deployment Service Test PASSED");
console.log("======================================");