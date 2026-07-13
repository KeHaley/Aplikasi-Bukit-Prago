import { strict as assert } from "node:assert";

import { DeploymentConfiguration } from "../DeploymentConfiguration.js";
import { WorkspaceDeployment } from "../WorkspaceDeployment.js";

const deployment = new WorkspaceDeployment();

const result = deployment.deploy(

    new DeploymentConfiguration(

        "BPV4",

        "Google Apps Script"

    )

);

assert.equal(
    result.success,
    true
);

assert.equal(
    result.message,
    "Deployment validation passed."
);

console.log("WorkspaceDeploymentTest PASS");