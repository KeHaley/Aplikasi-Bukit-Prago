import { ApplicationKnowledge } from "./ApplicationKnowledge.js";

export class KnowledgeStatistics {

    constructor(

        private readonly knowledge: ApplicationKnowledge

    ) {}

    moduleCount(): number {

        return this.knowledge.modules.length;

    }

    artifactCount(): number {

        return this.knowledge.artifacts.length;

    }

}