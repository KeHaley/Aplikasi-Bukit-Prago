import { strict as assert } from "node:assert";

import { DocumentGenerator } from "../DocumentGenerator.js";

const generator = new DocumentGenerator();

const document = generator.generate(

    "BPV4",

    "Documentation"

);

assert.equal(

    document.title,

    "BPV4"

);

assert.equal(

    document.content,

    "Documentation"

);

console.log("DocumentGeneratorTest PASS");