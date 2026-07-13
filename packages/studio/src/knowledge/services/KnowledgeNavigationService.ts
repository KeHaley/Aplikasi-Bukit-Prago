import { KnowledgeQueryService } from "./KnowledgeQueryService.js";

export class KnowledgeNavigationService<T = unknown> {

    constructor(

        private readonly query: KnowledgeQueryService<T>

    ) {}

    has(id: string): boolean {

        return this.query.has(id);

    }

    navigate(id: string): T | undefined {

        return this.query.get(id);

    }

}