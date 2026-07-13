import { Dependency } from "../Dependency.js";
import { DependencyKind } from "../DependencyKind.js";
import { DependencyRegistry } from "../DependencyRegistry.js";
import { CrossFileDependencyCollector } from "../CrossFileDependencyCollector.js";

const registry = new DependencyRegistry();

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
        DependencyKind.Import,
        "SymbolCollector",
        "./SymbolCollector",
        2
    )
);

const collector = new CrossFileDependencyCollector();

collector.collect(registry);

const result = collector.getAll();

if (result.length !== 2) {

    throw new Error(
        `CrossFileDependency harus berjumlah 2, tetapi ditemukan ${result.length}`
    );

}

console.log("");
console.log("======================================");
console.log("Cross File Dependency Test PASSED");
console.log("======================================");

for (const dependency of result) {

    console.log(
        `${dependency.symbol} -> ${dependency.source}`
    );

}