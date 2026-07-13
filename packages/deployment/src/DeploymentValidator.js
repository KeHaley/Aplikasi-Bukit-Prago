"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentValidator = void 0;
var DeploymentValidator = /** @class */ (function () {
    function DeploymentValidator() {
    }
    DeploymentValidator.prototype.validate = function (configuration) {
        return (configuration.projectId.trim().length > 0 &&
            configuration.deploymentTarget.trim().length > 0);
    };
    return DeploymentValidator;
}());
exports.DeploymentValidator = DeploymentValidator;
