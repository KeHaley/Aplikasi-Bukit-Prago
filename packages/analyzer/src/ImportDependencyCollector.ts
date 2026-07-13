import {
    ProgramNode,
    NodeKind,
    ImportNode
} from "@bpv4/parser";

import { Dependency } from "./Dependency.js";
import { DependencyKind } from "./DependencyKind.js";
import { DependencyRegistry } from "./DependencyRegistry.js";

export class ImportDependencyCollector {

    collect(program: ProgramNode): DependencyRegistry {

        const registry = new DependencyRegistry();

        for (const node of program.children) {

            if (node.kind !== NodeKind.Import) {
                continue;
            }

            const importNode = node as ImportNode;

            registry.add(

                new Dependency(

                    DependencyKind.Import,

                    importNode.name,

                    importNode.source,

                    importNode.line

                )

            );

        }

        return registry;

    }

}