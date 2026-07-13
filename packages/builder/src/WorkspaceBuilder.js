"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceBuilder = void 0;
var BuildResult_js_1 = require("./BuildResult.js");
var WorkspaceBuilder = /** @class */ (function () {
    function WorkspaceBuilder() {
    }
    WorkspaceBuilder.prototype.build = function (context) {
        if (context.workspaceRoot.trim().length === 0) {
            return BuildResult_js_1.BuildResult.failureResult([
                "Workspace root is required."
            ]);
        }
        if (context.outputDirectory.trim().length === 0) {
            return BuildResult_js_1.BuildResult.failureResult([
                "Output directory is required."
            ]);
        }
        return BuildResult_js_1.BuildResult.successResult();
    };
    return WorkspaceBuilder;
}());
exports.WorkspaceBuilder = WorkspaceBuilder;
