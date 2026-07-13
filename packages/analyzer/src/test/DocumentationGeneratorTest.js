"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dependency_1 = require("../Dependency");
var DependencyKind_1 = require("../DependencyKind");
var DependencyRegistry_1 = require("../DependencyRegistry");
var CallGraphCollector_1 = require("../CallGraphCollector");
var CrossFileDependencyCollector_1 = require("../CrossFileDependencyCollector");
var DataFlowCollector_1 = require("../DataFlowCollector");
var EngineeringKnowledgeBuilder_1 = require("../EngineeringKnowledgeBuilder");
var EngineeringReportBuilder_1 = require("../EngineeringReportBuilder");
var DocumentationGenerator_1 = require("../DocumentationGenerator");
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
var knowledge = new EngineeringKnowledgeBuilder_1.EngineeringKnowledgeBuilder().build(registry, callGraphCollector.getAll(), crossFileCollector.getAll(), dataFlowCollector.getAll());
var report = new EngineeringReportBuilder_1.EngineeringReportBuilder().build(knowledge);
var document = new DocumentationGenerator_1.DocumentationGenerator().generate(report);
if (!document.includes("BPV4 Engineering Report")) {
    throw new Error("Judul report tidak ditemukan.");
}
if (!document.includes("Statistics")) {
    throw new Error("Bagian Statistics tidak ditemukan.");
}
console.log("");
console.log("======================================");
console.log("Documentation Generator Test PASSED");
console.log("======================================");
console.log("");
console.log(document);
