export class SummaryGenerator {
    generate(knowledge) {
        return [
            "## Summary",
            "",
            `Dependencies : ${knowledge.dependencyCount()}`,
            `Call Graph   : ${knowledge.callGraphCount()}`,
            `Cross File   : ${knowledge.crossFileCount()}`,
            `Data Flow    : ${knowledge.dataFlowCount()}`
        ].join("\n");
    }
}
//# sourceMappingURL=SummaryGenerator.js.map