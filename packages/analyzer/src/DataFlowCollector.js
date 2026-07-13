"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFlowCollector = void 0;
var DependencyKind_1 = require("./DependencyKind");
var DataFlowNode_1 = require("./DataFlowNode");
var DataFlowCollector = /** @class */ (function () {
    function DataFlowCollector() {
        this.nodes = [];
    }
    DataFlowCollector.prototype.collect = function (dependencies) {
        for (var _i = 0, dependencies_1 = dependencies; _i < dependencies_1.length; _i++) {
            var dependency = dependencies_1[_i];
            if (dependency.kind !==
                DependencyKind_1.DependencyKind.VariableAccess) {
                continue;
            }
            var node = this.findOrCreateNode(dependency.to);
            node.addTarget(dependency.from);
        }
    };
    DataFlowCollector.prototype.getAll = function () {
        return this.nodes;
    };
    DataFlowCollector.prototype.findOrCreateNode = function (name) {
        var node = this.nodes.find(function (item) { return item.name === name; });
        if (!node) {
            node =
                new DataFlowNode_1.DataFlowNode(name);
            this.nodes.push(node);
        }
        return node;
    };
    return DataFlowCollector;
}());
exports.DataFlowCollector = DataFlowCollector;
