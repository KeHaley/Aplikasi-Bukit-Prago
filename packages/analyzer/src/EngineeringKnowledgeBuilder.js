"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineeringKnowledgeBuilder = void 0;
var EngineeringKnowledge_1 = require("./EngineeringKnowledge");
var EngineeringKnowledgeBuilder = /** @class */ (function () {
    function EngineeringKnowledgeBuilder() {
    }
    EngineeringKnowledgeBuilder.prototype.build = function (registry, callGraph, crossFile, dataFlow) {
        var knowledge = new EngineeringKnowledge_1.EngineeringKnowledge();
        for (var _i = 0, _a = registry.getAll(); _i < _a.length; _i++) {
            var dependency = _a[_i];
            knowledge.addDependency(dependency);
        }
        for (var _b = 0, callGraph_1 = callGraph; _b < callGraph_1.length; _b++) {
            var node = callGraph_1[_b];
            knowledge.addCallGraph(node);
        }
        for (var _c = 0, crossFile_1 = crossFile; _c < crossFile_1.length; _c++) {
            var dependency = crossFile_1[_c];
            knowledge.addCrossFileDependency(dependency);
        }
        for (var _d = 0, dataFlow_1 = dataFlow; _d < dataFlow_1.length; _d++) {
            var node = dataFlow_1[_d];
            knowledge.addDataFlow(node);
        }
        return knowledge;
    };
    return EngineeringKnowledgeBuilder;
}());
exports.EngineeringKnowledgeBuilder = EngineeringKnowledgeBuilder;
