"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = require("../parser/Parser");
var Tokenizer_1 = require("../tokenizer/Tokenizer");
var AstNode_1 = require("../parser/ast/AstNode");
var tokenizer = new Tokenizer_1.Tokenizer();
var parser = new Parser_1.Parser();
var source = "\nimport { Repository } from \"./Repository\";\n\nexport class PanenService {\n\n}\n\nfunction savePanen() {\n\n}\n\nclass LocalService {\n\n}\n\nconst APP_NAME = \"BPV4\";\n\nlet activeYear = 2026;\n\nvar total = 0;\n";
var lines = tokenizer.tokenize(source);
var program = parser.parse(lines);
console.log("Children :", program.children.length);
for (var _i = 0, _a = program.children; _i < _a.length; _i++) {
    var node = _a[_i];
    console.log(node);
}
if (program.children.length !== 7) {
    throw new Error("Parser harus menghasilkan 7 node.");
}
/* ===========================
   Import
=========================== */
var importNode = program.children[0];
if (importNode.kind !== AstNode_1.NodeKind.Import) {
    throw new Error("Node pertama harus ImportNode.");
}
if (importNode.name !== "Repository") {
    throw new Error("Import name salah.");
}
/* ===========================
   Export
=========================== */
var exportNode = program.children[1];
if (exportNode.kind !== AstNode_1.NodeKind.Export) {
    throw new Error("Node kedua harus ExportNode.");
}
if (exportNode.name !== "PanenService") {
    throw new Error("Export name salah.");
}
/* ===========================
   Function
=========================== */
var functionNode = program.children[2];
if (functionNode.kind !== AstNode_1.NodeKind.Function) {
    throw new Error("Node ketiga harus FunctionNode.");
}
if (functionNode.name !== "savePanen") {
    throw new Error("Nama function salah.");
}
/* ===========================
   Class
=========================== */
var classNode = program.children[3];
if (classNode.kind !== AstNode_1.NodeKind.Class) {
    throw new Error("Node keempat harus ClassNode.");
}
if (classNode.name !== "LocalService") {
    throw new Error("Nama class salah.");
}
/* ===========================
   Variables
=========================== */
var variable1 = program.children[4];
if (variable1.name !== "APP_NAME") {
    throw new Error("Const tidak terbaca.");
}
var variable2 = program.children[5];
if (variable2.name !== "activeYear") {
    throw new Error("Let tidak terbaca.");
}
var variable3 = program.children[6];
if (variable3.name !== "total") {
    throw new Error("Var tidak terbaca.");
}
console.log("");
console.log("====================================");
console.log("Parser Export Test PASSED");
console.log("====================================");
