"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_assert_1 = require("node:assert");
var DocumentGenerator_js_1 = require("../DocumentGenerator.js");
var generator = new DocumentGenerator_js_1.DocumentGenerator();
var document = generator.generate("BPV4", "Documentation");
node_assert_1.strict.equal(document.title, "BPV4");
node_assert_1.strict.equal(document.content, "Documentation");
console.log("DocumentGeneratorTest PASS");
