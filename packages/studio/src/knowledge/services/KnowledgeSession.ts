import { KnowledgeProvider } from "./KnowledgeProvider.js";

export class KnowledgeSession<T = unknown> {

    constructor(

        private readonly provider: KnowledgeProvider<T>

    ) {}

    load(knowledge: T): void {

        this.provider.load(knowledge);

    }

    hasKnowledge(): boolean {

        return this.provider.hasKnowledge();

    }

    getKnowledge(): T | undefined {

        return this.provider.getKnowledge();

    }

    clear(): void {

        this.provider.clear();

    }

}