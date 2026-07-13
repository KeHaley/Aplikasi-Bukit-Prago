export class DependencyGenerator {
    generate(knowledge) {
        const lines = [];
        lines.push("## Dependencies");
        lines.push("");
        for (const dependency of knowledge.dependencies) {
            lines.push(`- ${dependency.from} -> ${dependency.to} (${dependency.kind})`);
        }
        return lines.join("\n");
    }
}
//# sourceMappingURL=DependencyGenerator.js.map