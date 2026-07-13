import { strict as assert } from "node:assert";

import { BuildContext } from "../BuildContext.js";
import { WorkspaceBuilder } from "../WorkspaceBuilder.js";

const builder = new WorkspaceBuilder();

const result = builder.build(

    new BuildContext(
        ".",
        "./dist"
    )

);

assert.equal(
    result.success,
    true
);

assert.equal(
    result.errors.length,
    0
);

console.log("WorkspaceBuilderTest PASS");