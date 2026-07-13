"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallGraphNode = void 0;
var CallGraphNode = /** @class */ (function () {
    function CallGraphNode(name) {
        this.name = name;
        this.callees = [];
    }
    CallGraphNode.prototype.addCallee = function (name) {
        if (this.callees.includes(name)) {
            return;
        }
        this.callees.push(name);
    };
    return CallGraphNode;
}());
exports.CallGraphNode = CallGraphNode;
