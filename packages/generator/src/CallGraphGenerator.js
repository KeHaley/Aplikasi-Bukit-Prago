export class CallGraphGenerator {
    generate(knowledge) {
        const lines = [];
        lines.push("## Call Graph");
        lines.push("");
        for (const node of knowledge.callGraph) {
            lines.push(node.name);
            for (const callee of node.callees) {
                lines.push(`  -> ${callee}`);
            }
        }
        return lines.join("\n");
    }
}
//# sourceMappingURL=CallGraphGenerator.js.map