import { CallGraphNode } from "./CallGraphNode.js";
import { CrossFileDependency } from "./CrossFileDependency.js";
import { DataFlowNode } from "./DataFlowNode.js";
import { Dependency } from "./Dependency.js";

export class EngineeringKnowledge {

    readonly createdAt: Date;

    readonly dependencies: Dependency[] = [];

    readonly callGraph: CallGraphNode[] = [];

    readonly crossFileDependencies: CrossFileDependency[] = [];

    readonly dataFlow: DataFlowNode[] = [];

    constructor() {

        this.createdAt = new Date();

    }

    addDependency(
        dependency: Dependency
    ): void {

        this.dependencies.push(
            dependency
        );

    }

    addCallGraph(
        node: CallGraphNode
    ): void {

        this.callGraph.push(
            node
        );

    }

    addCrossFileDependency(
        dependency: CrossFileDependency
    ): void {

        this.crossFileDependencies.push(
            dependency
        );

    }

    addDataFlow(
        node: DataFlowNode
    ): void {

        this.dataFlow.push(
            node
        );

    }

    dependencyCount(): number {

        return this.dependencies.length;

    }

    callGraphCount(): number {

        return this.callGraph.length;

    }

    crossFileCount(): number {

        return this.crossFileDependencies.length;

    }

    dataFlowCount(): number {

        return this.dataFlow.length;

    }

    hasDependencies(): boolean {

        return this.dependencies.length > 0;

    }

    hasCallGraph(): boolean {

        return this.callGraph.length > 0;

    }

    hasCrossFile(): boolean {

        return this.crossFileDependencies.length > 0;

    }

    hasDataFlow(): boolean {

        return this.dataFlow.length > 0;

    }

    isEmpty(): boolean {

        return this.dependencies.length === 0 &&
               this.callGraph.length === 0 &&
               this.crossFileDependencies.length === 0 &&
               this.dataFlow.length === 0;

    }

    ageInMilliseconds(): number {

        return Date.now() - this.createdAt.getTime();

    }

    statistics(): {
        dependencies: number;
        callGraph: number;
        crossFile: number;
        dataFlow: number;
    } {

        return {

            dependencies: this.dependencyCount(),

            callGraph: this.callGraphCount(),

            crossFile: this.crossFileCount(),

            dataFlow: this.dataFlowCount()

        };

    }

    statisticsSnapshot(): Readonly<{
        createdAt: Date;
        dependencies: number;
        callGraph: number;
        crossFile: number;
        dataFlow: number;
    }> {

        return Object.freeze({

            createdAt: this.createdAt,

            dependencies: this.dependencyCount(),

            callGraph: this.callGraphCount(),

            crossFile: this.crossFileCount(),

            dataFlow: this.dataFlowCount()

        });

    }

    clear(): void {

        this.dependencies.length = 0;

        this.callGraph.length = 0;

        this.crossFileDependencies.length = 0;

        this.dataFlow.length = 0;

    }

}