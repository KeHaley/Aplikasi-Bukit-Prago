import { CallGraphNode } from "./CallGraphNode.js";
import { CrossFileDependency } from "./CrossFileDependency.js";
import { DataFlowNode } from "./DataFlowNode.js";
import { DependencyRegistry } from "./DependencyRegistry.js";
import { EngineeringKnowledge } from "./EngineeringKnowledge.js";

export class EngineeringKnowledgeBuilder {

    build(

        registry: DependencyRegistry,

        callGraph: readonly CallGraphNode[],

        crossFile: readonly CrossFileDependency[],

        dataFlow: readonly DataFlowNode[]

    ): EngineeringKnowledge {

        const knowledge =
            new EngineeringKnowledge();

        for (const dependency of registry.getAll()) {

            knowledge.addDependency(
                dependency
            );

        }

        for (const node of callGraph) {

            knowledge.addCallGraph(
                node
            );

        }

        for (const dependency of crossFile) {

            knowledge.addCrossFileDependency(
                dependency
            );

        }

        for (const node of dataFlow) {

            knowledge.addDataFlow(
                node
            );

        }

        return knowledge;

    }

}