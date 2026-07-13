export class KnowledgeRegistry<T = unknown> {

    private readonly registry = new Map<string, T>();

    register(
        id: string,
        knowledge: T
    ): void {

        this.registry.set(id, knowledge);

    }

    has(id: string): boolean {

        return this.registry.has(id);

    }

    get(id: string): T | undefined {

        return this.registry.get(id);

    }

    remove(id: string): boolean {

        return this.registry.delete(id);

    }

    clear(): void {

        this.registry.clear();

    }

    getAll(): readonly T[] {

        return [...this.registry.values()];

    }

    getIds(): readonly string[] {

        return [...this.registry.keys()];

    }

    getCount(): number {

        return this.registry.size;

    }

}