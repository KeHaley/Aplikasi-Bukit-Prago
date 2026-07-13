"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceService = void 0;
var project_1 = require("@bpv4/project");
var WorkspaceEngine_js_1 = require("./WorkspaceEngine.js");
var WorkspaceLoader_js_1 = require("./WorkspaceLoader.js");
var WorkspaceSession_js_1 = require("./WorkspaceSession.js");
var WorkspaceValidator_js_1 = require("./WorkspaceValidator.js");
var WorkspaceService = /** @class */ (function () {
    function WorkspaceService(engine, projectManager, loader, validator) {
        if (engine === void 0) { engine = new WorkspaceEngine_js_1.WorkspaceEngine(); }
        if (projectManager === void 0) { projectManager = new project_1.ProjectManager(); }
        if (loader === void 0) { loader = new WorkspaceLoader_js_1.WorkspaceLoader(); }
        if (validator === void 0) { validator = new WorkspaceValidator_js_1.WorkspaceValidator(); }
        this.engine = engine;
        this.projectManager = projectManager;
        this.loader = loader;
        this.validator = validator;
    }
    WorkspaceService.prototype.createSession = function () {
        return new WorkspaceSession_js_1.WorkspaceSession(this.loader.load());
    };
    WorkspaceService.prototype.getWorkspaceName = function () {
        return this.engine.getWorkspace().name;
    };
    WorkspaceService.prototype.getWorkspaceVersion = function () {
        return this.engine.getWorkspace().version;
    };
    WorkspaceService.prototype.getWorkspaceSummary = function () {
        return {
            name: this.getWorkspaceName(),
            version: this.getWorkspaceVersion(),
            healthy: this.isHealthy()
        };
    };
    WorkspaceService.prototype.getProjectManager = function () {
        return this.projectManager;
    };
    WorkspaceService.prototype.isHealthy = function () {
        return this.validate();
    };
    WorkspaceService.prototype.validate = function () {
        return this.validator.validate(this.createSession().getContext());
    };
    return WorkspaceService;
}());
exports.WorkspaceService = WorkspaceService;
