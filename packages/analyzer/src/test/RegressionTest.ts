import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";

const tests = [

    "CallGraphCollectorTest.js",

    "CrossFileDependencyCollectorTest.js",

    "DataFlowCollectorTest.js",

    "DependencyFreezeTest.js",

    "DependencyRegistryTest.js",

    "DocumentationGeneratorTest.js",

    "EngineeringKnowledgeTest.js",

    "FunctionScopeFinderTest.js",

    "ImportDependencyCollectorTest.js",

    "VariableAccessCollectorTest.js",
    "ReleaseValidatorTest.js",
    "ReleaseManifestTest.js",
    "ReleaseInfoTest.js"
];

console.log("");
console.log("======================================");
console.log("BPV4 Analyzer Regression Test");
console.log("======================================");

for (const test of tests) {

    const file = join(
        __dirname,
        test
    );

    if (!existsSync(file)) {

        throw new Error(
            `Test tidak ditemukan: ${test}`
        );

    }

    console.log("");
    console.log(`Running ${test}`);

    execSync(

        `node "${file}"`,

        {

            stdio: "inherit"

        }

    );

}

console.log("");
console.log("======================================");
console.log("ALL REGRESSION TEST PASSED");
console.log("======================================");