"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("@bpv4/parser");
var ImportDependencyCollector_1 = require("../ImportDependencyCollector");
var DependencyKind_1 = require("../DependencyKind");
var program = new parser_1.ProgramNode();
program.add(new parser_1.ImportNode("Parser", "@bpv4/parser", 1));
program.add(new parser_1.ImportNode("SymbolCollector", "./SymbolCollector", 2));
var collector = new ImportDependencyCollector_1.ImportDependencyCollector();
var registry = collector.collect(program);
if (registry.count() !== 2) {
    throw new Error("Dependency harus berjumlah 2, tetapi ditemukan ".concat(registry.count()));
}
var dependencies = registry.getAll();
if (dependencies[0].kind !== DependencyKind_1.DependencyKind.Import) {
    throw new Error("Dependency pertama harus bertipe Import.");
}
if (dependencies[0].from !== "Parser") {
    throw new Error("Import pertama tidak sesuai.");
}
if (dependencies[0].to !== "@bpv4/parser") {
    throw new Error("Source import pertama tidak sesuai.");
}
if (dependencies[1].kind !== DependencyKind_1.DependencyKind.Import) {
    throw new Error("Dependency kedua harus bertipe Import.");
}
if (dependencies[1].from !== "SymbolCollector") {
    throw new Error("Import kedua tidak sesuai.");
}
if (dependencies[1].to !== "./SymbolCollector") {
    throw new Error("Source import kedua tidak sesuai.");
}
console.log("");
console.log("======================================");
console.log("Import Dependency Collector Test PASSED");
console.log("======================================");
for (var _i = 0, dependencies_1 = dependencies; _i < dependencies_1.length; _i++) {
    var dependency = dependencies_1[_i];
    console.log("".concat(dependency.kind, " | ").concat(dependency.from, " -> ").concat(dependency.to, " (line ").concat(dependency.line, ")"));
}
