"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceConfiguration = void 0;
var WorkspaceConfiguration = /** @class */ (function () {
    function WorkspaceConfiguration(workspaceName, workspaceVersion, environment) {
        if (workspaceName === void 0) { workspaceName = "BPV4 Workspace"; }
        if (workspaceVersion === void 0) { workspaceVersion = "1.0.0"; }
        if (environment === void 0) { environment = "production"; }
        this.workspaceName = workspaceName;
        this.workspaceVersion = workspaceVersion;
        this.environment = environment;
    }
    return WorkspaceConfiguration;
}());
exports.WorkspaceConfiguration = WorkspaceConfiguration;
