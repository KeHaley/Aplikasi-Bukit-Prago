import { strict as assert } from "node:assert";

import { Studio } from "../Studio.js";
import { View } from "../View.js";
import { ViewHost } from "../ViewHost.js";

const studio = new Studio();

const workbench = studio
    .getShell()
    .getWorkbench();

const host = workbench.getViewHost();

assert.ok(
    host instanceof ViewHost
);

assert.equal(
    host.hasActiveView(),
    false
);

const dashboard = new View(
    "dashboard",
    "Dashboard"
);

host.setActiveView(dashboard);

assert.equal(
    host.hasActiveView(),
    true
);

assert.equal(
    host.getActiveView()?.id,
    "dashboard"
);

assert.equal(
    host.getActiveView()?.title,
    "Dashboard"
);

host.clear();

assert.equal(
    host.hasActiveView(),
    false
);

console.log("View Host PASS");