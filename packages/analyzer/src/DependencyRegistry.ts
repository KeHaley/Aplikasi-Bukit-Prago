import { Dependency } from "./Dependency.js";

export class DependencyRegistry {

    private readonly dependencies: Dependency[] = [];

    add(
        dependency: Dependency
    ): void {

        this.dependencies.push(
            dependency
        );

    }

    addAll(
        dependencies: readonly Dependency[]
    ): void {

        for (const dependency of dependencies) {

            this.add(
                dependency
            );

        }

    }

    getAll(): readonly Dependency[] {

        return this.dependencies;

    }

    count(): number {

        return this.dependencies.length;

    }

}