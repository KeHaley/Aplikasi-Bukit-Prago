export class KnowledgeProvider<T = unknown> {

    private knowledge?: T;

    load(knowledge: T): void {

        this.knowledge = knowledge;

    }

    hasKnowledge(): boolean {

        return this.knowledge !== undefined;

    }

    getKnowledge(): T | undefined {

        return this.knowledge;

    }

    clear(): void {

        this.knowledge = undefined;

    }

}