import { Dependency } from "../Dependency.js";
import { DependencyKind } from "../DependencyKind.js";
import { DataFlowCollector } from "../DataFlowCollector.js";

const collector = new DataFlowCollector();

collector.collect([

    new Dependency(
        DependencyKind.VariableAccess,
        "savePanen",
        "panen",
        10
    ),

    new Dependency(
        DependencyKind.VariableAccess,
        "savePanen",
        "bonus",
        11
    ),

    new Dependency(
        DependencyKind.VariableAccess,
        "savePanen",
        "total",
        12
    ),

    new Dependency(
        DependencyKind.FunctionCall,
        "savePanen",
        "validate",
        13
    )

]);

const nodes = collector.getAll();

if (nodes.length !== 3) {

    throw new Error(
        `DataFlow harus berjumlah 3, tetapi ditemukan ${nodes.length}`
    );

}

if (nodes[0].name !== "panen") {

    throw new Error(
        "Node pertama harus panen."
    );

}

if (nodes[1].name !== "bonus") {

    throw new Error(
        "Node kedua harus bonus."
    );

}

if (nodes[2].name !== "total") {

    throw new Error(
        "Node ketiga harus total."
    );

}

console.log("");
console.log("======================================");
console.log("Data Flow Collector Test PASSED");
console.log("======================================");

for (const node of nodes) {

    console.log(node.name);

    for (const target of node.targets) {

        console.log(
            "  -> " + target
        );

    }

}