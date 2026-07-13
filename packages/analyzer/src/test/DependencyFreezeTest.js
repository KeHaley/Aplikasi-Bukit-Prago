"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dependency_1 = require("../Dependency");
var DependencyKind_1 = require("../DependencyKind");
var DependencyRegistry_1 = require("../DependencyRegistry");
var CrossFileDependencyCollector_1 = require("../CrossFileDependencyCollector");
var registry = new DependencyRegistry_1.DependencyRegistry();
registry.add(new Dependency_1.Dependency(DependencyKind_1.DependencyKind.FunctionCall, "savePanen", "validate", 10));
registry.add(new Dependency_1.Dependency(DependencyKind_1.DependencyKind.Import, "Parser", "@bpv4/parser", 1));
registry.add(new Dependency_1.Dependency(DependencyKind_1.DependencyKind.VariableAccess, "savePanen", "total", 12));
var collector = new CrossFileDependencyCollector_1.CrossFileDependencyCollector();
collector.collect(registry);
var crossFile = collector.getAll();
if (registry.count() !== 3) {
    throw new Error("Dependency Registry harus berjumlah 3, tetapi ditemukan ".concat(registry.count()));
}
if (crossFile.length !== 1) {
    throw new Error("Cross File Dependency harus berjumlah 1, tetapi ditemukan ".concat(crossFile.length));
}
console.log("");
console.log("======================================");
console.log("Dependency Freeze Test PASSED");
console.log("======================================");
console.log("Registry : ".concat(registry.count()));
console.log("CrossFile : ".concat(crossFile.length));
