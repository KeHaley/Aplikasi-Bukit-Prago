"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildResult = void 0;
var BuildResult = /** @class */ (function () {
    function BuildResult(success, warnings, errors) {
        if (warnings === void 0) { warnings = []; }
        if (errors === void 0) { errors = []; }
        this.success = success;
        this.warnings = warnings;
        this.errors = errors;
    }
    BuildResult.successResult = function () {
        return new BuildResult(true);
    };
    BuildResult.failureResult = function (errors) {
        return new BuildResult(false, [], errors);
    };
    return BuildResult;
}());
exports.BuildResult = BuildResult;
