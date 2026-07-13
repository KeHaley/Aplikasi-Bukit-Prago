"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentSummary = void 0;
var DeploymentSummary = /** @class */ (function () {
    function DeploymentSummary(success, message, healthy) {
        this.success = success;
        this.message = message;
        this.healthy = healthy;
    }
    return DeploymentSummary;
}());
exports.DeploymentSummary = DeploymentSummary;
