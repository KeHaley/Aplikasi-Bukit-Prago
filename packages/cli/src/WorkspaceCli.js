"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceCli = void 0;
var workspace_1 = require("@bpv4/workspace");
var WorkspaceCli = /** @class */ (function () {
    function WorkspaceCli() {
        this.workspace = new workspace_1.WorkspaceService();
    }
    WorkspaceCli.prototype.version = function () {
        return this.workspace.getWorkspaceVersion();
    };
    WorkspaceCli.prototype.status = function () {
        return this.workspace.getWorkspaceSummary();
    };
    WorkspaceCli.prototype.health = function () {
        return {
            healthy: this.workspace.isHealthy(),
            running: this.workspace.isRunning(),
            bootstrapped: this.workspace.isBootstrapped()
        };
    };
    WorkspaceCli.prototype.getWorkspaceName = function () {
        return this.workspace.getWorkspaceName();
    };
    WorkspaceCli.prototype.getWorkspaceVersion = function () {
        return this.workspace.getWorkspaceVersion();
    };
    WorkspaceCli.prototype.getWorkspaceSummary = function () {
        return this.workspace.getWorkspaceSummary();
    };
    WorkspaceCli.prototype.start = function () {
        this.workspace.start();
    };
    WorkspaceCli.prototype.stop = function () {
        this.workspace.stop();
    };
    WorkspaceCli.prototype.isRunning = function () {
        return this.workspace.isRunning();
    };
    return WorkspaceCli;
}());
exports.WorkspaceCli = WorkspaceCli;
