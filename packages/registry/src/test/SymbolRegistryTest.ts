import { Tokenizer } from "../../../parser/src/tokenizer/Tokenizer";
import { Parser } from "../../../parser/src/parser/Parser";

import { SymbolCollector } from "../SymbolCollector";
import { SymbolKind } from "../SymbolKind";

const tokenizer = new Tokenizer();
const parser = new Parser();
const collector = new SymbolCollector();

const source = `
import { Repository } from "./Repository";

export class PanenService {

}

function savePanen() {

}

class LocalService {

}

const APP_NAME = "BPV4";

let activeYear = 2026;

var total = 0;
`;

const lines = tokenizer.tokenize(source);

const program = parser.parse(lines);

const registry = collector.collect(program);

console.log("Symbols :", registry.count());

for (const symbol of registry.getAll()) {
    console.log(symbol);
}

if (registry.count() !== 7) {
    throw new Error("Registry harus memiliki 7 symbol.");
}

const symbols = registry.getAll();

if (symbols[0].kind !== SymbolKind.Import) {
    throw new Error("Import symbol salah.");
}

if (symbols[1].kind !== SymbolKind.Export) {
    throw new Error("Export symbol salah.");
}

if (symbols[2].kind !== SymbolKind.Function) {
    throw new Error("Function symbol salah.");
}

if (symbols[3].kind !== SymbolKind.Class) {
    throw new Error("Class symbol salah.");
}

if (symbols[4].kind !== SymbolKind.Variable) {
    throw new Error("Variable symbol salah.");
}

if (symbols[5].kind !== SymbolKind.Variable) {
    throw new Error("Variable symbol salah.");
}

if (symbols[6].kind !== SymbolKind.Variable) {
    throw new Error("Variable symbol salah.");
}

console.log("");
console.log("======================================");
console.log("Symbol Registry Test PASSED");
console.log("======================================");