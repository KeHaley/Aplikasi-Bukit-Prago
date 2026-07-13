export class MarkdownGenerator {
    generate(knowledge) {
        return [
            "# BPV4 Engineering Documentation",
            "",
            "## Summary",
            "",
            `- Dependencies : ${knowledge.dependencyCount()}`,
            `- Call Graph   : ${knowledge.callGraphCount()}`,
            `- Cross File   : ${knowledge.crossFileCount()}`,
            `- Data Flow    : ${knowledge.dataFlowCount()}`
        ].join("\n");
    }
}
//# sourceMappingURL=MarkdownGenerator.js.map