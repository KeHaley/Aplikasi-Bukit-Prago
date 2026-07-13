import { Dependency } from "../Dependency.js";
import { DependencyKind } from "../DependencyKind.js";
import { DependencyRegistry } from "../DependencyRegistry.js";

import { CallGraphCollector } from "../CallGraphCollector.js";
import { CrossFileDependencyCollector } from "../CrossFileDependencyCollector.js";
import { DataFlowCollector } from "../DataFlowCollector.js";
import { EngineeringKnowledgeBuilder } from "../EngineeringKnowledgeBuilder.js";

const registry = new DependencyRegistry();

registry.add(
    new Dependency(
        DependencyKind.FunctionCall,
        "savePanen",
        "validate",
        10
    )
);

registry.add(
    new Dependency(
        DependencyKind.VariableAccess,
        "savePanen",
        "panen",
        11
    )
);

registry.add(
    new Dependency(
        DependencyKind.Import,
        "Repository",
        "./Repository",
        1
    )
);

const callGraphCollector =
    new CallGraphCollector();

callGraphCollector.collect(
    registry.getAll()
);

const crossFileCollector =
    new CrossFileDependencyCollector();

crossFileCollector.collect(
    registry
);

const dataFlowCollector =
    new DataFlowCollector();

dataFlowCollector.collect(
    registry.getAll()
);

const builder =
    new EngineeringKnowledgeBuilder();

const knowledge =
    builder.build(
        registry,
        callGraphCollector.getAll(),
        crossFileCollector.getAll(),
        dataFlowCollector.getAll()
    );

if (knowledge.dependencyCount() !== 3) {

    throw new Error(
        `Dependency harus berjumlah 3, tetapi ditemukan ${knowledge.dependencyCount()}`
    );

}

if (knowledge.callGraphCount() !== 1) {

    throw new Error(
        `Call Graph harus berjumlah 1, tetapi ditemukan ${knowledge.callGraphCount()}`
    );

}

if (knowledge.crossFileCount() !== 1) {

    throw new Error(
        `Cross File harus berjumlah 1, tetapi ditemukan ${knowledge.crossFileCount()}`
    );

}

if (knowledge.dataFlowCount() !== 1) {

    throw new Error(
        `Data Flow harus berjumlah 1, tetapi ditemukan ${knowledge.dataFlowCount()}`
    );

}

console.log("");
console.log("======================================");
console.log("Engineering Knowledge Test PASSED");
console.log("======================================");

console.log(
    "Dependency :",
    knowledge.dependencyCount()
);

console.log(
    "CallGraph :",
    knowledge.callGraphCount()
);

console.log(
    "CrossFile :",
    knowledge.crossFileCount()
);

console.log(
    "DataFlow :",
    knowledge.dataFlowCount()
);