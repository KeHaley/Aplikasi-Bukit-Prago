import { ProgramNode, ImportNode } from "@bpv4/parser";

import { ImportDependencyCollector } from "../ImportDependencyCollector.js";
import { DependencyKind } from "../DependencyKind.js";

const program = new ProgramNode();

program.add(
    new ImportNode(
        "Parser",
        "@bpv4/parser",
        1
    )
);

program.add(
    new ImportNode(
        "SymbolCollector",
        "./SymbolCollector",
        2
    )
);

const collector = new ImportDependencyCollector();

const registry = collector.collect(program);

if (registry.count() !== 2) {
    throw new Error(
        `Dependency harus berjumlah 2, tetapi ditemukan ${registry.count()}`
    );
}

const dependencies = registry.getAll();

if (dependencies[0].kind !== DependencyKind.Import) {
    throw new Error("Dependency pertama harus bertipe Import.");
}

if (dependencies[0].from !== "Parser") {
    throw new Error("Import pertama tidak sesuai.");
}

if (dependencies[0].to !== "@bpv4/parser") {
    throw new Error("Source import pertama tidak sesuai.");
}

if (dependencies[1].kind !== DependencyKind.Import) {
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

for (const dependency of dependencies) {
    console.log(
        `${dependency.kind} | ${dependency.from} -> ${dependency.to} (line ${dependency.line})`
    );
}