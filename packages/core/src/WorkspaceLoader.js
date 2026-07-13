"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceLoader = void 0;
var WorkspaceContext_js_1 = require("./WorkspaceContext.js");
var WorkspaceEngine_js_1 = require("./WorkspaceEngine.js");
var project_1 = require("@bpv4/project");
var WorkspaceLoader = /** @class */ (function () {
    function WorkspaceLoader() {
        this.engine = new WorkspaceEngine_js_1.WorkspaceEngine();
        this.projectManager = new project_1.ProjectManager();
    }
    WorkspaceLoader.prototype.load = function () {
        return new WorkspaceContext_js_1.WorkspaceContext(this.engine.getWorkspace(), this.projectManager.createConfiguration());
    };
    return WorkspaceLoader;
}());
exports.WorkspaceLoader = WorkspaceLoader;
