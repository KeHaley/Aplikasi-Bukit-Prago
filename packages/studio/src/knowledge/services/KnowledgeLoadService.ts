import { KnowledgeManager } from "../KnowledgeManager.js";

export class KnowledgeLoadService<T = unknown> {

    constructor(

        private readonly knowledge: KnowledgeManager<T>

    ) {}

    load(
        entries: ReadonlyMap<string, T>
    ): void {

        this.knowledge.service.replaceAll(entries);

    }

    merge(
        entries: ReadonlyMap<string, T>
    ): void {

        this.knowledge.service.registerAll(entries);

    }

    clear(): void {

        this.knowledge.service.clear();

    }

}