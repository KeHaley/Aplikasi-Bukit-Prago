import { EngineeringKnowledge } from "./EngineeringKnowledge.js";

export class EngineeringReport {

    readonly title: string;

    readonly version: string;

    readonly status: string;

    readonly generatedAt: Date;

    readonly dependencyCount: number;

    readonly callGraphCount: number;

    readonly crossFileCount: number;

    readonly dataFlowCount: number;

    constructor(
        knowledge: EngineeringKnowledge
    ) {

        this.title =
            "BPV4 Engineering Report";

        this.version =
            "1.0.0";

        this.status =
            knowledge.isEmpty()
                ? "EMPTY"
                : "READY";

        this.generatedAt =
            new Date();

        this.dependencyCount =
            knowledge.dependencyCount();

        this.callGraphCount =
            knowledge.callGraphCount();

        this.crossFileCount =
            knowledge.crossFileCount();

        this.dataFlowCount =
            knowledge.dataFlowCount();

    }

    summary(): string {

        return [

            this.title,

            `Version      : ${this.version}`,

            `Status       : ${this.status}`,

            "",

            `Dependencies : ${this.dependencyCount}`,

            `Call Graph   : ${this.callGraphCount}`,

            `Cross File   : ${this.crossFileCount}`,

            `Data Flow    : ${this.dataFlowCount}`

        ].join("\n");

    }

    toString(): string {

        return this.summary();

    }

    toJSON(): object {

        return {

            title: this.title,

            version: this.version,

            status: this.status,

            generatedAt: this.generatedAt,

            dependencyCount: this.dependencyCount,

            callGraphCount: this.callGraphCount,

            crossFileCount: this.crossFileCount,

            dataFlowCount: this.dataFlowCount

        };

    }

}