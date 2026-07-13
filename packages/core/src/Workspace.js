"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workspace = void 0;
var WorkspaceVersion_js_1 = require("./WorkspaceVersion.js");
var Workspace = /** @class */ (function () {
    function Workspace() {
        this.name = WorkspaceVersion_js_1.WORKSPACE_NAME;
        this.version = WorkspaceVersion_js_1.WORKSPACE_VERSION;
    }
    return Workspace;
}());
exports.Workspace = Workspace;
