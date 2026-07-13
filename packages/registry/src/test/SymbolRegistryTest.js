"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tokenizer_1 = require("../../../parser/src/tokenizer/Tokenizer");
var Parser_1 = require("../../../parser/src/parser/Parser");
var SymbolCollector_1 = require("../SymbolCollector");
var SymbolKind_1 = require("../SymbolKind");
var tokenizer = new Tokenizer_1.Tokenizer();
var parser = new Parser_1.Parser();
var collector = new SymbolCollector_1.SymbolCollector();
var source = "\nimport { Repository } from \"./Repository\";\n\nexport class PanenService {\n\n}\n\nfunction savePanen() {\n\n}\n\nclass LocalService {\n\n}\n\nconst APP_NAME = \"BPV4\";\n\nlet activeYear = 2026;\n\nvar total = 0;\n";
var lines = tokenizer.tokenize(source);
var program = parser.parse(lines);
var registry = collector.collect(program);
console.log("Symbols :", registry.count());
for (var _i = 0, _a = registry.getAll(); _i < _a.length; _i++) {
    var symbol = _a[_i];
    console.log(symbol);
}
if (registry.count() !== 7) {
    throw new Error("Registry harus memiliki 7 symbol.");
}
var symbols = registry.getAll();
if (symbols[0].kind !== SymbolKind_1.SymbolKind.Import) {
    throw new Error("Import symbol salah.");
}
if (symbols[1].kind !== SymbolKind_1.SymbolKind.Export) {
    throw new Error("Export symbol salah.");
}
if (symbols[2].kind !== SymbolKind_1.SymbolKind.Function) {
    throw new Error("Function symbol salah.");
}
if (symbols[3].kind !== SymbolKind_1.SymbolKind.Class) {
    throw new Error("Class symbol salah.");
}
if (symbols[4].kind !== SymbolKind_1.SymbolKind.Variable) {
    throw new Error("Variable symbol salah.");
}
if (symbols[5].kind !== SymbolKind_1.SymbolKind.Variable) {
    throw new Error("Variable symbol salah.");
}
if (symbols[6].kind !== SymbolKind_1.SymbolKind.Variable) {
    throw new Error("Variable symbol salah.");
}
console.log("");
console.log("======================================");
console.log("Symbol Registry Test PASSED");
console.log("======================================");
