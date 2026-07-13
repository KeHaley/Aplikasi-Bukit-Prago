import { KnowledgeQueryService } from "./KnowledgeQueryService.js";

export class KnowledgeValidationService<T = unknown> {

    constructor(

        private readonly query: KnowledgeQueryService<T>

    ) {}

    contains(id: string): boolean {

        return this.query.has(id);

    }

    validate(id: string): boolean {

        return this.query.has(id);

    }

}