"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentService = void 0;
var DeploymentContext_js_1 = require("./DeploymentContext.js");
var DeploymentHealth_js_1 = require("./DeploymentHealth.js");
var DeploymentMetadata_js_1 = require("./DeploymentMetadata.js");
var DeploymentReport_js_1 = require("./DeploymentReport.js");
var DeploymentResult_js_1 = require("./DeploymentResult.js");
var DeploymentStatus_js_1 = require("./DeploymentStatus.js");
var DeploymentSummary_js_1 = require("./DeploymentSummary.js");
var DeploymentValidator_js_1 = require("./DeploymentValidator.js");
var WorkspaceDeployment_js_1 = require("./WorkspaceDeployment.js");
var DeploymentService = /** @class */ (function () {
    function DeploymentService() {
        this.deployment = new WorkspaceDeployment_js_1.WorkspaceDeployment();
        this.validator = new DeploymentValidator_js_1.DeploymentValidator();
    }
    DeploymentService.prototype.deploy = function (configuration) {
        if (!this.validator.validate(configuration)) {
            return new DeploymentResult_js_1.DeploymentResult(false, "Deployment configuration is invalid.");
        }
        return this.deployment.deploy(configuration);
    };
    DeploymentService.prototype.isSuccess = function (result) {
        return result.success;
    };
    DeploymentService.prototype.isHealthy = function (result) {
        return (result.success &&
            result.message.length > 0);
    };
    DeploymentService.prototype.getStatus = function (result) {
        return result.success
            ? DeploymentStatus_js_1.DeploymentStatus.Success
            : DeploymentStatus_js_1.DeploymentStatus.Failed;
    };
    DeploymentService.prototype.createContext = function (configuration, result) {
        return new DeploymentContext_js_1.DeploymentContext(configuration, this.getStatus(result));
    };
    DeploymentService.prototype.getMetadata = function (configuration) {
        return new DeploymentMetadata_js_1.DeploymentMetadata(configuration.projectId, configuration.deploymentTarget, new Date());
    };
    DeploymentService.prototype.getHealth = function (result) {
        return new DeploymentHealth_js_1.DeploymentHealth(this.isHealthy(result), result.message);
    };
    DeploymentService.prototype.getSummary = function (result) {
        return new DeploymentSummary_js_1.DeploymentSummary(result.success, result.message, this.isHealthy(result));
    };
    DeploymentService.prototype.getReport = function (result) {
        return new DeploymentReport_js_1.DeploymentReport(this.getSummary(result), new Date());
    };
    return DeploymentService;
}());
exports.DeploymentService = DeploymentService;
