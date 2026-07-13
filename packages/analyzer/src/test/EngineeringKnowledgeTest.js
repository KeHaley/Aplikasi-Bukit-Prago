"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dependency_1 = require("../Dependency");
var DependencyKind_1 = require("../DependencyKind");
var DependencyRegistry_1 = require("../DependencyRegistry");
var CallGraphCollector_1 = require("../CallGraphCollector");
var CrossFileDependencyCollector_1 = require("../CrossFileDependencyCollector");
var DataFlowCollector_1 = require("../DataFlowCollector");
var EngineeringKnowledgeBuilder_1 = require("../EngineeringKnowledgeBuilder");
var registry = new DependencyRegistry_1.DependencyRegistry();
registry.add(new Dependency_1.Dependency(DependencyKind_1.DependencyKind.FunctionCall, "savePanen", "validate", 10));
registry.add(new Dependency_1.Dependency(DependencyKind_1.DependencyKind.VariableAccess, "savePanen", "panen", 11));
registry.add(new Dependency_1.Dependency(DependencyKind_1.DependencyKind.Import, "Repository", "./Repository", 1));
var callGraphCollector = new CallGraphCollector_1.CallGraphCollector();
callGraphCollector.collect(registry.getAll());
var crossFileCollector = new CrossFileDependencyCollector_1.CrossFileDependencyCollector();
crossFileCollector.collect(registry);
var dataFlowCollector = new DataFlowCollector_1.DataFlowCollector();
dataFlowCollector.collect(registry.getAll());
var builder = new EngineeringKnowledgeBuilder_1.EngineeringKnowledgeBuilder();
var knowledge = builder.build(registry, callGraphCollector.getAll(), crossFileCollector.getAll(), dataFlowCollector.getAll());
if (knowledge.dependencyCount() !== 3) {
    throw new Error("Dependency harus berjumlah 3, tetapi ditemukan ".concat(knowledge.dependencyCount()));
}
if (knowledge.callGraphCount() !== 1) {
    throw new Error("Call Graph harus berjumlah 1, tetapi ditemukan ".concat(knowledge.callGraphCount()));
}
if (knowledge.crossFileCount() !== 1) {
    throw new Error("Cross File harus berjumlah 1, tetapi ditemukan ".concat(knowledge.crossFileCount()));
}
if (knowledge.dataFlowCount() !== 1) {
    throw new Error("Data Flow harus berjumlah 1, tetapi ditemukan ".concat(knowledge.dataFlowCount()));
}
console.log("");
console.log("======================================");
console.log("Engineering Knowledge Test PASSED");
console.log("======================================");
console.log("Dependency :", knowledge.dependencyCount());
console.log("CallGraph :", knowledge.callGraphCount());
console.log("CrossFile :", knowledge.crossFileCount());
console.log("DataFlow :", knowledge.dataFlowCount());
