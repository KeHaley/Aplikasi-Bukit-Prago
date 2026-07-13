"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceRuntime = void 0;
var core_1 = require("@bpv4/core");
var project_1 = require("@bpv4/project");
var WorkspaceConfiguration_js_1 = require("./WorkspaceConfiguration.js");
var WorkspaceRuntime = /** @class */ (function () {
    function WorkspaceRuntime() {
        this.engine = new core_1.WorkspaceEngine();
        this.projectManager = new project_1.ProjectManager();
        this.configuration = new WorkspaceConfiguration_js_1.WorkspaceConfiguration();
        this.modules = new Map();
        this.running = false;
        this.bootstrapped = false;
    }
    WorkspaceRuntime.prototype.bootstrap = function () {
        if (this.bootstrapped) {
            return;
        }
        this.bootstrapped = true;
    };
    WorkspaceRuntime.prototype.isBootstrapped = function () {
        return this.bootstrapped;
    };
    WorkspaceRuntime.prototype.start = function () {
        this.bootstrap();
        this.running = true;
    };
    WorkspaceRuntime.prototype.stop = function () {
        this.running = false;
    };
    WorkspaceRuntime.prototype.isRunning = function () {
        return this.running;
    };
    WorkspaceRuntime.prototype.registerModule = function (name, module) {
        this.modules.set(name, module);
    };
    WorkspaceRuntime.prototype.hasModule = function (name) {
        return this.modules.has(name);
    };
    WorkspaceRuntime.prototype.getModule = function (name) {
        return this.modules.get(name);
    };
    WorkspaceRuntime.prototype.getModuleNames = function () {
        return __spreadArray([], this.modules.keys(), true);
    };
    WorkspaceRuntime.prototype.getHealthStatus = function () {
        return {
            bootstrapped: this.bootstrapped,
            running: this.running,
            moduleCount: this.modules.size
        };
    };
    return WorkspaceRuntime;
}());
exports.WorkspaceRuntime = WorkspaceRuntime;
