"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceValidator = void 0;
var WorkspaceValidator = /** @class */ (function () {
    function WorkspaceValidator() {
    }
    WorkspaceValidator.prototype.validate = function (context) {
        return (context.workspace.name.length > 0 &&
            context.workspace.version.length > 0 &&
            context.configuration.workspaceVersion.length > 0);
    };
    return WorkspaceValidator;
}());
exports.WorkspaceValidator = WorkspaceValidator;
