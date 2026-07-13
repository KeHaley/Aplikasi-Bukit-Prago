export class DataFlowGenerator {
    generate(knowledge) {
        const lines = [];
        lines.push("## Data Flow");
        lines.push("");
        for (const node of knowledge.dataFlow) {
            lines.push(node.name);
            for (const target of node.targets) {
                lines.push(`  -> ${target}`);
            }
        }
        return lines.join("\n");
    }
}
//# sourceMappingURL=DataFlowGenerator.js.map