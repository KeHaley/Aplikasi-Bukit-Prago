"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("@bpv4/parser");
var DependencyCollector_1 = require("../DependencyCollector");
var tokenizer = new parser_1.Tokenizer();
var collector = new DependencyCollector_1.DependencyCollector();
var source = "\nfunction savePanen() {\n\n    simpan();\n\n    db.save();\n\n    logger.info();\n\n    await updateStock();\n\n    this.calculate();\n\n    super.render();\n\n}\n\nfunction login() {\n\n    validateUser();\n\n    createSession();\n\n}\n";
var lines = tokenizer.tokenize(source);
var registry = collector.collect(lines);
if (registry.count() !== 8) {
    throw new Error("Dependency harus berjumlah 8, tetapi ditemukan ".concat(registry.count()));
}
console.log("");
console.log("======================================");
console.log("Dependency Registry Test PASSED");
console.log("======================================");
for (var _i = 0, _a = registry.getAll(); _i < _a.length; _i++) {
    var dependency = _a[_i];
    console.log("".concat(dependency.kind, " | ").concat(dependency.from, " -> ").concat(dependency.to, " (line ").concat(dependency.line, ")"));
}
