"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("@bpv4/parser");
var FunctionScopeFinder_1 = require("../FunctionScopeFinder");
var tokenizer = new parser_1.Tokenizer();
var finder = new FunctionScopeFinder_1.FunctionScopeFinder();
var source = "\nfunction savePanen(){\n\n    validate();\n\n    hitung();\n\n}\n\nfunction login(){\n\n}\n";
var lines = tokenizer.tokenize(source);
var scopes = finder.find(lines);
if (scopes.length !== 2) {
    throw new Error("Harus ada 2 function.");
}
if (scopes[0].name !== "savePanen") {
    throw new Error("Function pertama salah.");
}
if (scopes[1].name !== "login") {
    throw new Error("Function kedua salah.");
}
console.log("");
console.log("======================================");
console.log("Function Scope Finder Test PASSED");
console.log("======================================");
for (var _i = 0, scopes_1 = scopes; _i < scopes_1.length; _i++) {
    var scope = scopes_1[_i];
    console.log("".concat(scope.name, " (").concat(scope.startLine, "-").concat(scope.endLine, ")"));
}
