import { EngineeringKnowledge } from "../../analyzer/src/index.js";

export class DependencyGenerator {

    generate(
        knowledge: EngineeringKnowledge
    ): string {

        const lines: string[] = [];

        lines.push("## Dependencies");

        lines.push("");

        for (const dependency of knowledge.dependencies) {

            lines.push(
                `- ${dependency.from} -> ${dependency.to} (${dependency.kind})`
            );

        }

        return lines.join("\n");

    }

}