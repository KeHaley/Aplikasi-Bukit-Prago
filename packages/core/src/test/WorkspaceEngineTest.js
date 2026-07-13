"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_assert_1 = require("node:assert");
var WorkspaceEngine_js_1 = require("../WorkspaceEngine.js");
var engine = new WorkspaceEngine_js_1.WorkspaceEngine();
node_assert_1.strict.equal(engine.getWorkspace().name, "BPV4 Workspace");
node_assert_1.strict.equal(engine.getWorkspace().version, "1.0.0");
console.log("WorkspaceEngineTest PASS");
