import { Dependency } from "../Dependency.js";
import { DependencyKind } from "../DependencyKind.js";
import { DependencyRegistry } from "../DependencyRegistry.js";

import { CallGraphCollector } from "../CallGraphCollector.js";
import { CrossFileDependencyCollector } from "../CrossFileDependencyCollector.js";
import { DataFlowCollector } from "../DataFlowCollector.js";

import { EngineeringKnowledgeBuilder } from "../EngineeringKnowledgeBuilder.js";
import { EngineeringReportBuilder } from "../EngineeringReportBuilder.js";
import { DocumentationGenerator } from "../DocumentationGenerator.js";

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

const knowledge =
    new EngineeringKnowledgeBuilder().build(
        registry,
        callGraphCollector.getAll(),
        crossFileCollector.getAll(),
        dataFlowCollector.getAll()
    );

const report =
    new EngineeringReportBuilder().build(
        knowledge
    );

const document =
    new DocumentationGenerator().generate(
        report
    );

if (!document.includes("BPV4 Engineering Report")) {

    throw new Error(
        "Judul report tidak ditemukan."
    );

}

if (!document.includes("Statistics")) {

    throw new Error(
        "Bagian Statistics tidak ditemukan."
    );

}

console.log("");
console.log("======================================");
console.log("Documentation Generator Test PASSED");
console.log("======================================");
console.log("");
console.log(document);