"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceSession = void 0;
var WorkspaceState_js_1 = require("./WorkspaceState.js");
var WorkspaceSession = /** @class */ (function () {
    function WorkspaceSession(context) {
        this.context = context;
        this.state = WorkspaceState_js_1.WorkspaceState.Ready;
    }
    WorkspaceSession.prototype.getContext = function () {
        return this.context;
    };
    WorkspaceSession.prototype.getState = function () {
        return this.state;
    };
    WorkspaceSession.prototype.isReady = function () {
        return this.state === WorkspaceState_js_1.WorkspaceState.Ready;
    };
    return WorkspaceSession;
}());
exports.WorkspaceSession = WorkspaceSession;
