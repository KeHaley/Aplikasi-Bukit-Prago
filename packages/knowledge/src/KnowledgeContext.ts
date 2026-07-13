import { KnowledgeRepository } from "./KnowledgeRepository.js";

export class KnowledgeContext {

    constructor(

        public readonly repository: KnowledgeRepository

    ) {}

}