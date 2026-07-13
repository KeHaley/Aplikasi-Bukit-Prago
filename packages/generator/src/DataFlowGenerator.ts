import { EngineeringKnowledge } from "../../analyzer/src/index.js";

export class DataFlowGenerator {

    generate(
        knowledge: EngineeringKnowledge
    ): string {

        const lines: string[] = [];

        lines.push("## Data Flow");

        lines.push("");

        for (const node of knowledge.dataFlow) {

            lines.push(node.name);

            for (const target of node.targets) {

                lines.push(
                    `  -> ${target}`
                );

            }

        }

        return lines.join("\n");

    }

}