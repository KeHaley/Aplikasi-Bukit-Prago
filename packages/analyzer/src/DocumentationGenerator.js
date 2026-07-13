"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentationGenerator = void 0;
var DocumentationGenerator = /** @class */ (function () {
    function DocumentationGenerator() {
    }
    DocumentationGenerator.prototype.generate = function (report) {
        var lines = [];
        lines.push(report.title);
        lines.push("");
        lines.push("Generated : ".concat(report.generatedAt.toISOString()));
        lines.push("");
        lines.push("Statistics");
        lines.push("----------");
        lines.push("Dependencies : ".concat(report.dependencyCount));
        lines.push("Call Graph   : ".concat(report.callGraphCount));
        lines.push("Cross File   : ".concat(report.crossFileCount));
        lines.push("Data Flow    : ".concat(report.dataFlowCount));
        return lines.join("\n");
    };
    return DocumentationGenerator;
}());
exports.DocumentationGenerator = DocumentationGenerator;
