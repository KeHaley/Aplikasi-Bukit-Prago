"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildService = void 0;
var BuildPipeline_js_1 = require("./BuildPipeline.js");
var BuildService = /** @class */ (function () {
    function BuildService() {
        this.pipeline = new BuildPipeline_js_1.BuildPipeline();
    }
    BuildService.prototype.build = function (context) {
        return this.pipeline.run(context);
    };
    BuildService.prototype.isSuccess = function (result) {
        return result.success;
    };
    BuildService.prototype.isHealthy = function (result) {
        return (result.success &&
            result.errors.length === 0);
    };
    BuildService.prototype.getBuildSummary = function (result) {
        return {
            success: result.success,
            warningCount: result.warnings.length,
            errorCount: result.errors.length,
            healthy: this.isHealthy(result)
        };
    };
    return BuildService;
}());
exports.BuildService = BuildService;
