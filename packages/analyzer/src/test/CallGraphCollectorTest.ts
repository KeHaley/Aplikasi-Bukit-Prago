import { Dependency } from "../Dependency.js";
import { DependencyKind } from "../DependencyKind.js";
import { CallGraphCollector } from "../CallGraphCollector.js";

const collector = new CallGraphCollector();

collector.collect([

    new Dependency(
        DependencyKind.FunctionCall,
        "savePanen",
        "validate",
        10
    ),

    new Dependency(
        DependencyKind.FunctionCall,
        "savePanen",
        "calculate",
        11
    ),

    new Dependency(
        DependencyKind.VariableAccess,
        "savePanen",
        "total",
        12
    )

]);

const nodes = collector.getAll();

if (nodes.length !== 1) {

    throw new Error(
        `CallGraph harus berjumlah 1, tetapi ditemukan ${nodes.length}`
    );

}

if (nodes[0].callees.length !== 2) {

    throw new Error(
        `savePanen harus memanggil 2 function, tetapi ditemukan ${nodes[0].callees.length}`
    );

}

if (nodes[0].callees[0] !== "validate") {

    throw new Error(
        "Callee pertama harus validate."
    );

}

if (nodes[0].callees[1] !== "calculate") {

    throw new Error(
        "Callee kedua harus calculate."
    );

}

console.log("");
console.log("======================================");
console.log("Call Graph Collector Test PASSED");
console.log("======================================");

for (const node of nodes) {

    console.log(node.name);

    for (const callee of node.callees) {

        console.log(
            "  -> " + callee
        );

    }

}