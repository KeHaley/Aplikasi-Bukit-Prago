"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dependency_1 = require("../Dependency");
var DependencyKind_1 = require("../DependencyKind");
var CallGraphCollector_1 = require("../CallGraphCollector");
var collector = new CallGraphCollector_1.CallGraphCollector();
collector.collect([
    new Dependency_1.Dependency(DependencyKind_1.DependencyKind.FunctionCall, "savePanen", "validate", 10),
    new Dependency_1.Dependency(DependencyKind_1.DependencyKind.FunctionCall, "savePanen", "calculate", 11),
    new Dependency_1.Dependency(DependencyKind_1.DependencyKind.VariableAccess, "savePanen", "total", 12)
]);
var nodes = collector.getAll();
if (nodes.length !== 1) {
    throw new Error("CallGraph harus berjumlah 1, tetapi ditemukan ".concat(nodes.length));
}
if (nodes[0].callees.length !== 2) {
    throw new Error("savePanen harus memanggil 2 function, tetapi ditemukan ".concat(nodes[0].callees.length));
}
if (nodes[0].callees[0] !== "validate") {
    throw new Error("Callee pertama harus validate.");
}
if (nodes[0].callees[1] !== "calculate") {
    throw new Error("Callee kedua harus calculate.");
}
console.log("");
console.log("======================================");
console.log("Call Graph Collector Test PASSED");
console.log("======================================");
for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
    var node = nodes_1[_i];
    console.log(node.name);
    for (var _a = 0, _b = node.callees; _a < _b.length; _a++) {
        var callee = _b[_a];
        console.log("  -> " + callee);
    }
}
