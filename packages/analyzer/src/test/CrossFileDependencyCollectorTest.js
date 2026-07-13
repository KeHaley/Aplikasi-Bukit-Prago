"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dependency_1 = require("../Dependency");
var DependencyKind_1 = require("../DependencyKind");
var DependencyRegistry_1 = require("../DependencyRegistry");
var CrossFileDependencyCollector_1 = require("../CrossFileDependencyCollector");
var registry = new DependencyRegistry_1.DependencyRegistry();
registry.add(new Dependency_1.Dependency(DependencyKind_1.DependencyKind.Import, "Parser", "@bpv4/parser", 1));
registry.add(new Dependency_1.Dependency(DependencyKind_1.DependencyKind.Import, "SymbolCollector", "./SymbolCollector", 2));
var collector = new CrossFileDependencyCollector_1.CrossFileDependencyCollector();
collector.collect(registry);
var result = collector.getAll();
if (result.length !== 2) {
    throw new Error("CrossFileDependency harus berjumlah 2, tetapi ditemukan ".concat(result.length));
}
console.log("");
console.log("======================================");
console.log("Cross File Dependency Test PASSED");
console.log("======================================");
for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
    var dependency = result_1[_i];
    console.log("".concat(dependency.symbol, " -> ").concat(dependency.source));
}
