"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallGraphCollector = void 0;
var DependencyKind_1 = require("./DependencyKind");
var CallGraphNode_1 = require("./CallGraphNode");
var CallGraphCollector = /** @class */ (function () {
    function CallGraphCollector() {
        this.nodes = [];
    }
    CallGraphCollector.prototype.findOrCreateNode = function (name) {
        var node = this.nodes.find(function (item) { return item.name === name; });
        if (!node) {
            node = new CallGraphNode_1.CallGraphNode(name);
            this.nodes.push(node);
        }
        return node;
    };
    CallGraphCollector.prototype.collect = function (dependencies) {
        for (var _i = 0, dependencies_1 = dependencies; _i < dependencies_1.length; _i++) {
            var dependency = dependencies_1[_i];
            if (dependency.kind !==
                DependencyKind_1.DependencyKind.FunctionCall) {
                continue;
            }
            var node = this.findOrCreateNode(dependency.from);
            node.addCallee(dependency.to);
        }
    };
    CallGraphCollector.prototype.getAll = function () {
        return this.nodes;
    };
    return CallGraphCollector;
}());
exports.CallGraphCollector = CallGraphCollector;
