"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceUI = void 0;
var WorkspaceUI = /** @class */ (function () {
    function WorkspaceUI() {
        this.views = [];
    }
    WorkspaceUI.prototype.register = function (view) {
        this.views.push(view);
    };
    WorkspaceUI.prototype.getViews = function () {
        return this.views;
    };
    return WorkspaceUI;
}());
exports.WorkspaceUI = WorkspaceUI;
