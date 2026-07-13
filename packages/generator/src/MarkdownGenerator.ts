import { EngineeringKnowledge } from "../../analyzer/src/index.js";

export class MarkdownGenerator {

    generate(
        knowledge: EngineeringKnowledge
    ): string {

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