import { KnowledgeQueryService } from "./KnowledgeQueryService.js";

export class KnowledgeSearchService<T = unknown> {

    constructor(

        private readonly query: KnowledgeQueryService<T>

    ) {}

    find(
        predicate: (knowledge: T) => boolean
    ): readonly T[] {

        return this
            .query
            .getAll()
            .filter(predicate);

    }

    findFirst(
        predicate: (knowledge: T) => boolean
    ): T | undefined {

        return this
            .query
            .getAll()
            .find(predicate);

    }

}