import { Dependency } from "../Dependency.js";
import { DependencyKind } from "../DependencyKind.js";
import { DependencyRegistry } from "../DependencyRegistry.js";
import { CrossFileDependencyCollector } from "../CrossFileDependencyCollector.js";

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
        DependencyKind.Import,
        "Parser",
        "@bpv4/parser",
        1
    )
);

registry.add(
    new Dependency(
        DependencyKind.VariableAccess,
        "savePanen",
        "total",
        12
    )
);

const collector =
    new CrossFileDependencyCollector();

collector.collect(registry);

const crossFile =
    collector.getAll();

if (registry.count() !== 3) {

    throw new Error(
        `Dependency Registry harus berjumlah 3, tetapi ditemukan ${registry.count()}`
    );

}

if (crossFile.length !== 1) {

    throw new Error(
        `Cross File Dependency harus berjumlah 1, tetapi ditemukan ${crossFile.length}`
    );

}

console.log("");
console.log("======================================");
console.log("Dependency Freeze Test PASSED");
console.log("======================================");

console.log(
    `Registry : ${registry.count()}`
);

console.log(
    `CrossFile : ${crossFile.length}`
);