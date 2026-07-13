import { Tokenizer } from "@bpv4/parser";
import { VariableAccessCollector } from "../VariableAccessCollector.js";

const tokenizer = new Tokenizer();

const collector = new VariableAccessCollector();

const source = `
function hitung() {

    const total = panen + bonus;

    kas = total;

    update(total);

}
`;

const lines = tokenizer.tokenize(source);

const registry = collector.collect(lines);

console.log(registry.getAll());

if (registry.count() !== 4) {

    throw new Error(
        `VariableAccess harus berjumlah 4, tetapi ditemukan ${registry.count()}`
    );

}

console.log("");

console.log("================================");

console.log("Variable Access Test PASSED");

console.log("================================");

for (const dependency of registry.getAll()) {

    console.log(
        `${dependency.kind} | ${dependency.from} -> ${dependency.to} (line ${dependency.line})`
    );

}