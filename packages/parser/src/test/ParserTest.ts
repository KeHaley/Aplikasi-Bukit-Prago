import { Parser } from "../parser/Parser";
import { Tokenizer } from "../tokenizer/Tokenizer";

import { NodeKind } from "../parser/ast/AstNode";
import { ImportNode } from "../parser/ast/ImportNode";
import { ExportNode } from "../parser/ast/ExportNode";
import { FunctionNode } from "../parser/ast/FunctionNode";
import { ClassNode } from "../parser/ast/ClassNode";
import { VariableNode } from "../parser/ast/VariableNode";

const tokenizer = new Tokenizer();
const parser = new Parser();

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

console.log("Children :", program.children.length);

for (const node of program.children) {
    console.log(node);
}

if (program.children.length !== 7) {
    throw new Error("Parser harus menghasilkan 7 node.");
}

/* ===========================
   Import
=========================== */

const importNode = program.children[0] as ImportNode;

if (importNode.kind !== NodeKind.Import) {
    throw new Error("Node pertama harus ImportNode.");
}

if (importNode.name !== "Repository") {
    throw new Error("Import name salah.");
}

/* ===========================
   Export
=========================== */

const exportNode = program.children[1] as ExportNode;

if (exportNode.kind !== NodeKind.Export) {
    throw new Error("Node kedua harus ExportNode.");
}

if (exportNode.name !== "PanenService") {
    throw new Error("Export name salah.");
}

/* ===========================
   Function
=========================== */

const functionNode = program.children[2] as FunctionNode;

if (functionNode.kind !== NodeKind.Function) {
    throw new Error("Node ketiga harus FunctionNode.");
}

if (functionNode.name !== "savePanen") {
    throw new Error("Nama function salah.");
}

/* ===========================
   Class
=========================== */

const classNode = program.children[3] as ClassNode;

if (classNode.kind !== NodeKind.Class) {
    throw new Error("Node keempat harus ClassNode.");
}

if (classNode.name !== "LocalService") {
    throw new Error("Nama class salah.");
}

/* ===========================
   Variables
=========================== */

const variable1 = program.children[4] as VariableNode;

if (variable1.name !== "APP_NAME") {
    throw new Error("Const tidak terbaca.");
}

const variable2 = program.children[5] as VariableNode;

if (variable2.name !== "activeYear") {
    throw new Error("Let tidak terbaca.");
}

const variable3 = program.children[6] as VariableNode;

if (variable3.name !== "total") {
    throw new Error("Var tidak terbaca.");
}

console.log("");
console.log("====================================");
console.log("Parser Export Test PASSED");
console.log("====================================");