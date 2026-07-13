import { KnowledgeService } from "./KnowledgeService.js";

export class KnowledgeImportService<T = unknown> {

    constructor(

        private readonly service: KnowledgeService<T>

    ) {}

    import(
        entries: ReadonlyMap<string, T>
    ): void {

        this.service.replaceAll(entries);

    }

    merge(
        entries: ReadonlyMap<string, T>
    ): void {

        this.service.registerAll(entries);

    }

}