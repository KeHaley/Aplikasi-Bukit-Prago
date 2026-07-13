"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFlowNode = void 0;
var DataFlowNode = /** @class */ (function () {
    function DataFlowNode(name) {
        this.name = name;
        this.targets = [];
    }
    DataFlowNode.prototype.addTarget = function (target) {
        if (this.targets.includes(target)) {
            return;
        }
        this.targets.push(target);
    };
    return DataFlowNode;
}());
exports.DataFlowNode = DataFlowNode;
