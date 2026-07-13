import { KnowledgeManager } from "./KnowledgeManager.js";

export class KnowledgeWorkspace<T = unknown> {

    constructor(

        private readonly knowledge: KnowledgeManager<T>

    ) {}

    initialize(): void {

        this.knowledge.initialize();

    }

    dispose(): void {

        this.knowledge.dispose();

    }

    clear(): void {

        this.knowledge.dispose();

        this.knowledge.initialize();

    }

    isInitialized(): boolean {

        return this.knowledge.isInitialized();

    }

    isEmpty(): boolean {

        return this.knowledge.isEmpty();

    }

    getCount(): number {

        return this.knowledge.getCount();

    }

    getKnowledge(): KnowledgeManager<T> {

        return this.knowledge;

    }

}