import { SummaryGenerator } from "./SummaryGenerator.js";
import { DependencyGenerator } from "./DependencyGenerator.js";
import { CallGraphGenerator } from "./CallGraphGenerator.js";
import { CrossFileGenerator } from "./CrossFileGenerator.js";
import { DataFlowGenerator } from "./DataFlowGenerator.js";
export class DocumentationGenerator {
    summary = new SummaryGenerator();
    dependency = new DependencyGenerator();
    callGraph = new CallGraphGenerator();
    crossFile = new CrossFileGenerator();
    dataFlow = new DataFlowGenerator();
    generate(knowledge) {
        return [
            "# BPV4 Documentation",
            "",
            this.summary.generate(knowledge),
            "",
            this.dependency.generate(knowledge),
            "",
            this.callGraph.generate(knowledge),
            "",
            this.crossFile.generate(knowledge),
            "",
            this.dataFlow.generate(knowledge)
        ].join("\n");
    }
}
//# sourceMappingURL=DocumentationGenerator.js.map