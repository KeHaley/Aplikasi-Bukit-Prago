"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildPipeline = void 0;
var WorkspaceBuilder_js_1 = require("./WorkspaceBuilder.js");
var BuildPipeline = /** @class */ (function () {
    function BuildPipeline() {
        this.builder = new WorkspaceBuilder_js_1.WorkspaceBuilder();
    }
    BuildPipeline.prototype.run = function (context) {
        return this.builder.build(context);
    };
    return BuildPipeline;
}());
exports.BuildPipeline = BuildPipeline;
