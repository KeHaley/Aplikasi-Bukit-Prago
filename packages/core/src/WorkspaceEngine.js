"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceEngine = void 0;
var Workspace_js_1 = require("./Workspace.js");
var WorkspaceEngine = /** @class */ (function () {
    function WorkspaceEngine() {
        this.workspace = new Workspace_js_1.Workspace();
    }
    WorkspaceEngine.prototype.getWorkspace = function () {
        return this.workspace;
    };
    return WorkspaceEngine;
}());
exports.WorkspaceEngine = WorkspaceEngine;
