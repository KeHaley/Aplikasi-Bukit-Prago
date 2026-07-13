import { KnowledgeRegistry } from "./KnowledgeRegistry.js";

export class KnowledgeService<T = unknown> {

    constructor(

        private readonly registry: KnowledgeRegistry<T>

    ) {}

    register(
        id: string,
        knowledge: T
    ): void {

        this.registry.register(id, knowledge);

    }

    registerAll(
        entries: ReadonlyMap<string, T>
    ): void {

        for (const [id, knowledge] of entries) {

            this.registry.register(id, knowledge);

        }

    }

    replaceAll(
        entries: ReadonlyMap<string, T>
    ): void {

        this.registry.clear();

        this.registerAll(entries);

    }

    remove(id: string): boolean {

        return this.registry.remove(id);

    }

    clear(): void {

        this.registry.clear();

    }

}