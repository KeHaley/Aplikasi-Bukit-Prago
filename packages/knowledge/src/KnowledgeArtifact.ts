import { KnowledgeType } from "./KnowledgeType.js";

export class KnowledgeArtifact {

    constructor(

        public readonly type: KnowledgeType,

        public readonly name: string,

        public readonly path: string

    ) {}

}