"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildContext = void 0;
var BuildContext = /** @class */ (function () {
    function BuildContext(workspaceRoot, outputDirectory, configuration) {
        if (configuration === void 0) { configuration = "Release"; }
        this.workspaceRoot = workspaceRoot;
        this.outputDirectory = outputDirectory;
        this.configuration = configuration;
    }
    return BuildContext;
}());
exports.BuildContext = BuildContext;
