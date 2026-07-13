"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceService = void 0;
var core_1 = require("@bpv4/core");
var WorkspaceRuntime_js_1 = require("./WorkspaceRuntime.js");
var WorkspaceService = /** @class */ (function () {
    function WorkspaceService() {
        this.runtime = new WorkspaceRuntime_js_1.WorkspaceRuntime();
        this.core = new core_1.WorkspaceService(this.runtime.engine, this.runtime.projectManager);
    }
    WorkspaceService.prototype.bootstrap = function () {
        this.runtime.bootstrap();
    };
    WorkspaceService.prototype.isBootstrapped = function () {
        return this.runtime.isBootstrapped();
    };
    WorkspaceService.prototype.start = function () {
        this.runtime.start();
    };
    WorkspaceService.prototype.stop = function () {
        this.runtime.stop();
    };
    WorkspaceService.prototype.isRunning = function () {
        return this.runtime.isRunning();
    };
    WorkspaceService.prototype.getConfiguration = function () {
        return this.runtime.configuration;
    };
    WorkspaceService.prototype.registerModule = function (name, module) {
        this.runtime.registerModule(name, module);
    };
    WorkspaceService.prototype.hasModule = function (name) {
        return this.runtime.hasModule(name);
    };
    WorkspaceService.prototype.getModule = function (name) {
        return this.runtime.getModule(name);
    };
    WorkspaceService.prototype.getModuleNames = function () {
        return this.runtime.getModuleNames();
    };
    WorkspaceService.prototype.getHealthStatus = function () {
        return __assign(__assign({}, this.runtime.getHealthStatus()), { healthy: this.isHealthy() });
    };
    WorkspaceService.prototype.getWorkspaceName = function () {
        return this.core.getWorkspaceName();
    };
    WorkspaceService.prototype.getWorkspaceVersion = function () {
        return this.core.getWorkspaceVersion();
    };
    WorkspaceService.prototype.getWorkspaceSummary = function () {
        return __assign(__assign(__assign(__assign({}, this.core.getWorkspaceSummary()), { configuration: this.getConfiguration() }), this.getHealthStatus()), { modules: this.getModuleNames() });
    };
    WorkspaceService.prototype.getProjectManager = function () {
        return this.core.getProjectManager();
    };
    WorkspaceService.prototype.validate = function () {
        return this.core.validate();
    };
    WorkspaceService.prototype.isHealthy = function () {
        return this.core.isHealthy();
    };
    WorkspaceService.prototype.getRuntime = function () {
        return this.runtime;
    };
    return WorkspaceService;
}());
exports.WorkspaceService = WorkspaceService;
