import { EngineeringKnowledge } from "../../analyzer/src/index.js";

export class CallGraphGenerator {

    generate(
        knowledge: EngineeringKnowledge
    ): string {

        const lines: string[] = [];

        lines.push("## Call Graph");

        lines.push("");

        for (const node of knowledge.callGraph) {

            lines.push(node.name);

            for (const callee of node.callees) {

                lines.push(
                    `  -> ${callee}`
                );

            }

        }

        return lines.join("\n");

    }

}