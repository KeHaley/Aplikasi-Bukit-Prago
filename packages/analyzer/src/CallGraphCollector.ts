import { Dependency } from "./Dependency.js";
import { DependencyKind } from "./DependencyKind.js";
import { CallGraphNode } from "./CallGraphNode.js";

export class CallGraphCollector {

    private readonly nodes: CallGraphNode[] = [];

    collect(
        dependencies: readonly Dependency[]
    ): void {

        for (const dependency of dependencies) {

            if (
                dependency.kind !==
                DependencyKind.FunctionCall
            ) {

                continue;

            }

            const node =
                this.findOrCreateNode(
                    dependency.from
                );

            node.addCallee(
                dependency.to
            );

        }

    }

    getAll(): readonly CallGraphNode[] {

        return this.nodes;

    }

    private findOrCreateNode(
        name: string
    ): CallGraphNode {

        let node =
            this.nodes.find(
                item => item.name === name
            );

        if (!node) {

            node = new CallGraphNode(name);

            this.nodes.push(node);

        }

        return node;

    }

}