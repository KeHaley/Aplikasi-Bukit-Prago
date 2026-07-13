import { KnowledgeQueryService } from "./KnowledgeQueryService.js";

export class KnowledgeStatisticsService<T = unknown> {

    constructor(

        private readonly query: KnowledgeQueryService<T>

    ) {}

    getCount(): number {

        return this.query.getCount();

    }

    isEmpty(): boolean {

        return this.query.getCount() === 0;

    }

}