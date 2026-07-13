import { strict as assert } from "node:assert";

import { View } from "../View.js";
import { WorkspaceUI } from "../WorkspaceUI.js";

const ui = new WorkspaceUI();

ui.register(

    new View(

        "home",

        "Home"

    )

);

assert.equal(

    ui.getViews().length,

    1

);

assert.equal(

    ui.getViews()[0].title,

    "Home"

);

console.log("WorkspaceUITest PASS");