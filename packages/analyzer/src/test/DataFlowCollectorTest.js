"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dependency_1 = require("../Dependency");
var DependencyKind_1 = require("../DependencyKind");
var DataFlowCollector_1 = require("../DataFlowCollector");
var collector = new DataFlowCollector_1.DataFlowCollector();
collector.collect([
    new Dependency_1.Dependency(DependencyKind_1.DependencyKind.VariableAccess, "savePanen", "panen", 10),
    new Dependency_1.Dependency(DependencyKind_1.DependencyKind.VariableAccess, "savePanen", "bonus", 11),
    new Dependency_1.Dependency(DependencyKind_1.DependencyKind.VariableAccess, "savePanen", "total", 12),
    new Dependency_1.Dependency(DependencyKind_1.DependencyKind.FunctionCall, "savePanen", "validate", 13)
]);
var nodes = collector.getAll();
if (nodes.length !== 3) {
    throw new Error("DataFlow harus berjumlah 3, tetapi ditemukan ".concat(nodes.length));
}
if (nodes[0].name !== "panen") {
    throw new Error("Node pertama harus panen.");
}
if (nodes[1].name !== "bonus") {
    throw new Error("Node kedua harus bonus.");
}
if (nodes[2].name !== "total") {
    throw new Error("Node ketiga harus total.");
}
console.log("");
console.log("======================================");
console.log("Data Flow Collector Test PASSED");
console.log("======================================");
for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
    var node = nodes_1[_i];
    console.log(node.name);
    for (var _a = 0, _b = node.targets; _a < _b.length; _a++) {
        var target = _b[_a];
        console.log("  -> " + target);
    }
}
