"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceDeployment = void 0;
var DeploymentResult_js_1 = require("./DeploymentResult.js");
var WorkspaceDeployment = /** @class */ (function () {
    function WorkspaceDeployment() {
    }
    WorkspaceDeployment.prototype.deploy = function (configuration) {
        if (configuration.projectId.trim().length === 0) {
            return new DeploymentResult_js_1.DeploymentResult(false, "Project ID is required.");
        }
        if (configuration.deploymentTarget.trim().length === 0) {
            return new DeploymentResult_js_1.DeploymentResult(false, "Deployment target is required.");
        }
        return new DeploymentResult_js_1.DeploymentResult(true, "Deployment validation passed.");
    };
    return WorkspaceDeployment;
}());
exports.WorkspaceDeployment = WorkspaceDeployment;
