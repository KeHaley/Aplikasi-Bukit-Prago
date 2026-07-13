"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentMetadata = void 0;
var DeploymentMetadata = /** @class */ (function () {
    function DeploymentMetadata(projectId, deploymentTarget, createdAt) {
        this.projectId = projectId;
        this.deploymentTarget = deploymentTarget;
        this.createdAt = createdAt;
    }
    return DeploymentMetadata;
}());
exports.DeploymentMetadata = DeploymentMetadata;
