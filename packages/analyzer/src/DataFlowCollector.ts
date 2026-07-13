import { Dependency } from "./Dependency.js";
import { DependencyKind } from "./DependencyKind.js";
import { DataFlowNode } from "./DataFlowNode.js";

export class DataFlowCollector {

    private readonly nodes: DataFlowNode[] = [];

    collect(
        dependencies: readonly Dependency[]
    ): void {

        for (const dependency of dependencies) {

            if (
                dependency.kind !==
                DependencyKind.VariableAccess
            ) {

                continue;

            }

            const node =
                this.findOrCreateNode(
                    dependency.to
                );

            node.addTarget(
                dependency.from
            );

        }

    }

    getAll(): readonly DataFlowNode[] {

        return this.nodes;

    }

    private findOrCreateNode(
        name: string
    ): DataFlowNode {

        let node =
            this.nodes.find(
                item => item.name === name
            );

        if (!node) {

            node = new DataFlowNode(name);

            this.nodes.push(node);

        }

        return node;

    }

}