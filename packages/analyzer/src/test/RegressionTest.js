"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var path_1 = require("path");
var tests = [
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
for (var _i = 0, tests_1 = tests; _i < tests_1.length; _i++) {
    var test = tests_1[_i];
    var file = (0, path_1.join)(__dirname, test);
    if (!(0, fs_1.existsSync)(file)) {
        throw new Error("Test tidak ditemukan: ".concat(test));
    }
    console.log("");
    console.log("Running ".concat(test));
    (0, child_process_1.execSync)("node \"".concat(file, "\""), {
        stdio: "inherit"
    });
}
console.log("");
console.log("======================================");
console.log("ALL REGRESSION TEST PASSED");
console.log("======================================");
