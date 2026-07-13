import { EngineeringKnowledge } from "../../analyzer/src/index.js";

export class SummaryGenerator {

    generate(
        knowledge: EngineeringKnowledge
    ): string {

        return [

            "## Summary",

            "",

            `Dependencies : ${knowledge.dependencyCount()}`,

            `Call Graph   : ${knowledge.callGraphCount()}`,

            `Cross File   : ${knowledge.crossFileCount()}`,

            `Data Flow    : ${knowledge.dataFlowCount()}`

        ].join("\n");

    }

}