import {
    Tokenizer
} from "@bpv4/parser";

import { FunctionScopeFinder } from "../FunctionScopeFinder.js";

const tokenizer = new Tokenizer();

const finder = new FunctionScopeFinder();

const source = `
function savePanen(){

    validate();

    hitung();

}

function login(){

}
`;

const lines = tokenizer.tokenize(source);

const scopes = finder.find(lines);

if (scopes.length !== 2) {

    throw new Error(
        "Harus ada 2 function."
    );

}

if (scopes[0].name !== "savePanen") {

    throw new Error(
        "Function pertama salah."
    );

}

if (scopes[1].name !== "login") {

    throw new Error(
        "Function kedua salah."
    );

}

console.log("");
console.log("======================================");
console.log("Function Scope Finder Test PASSED");
console.log("======================================");

for (const scope of scopes) {

    console.log(
        `${scope.name} (${scope.startLine}-${scope.endLine})`
    );

}