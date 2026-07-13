import { KnowledgeRegistry } from "./KnowledgeRegistry.js";

export class KnowledgeQueryService<T = unknown> {

    constructor(

        private readonly registry: KnowledgeRegistry<T>

    ) {}

    has(id: string): boolean {

        return this.registry.has(id);

    }

    get(id: string): T | undefined {

        return this.registry.get(id);

    }

    getAll(): readonly T[] {

        return this.registry.getAll();

    }

    getIds(): readonly string[] {

        return this.registry.getIds();

    }

    getCount(): number {

        return this.registry.getCount();

    }

}