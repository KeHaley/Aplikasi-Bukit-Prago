"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var node_assert_1 = require("node:assert");
var Studio_js_1 = require("../Studio.js");
var View_js_1 = require("../View.js");
var ViewHost_js_1 = require("../ViewHost.js");
var studio = new Studio_js_1.Studio();
var workbench = studio
    .getShell()
    .getWorkbench();
var host = workbench.getViewHost();
node_assert_1.strict.ok(host instanceof ViewHost_js_1.ViewHost);
node_assert_1.strict.equal(host.hasActiveView(), false);
var dashboard = new View_js_1.View("dashboard", "Dashboard");
host.setActiveView(dashboard);
node_assert_1.strict.equal(host.hasActiveView(), true);
node_assert_1.strict.equal((_a = host.getActiveView()) === null || _a === void 0 ? void 0 : _a.id, "dashboard");
node_assert_1.strict.equal((_b = host.getActiveView()) === null || _b === void 0 ? void 0 : _b.title, "Dashboard");
host.clear();
node_assert_1.strict.equal(host.hasActiveView(), false);
console.log("View Host PASS");
