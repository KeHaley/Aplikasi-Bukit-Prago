export class CrossFileGenerator {
    generate(knowledge) {
        const lines = [];
        lines.push("## Cross File Dependencies");
        lines.push("");
        for (const dependency of knowledge.crossFileDependencies) {
            lines.push(`- ${dependency.symbol} -> ${dependency.source}`);
        }
        return lines.join("\n");
    }
}
//# sourceMappingURL=CrossFileGenerator.js.map