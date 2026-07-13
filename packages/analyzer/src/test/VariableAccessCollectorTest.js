"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("@bpv4/parser");
var VariableAccessCollector_1 = require("../VariableAccessCollector");
var tokenizer = new parser_1.Tokenizer();
var collector = new VariableAccessCollector_1.VariableAccessCollector();
var source = "\nfunction hitung() {\n\n    const total = panen + bonus;\n\n    kas = total;\n\n    update(total);\n\n}\n";
var lines = tokenizer.tokenize(source);
var registry = collector.collect(lines);
console.log(registry.getAll());
if (registry.count() !== 4) {
    throw new Error("VariableAccess harus berjumlah 4, tetapi ditemukan ".concat(registry.count()));
}
console.log("");
console.log("================================");
console.log("Variable Access Test PASSED");
console.log("================================");
for (var _i = 0, _a = registry.getAll(); _i < _a.length; _i++) {
    var dependency = _a[_i];
    console.log("".concat(dependency.kind, " | ").concat(dependency.from, " -> ").concat(dependency.to, " (line ").concat(dependency.line, ")"));
}
