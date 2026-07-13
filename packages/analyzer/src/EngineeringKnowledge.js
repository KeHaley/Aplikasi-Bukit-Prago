"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineeringKnowledge = void 0;
var EngineeringKnowledge = /** @class */ (function () {
    function EngineeringKnowledge() {
        this.dependencies = [];
        this.callGraph = [];
        this.crossFileDependencies = [];
        this.dataFlow = [];
    }
    EngineeringKnowledge.prototype.addDependency = function (dependency) {
        this.dependencies.push(dependency);
    };
    EngineeringKnowledge.prototype.addCallGraph = function (node) {
        this.callGraph.push(node);
    };
    EngineeringKnowledge.prototype.addCrossFileDependency = function (dependency) {
        this.crossFileDependencies.push(dependency);
    };
    EngineeringKnowledge.prototype.addDataFlow = function (node) {
        this.dataFlow.push(node);
    };
    EngineeringKnowledge.prototype.dependencyCount = function () {
        return this.dependencies.length;
    };
    EngineeringKnowledge.prototype.callGraphCount = function () {
        return this.callGraph.length;
    };
    EngineeringKnowledge.prototype.crossFileCount = function () {
        return this.crossFileDependencies.length;
    };
    EngineeringKnowledge.prototype.dataFlowCount = function () {
        return this.dataFlow.length;
    };
    return EngineeringKnowledge;
}());
exports.EngineeringKnowledge = EngineeringKnowledge;
