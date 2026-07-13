import { DependencyRegistry } from "./DependencyRegistry.js";
import { CrossFileDependency } from "./CrossFileDependency.js";
import { DependencyKind } from "./DependencyKind.js";

export class CrossFileDependencyCollector {

    private readonly dependencies: CrossFileDependency[] = [];

    collect(
        registry: DependencyRegistry
    ): DependencyRegistry {

        for (const dependency of registry.getAll()) {

            if (
                dependency.kind !==
                DependencyKind.Import
            ) {

                continue;

            }

            this.dependencies.push(

                new CrossFileDependency(

                    dependency.from,

                    dependency.to

                )

            );

        }

        return registry;

    }

    getAll(): readonly CrossFileDependency[] {

        return this.dependencies;

    }

}