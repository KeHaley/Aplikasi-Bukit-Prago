import { EngineeringKnowledge } from "../../analyzer/src/index.js";

export class CrossFileGenerator {

    generate(
        knowledge: EngineeringKnowledge
    ): string {

        const lines: string[] = [];

        lines.push("## Cross File Dependencies");

        lines.push("");

        for (const dependency of knowledge.crossFileDependencies) {

            lines.push(
                `- ${dependency.symbol} -> ${dependency.source}`
            );

        }

        return lines.join("\n");

    }

}