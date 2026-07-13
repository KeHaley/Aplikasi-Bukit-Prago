import { EngineeringKnowledge } from "../../analyzer/src/index.js";

import { SummaryGenerator } from "./SummaryGenerator.js";
import { DependencyGenerator } from "./DependencyGenerator.js";
import { CallGraphGenerator } from "./CallGraphGenerator.js";
import { CrossFileGenerator } from "./CrossFileGenerator.js";
import { DataFlowGenerator } from "./DataFlowGenerator.js";

export class DocumentationGenerator {

    private readonly summary =
        new SummaryGenerator();

    private readonly dependency =
        new DependencyGenerator();

    private readonly callGraph =
        new CallGraphGenerator();

    private readonly crossFile =
        new CrossFileGenerator();

    private readonly dataFlow =
        new DataFlowGenerator();

    generate(
        knowledge: EngineeringKnowledge
    ): string {

        return [

            "# BPV4 Documentation",

            "",

            this.summary.generate(
                knowledge
            ),

            "",

            this.dependency.generate(
                knowledge
            ),

            "",

            this.callGraph.generate(
                knowledge
            ),

            "",

            this.crossFile.generate(
                knowledge
            ),

            "",

            this.dataFlow.generate(
                knowledge
            )

        ].join("\n");

    }

}