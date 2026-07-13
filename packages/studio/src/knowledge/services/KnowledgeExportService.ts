import { KnowledgeQueryService } from "./KnowledgeQueryService.js";

export class KnowledgeExportService<T = unknown> {

    constructor(

        private readonly query: KnowledgeQueryService<T>

    ) {}

    export(): ReadonlyMap<string, T> {

        return new Map(

            this.query
                .getIds()
                .map(id => [id, this.query.get(id)!])

        );

    }

}