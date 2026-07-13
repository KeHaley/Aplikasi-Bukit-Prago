import { KnowledgeWorkspace } from "./KnowledgeWorkspace.js";

export class KnowledgeFacade<T = unknown> {

    constructor(

        private readonly workspace: KnowledgeWorkspace<T>

    ) {}

    getWorkspace(): KnowledgeWorkspace<T> {

        return this.workspace;

    }

    getKnowledge() {

        return this.workspace.getKnowledge();

    }

    isEmpty(): boolean {

        return this.workspace.isEmpty();

    }

    getCount(): number {

        return this.workspace.getCount();

    }

    clear(): void {

        this.workspace.clear();

    }

}